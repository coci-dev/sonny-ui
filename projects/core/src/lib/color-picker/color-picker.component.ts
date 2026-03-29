import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  forwardRef,
  HostListener,
  inject,
  input,
  model,
  OnDestroy,
  output,
  signal,
  untracked,
  viewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { cn } from '../core/utils/cn';
import type { ColorFormat, ColorPickerPreset, HSV, RGB } from './color-picker.types';
import {
  rgbToHex,
  rgbToHsv,
  hsvToRgb,
  parseColor,
  formatColor,
  isValidColor,
} from './color-picker.utils';
import { colorPickerTriggerVariants, type ColorPickerSize } from './color-picker.variants';

@Component({
  selector: 'sny-color-picker',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'relative inline-block' },
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SnyColorPickerComponent), multi: true },
  ],
  template: `
    <!-- Trigger -->
    @if (!inline()) {
      <button
        #triggerEl
        type="button"
        role="combobox"
        [attr.aria-expanded]="open()"
        aria-haspopup="dialog"
        [disabled]="isDisabled()"
        [class]="triggerClass()"
        (click)="toggle()"
        (blur)="onTouched()"
      >
        <div
          class="h-5 w-5 rounded-sm border border-border shrink-0"
          [style.backgroundColor]="displayValue()"
        ></div>
        <span class="truncate">{{ displayValue() || placeholder() }}</span>
      </button>
    }

    <!-- Panel -->
    @if (open() || inline()) {
      <div
        #panelEl
        [class]="panelClass()"
        role="dialog"
        aria-modal="true"
        aria-label="Color picker"
      >
        <!-- Saturation/Brightness Panel -->
        <div
          #satPanel
          class="relative h-36 w-full rounded-md cursor-crosshair overflow-hidden"
          [style.background]="saturationBg()"
          (mousedown)="onSatPanelDown($event)"
          (touchstart)="onSatPanelTouch($event)"
        >
          <div class="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
          <div
            class="absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-md pointer-events-none"
            [style.left.%]="hsv().s * 100"
            [style.top.%]="(1 - hsv().v) * 100"
          ></div>
        </div>

        <!-- Hue Slider -->
        <div
          #hueTrack
          class="relative h-3 w-full rounded-full cursor-pointer mt-3"
          style="background: linear-gradient(to right, hsl(0,100%,50%), hsl(60,100%,50%), hsl(120,100%,50%), hsl(180,100%,50%), hsl(240,100%,50%), hsl(300,100%,50%), hsl(360,100%,50%))"
          (mousedown)="onHueDown($event)"
          (touchstart)="onHueTouch($event)"
        >
          <div
            class="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-md pointer-events-none"
            [style.left.%]="hsv().h / 360 * 100"
            [style.backgroundColor]="'hsl(' + hsv().h + ', 100%, 50%)'"
          ></div>
        </div>

        <!-- Input + Format + Copy + Actions -->
        @if (showInput()) {
          <div class="mt-3 flex items-center gap-1.5">
            <div
              class="h-8 w-8 rounded-sm border border-border shrink-0"
              [style.backgroundColor]="displayValue()"
            ></div>
            <input
              class="flex-1 min-w-0 h-8 rounded-sm border border-border bg-background px-2 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-ring"
              [value]="inputValue()"
              (input)="onInputChange($event)"
              (blur)="commitInput()"
              (keydown.enter)="commitInput()"
            />
            <button
              type="button"
              class="h-8 px-1.5 rounded-sm border border-border text-[10px] font-semibold uppercase hover:bg-accent transition-colors shrink-0"
              (click)="cycleFormat()"
              title="Switch format"
            >
              {{ currentFormat() }}
            </button>
            <button
              type="button"
              class="h-8 w-8 inline-flex items-center justify-center rounded-sm border border-border hover:bg-accent transition-colors shrink-0"
              (click)="copyColor()"
              [title]="copied() ? 'Copied!' : 'Copy color'"
            >
              @if (copied()) {
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
              } @else {
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
              }
            </button>
          </div>
          <!-- Secondary actions row -->
          <div class="mt-2 flex items-center gap-1.5">
            @if (showEyeDropper() && hasEyeDropper) {
              <button
                type="button"
                class="h-7 px-2 inline-flex items-center gap-1.5 rounded-sm border border-border text-xs text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                (click)="pickFromScreen()"
                title="Pick from screen"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m2 22 1-1h3l9-9"/><path d="M3 21v-3l9-9"/><path d="m15 6 3.4-3.4a2.1 2.1 0 1 1 3 3L18 9l.4.4a2.1 2.1 0 1 1-3 3l-3.8-3.8a2.1 2.1 0 1 1 3-3l.4.4Z"/></svg>
                Pick
              </button>
            }
            @if (showFavorites()) {
              <button
                type="button"
                class="h-7 px-2 inline-flex items-center gap-1.5 rounded-sm border border-border text-xs text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                (click)="addFavorite()"
                title="Save to favorites"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                Save
              </button>
            }
          </div>
        }

        <!-- Presets -->
        @for (preset of presets(); track $index) {
          <div class="mt-3">
            @if (preset.label) {
              <p class="text-xs font-medium text-muted-foreground mb-1.5">{{ preset.label }}</p>
            }
            <div class="flex flex-wrap gap-1.5">
              @for (color of preset.colors; track color) {
                <button
                  type="button"
                  class="h-6 w-6 rounded-sm border border-border hover:scale-110 transition-transform cursor-pointer"
                  [style.backgroundColor]="color"
                  [title]="color"
                  (click)="selectColor(color)"
                ></button>
              }
            </div>
          </div>
        }

        <!-- Favorites -->
        @if (showFavorites() && favorites().length > 0) {
          <div class="mt-3">
            <p class="text-xs font-medium text-muted-foreground mb-1.5">Favorites</p>
            <div class="flex flex-wrap gap-1.5">
              @for (fav of favorites(); track fav) {
                <div class="relative group">
                  <button
                    type="button"
                    class="h-6 w-6 rounded-sm border border-border hover:scale-110 transition-transform cursor-pointer"
                    [style.backgroundColor]="fav"
                    [title]="fav"
                    (click)="selectColor(fav)"
                  ></button>
                  <button
                    type="button"
                    class="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full bg-destructive text-destructive-foreground text-[8px] leading-none items-center justify-center hidden group-hover:inline-flex"
                    (click)="removeFavorite(fav); $event.stopPropagation()"
                  >×</button>
                </div>
              }
            </div>
          </div>
        }
      </div>
    }
  `,
})
export class SnyColorPickerComponent implements ControlValueAccessor, OnDestroy {
  // Public API
  readonly value = model('#000000');
  readonly format = input<ColorFormat>('hex');
  readonly presets = input<ColorPickerPreset[]>([]);
  readonly showInput = input(true);
  readonly showEyeDropper = input(true);
  readonly showFavorites = input(false);
  readonly inline = input(false);
  readonly disabled = input(false);
  readonly placeholder = input('Pick a color...');
  readonly size = input<ColorPickerSize>('md');
  readonly class = input<string>('');

  readonly colorChange = output<string>();
  readonly formatChange = output<ColorFormat>();

  // Internal state
  readonly hsv = signal<HSV>({ h: 0, s: 0, v: 0 });
  readonly currentFormat = signal<ColorFormat>('hex');
  readonly inputValue = signal('');
  readonly open = signal(false);
  readonly favorites = signal<string[]>([]);
  readonly copied = signal(false);

  private readonly _disabledByCva = signal(false);
  protected readonly isDisabled = computed(() => this.disabled() || this._disabledByCva());

  private readonly triggerRef = viewChild<ElementRef<HTMLButtonElement>>('triggerEl');
  private readonly panelRef = viewChild<ElementRef<HTMLDivElement>>('panelEl');
  private readonly satPanelRef = viewChild<ElementRef<HTMLDivElement>>('satPanel');
  private readonly hueTrackRef = viewChild<ElementRef<HTMLDivElement>>('hueTrack');
  private readonly elRef = inject(ElementRef);

  private moveHandler: ((e: MouseEvent | TouchEvent) => void) | null = null;
  private upHandler: (() => void) | null = null;
  private scrollHandler: (() => void) | null = null;
  private resizeHandler: (() => void) | null = null;

  private _onChange: (value: string) => void = () => {};
  protected onTouched: () => void = () => {};

  readonly hasEyeDropper = typeof window !== 'undefined' && 'EyeDropper' in window;

  // Computed
  readonly rgb = computed<RGB>(() => hsvToRgb(this.hsv()));
  readonly displayValue = computed(() =>
    formatColor(this.rgb(), this.currentFormat())
  );

  readonly saturationBg = computed(() =>
    `linear-gradient(to right, #fff, hsl(${this.hsv().h}, 100%, 50%))`
  );

  protected readonly triggerClass = computed(() =>
    cn(colorPickerTriggerVariants({ size: this.size() }), this.class())
  );

  protected readonly panelClass = computed(() =>
    this.inline()
      ? 'inline-block p-3 rounded-md border border-border bg-popover text-popover-foreground w-60'
      : 'fixed z-50 p-3 rounded-md border border-border bg-popover text-popover-foreground shadow-lg animate-in fade-in-0 zoom-in-95 w-60'
  );

  constructor() {
    // Sync format input
    effect(() => {
      const fmt = this.format();
      untracked(() => this.currentFormat.set(fmt));
    });

    // Sync value → HSV when value changes externally
    effect(() => {
      const val = this.value();
      untracked(() => {
        const rgb = parseColor(val);
        if (rgb) {
          this.hsv.set(rgbToHsv(rgb));
          this.inputValue.set(this.displayValue());
        }
      });
    });
  }

  // CVA
  writeValue(val: string): void {
    this.value.set(val ?? '#000000');
  }

  registerOnChange(fn: (value: string) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._disabledByCva.set(isDisabled);
  }

  // Emit helper
  private emitColor(): void {
    const formatted = this.displayValue();
    this.value.set(formatted);
    this.inputValue.set(formatted);
    this._onChange(formatted);
    this.colorChange.emit(formatted);
  }

  // Saturation panel
  onSatPanelDown(event: MouseEvent): void {
    event.preventDefault();
    this.updateSatFromPosition(event.clientX, event.clientY);
    this.startDrag((e) => {
      const x = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
      const y = e instanceof MouseEvent ? e.clientY : e.touches[0].clientY;
      this.updateSatFromPosition(x, y);
    });
  }

  onSatPanelTouch(event: TouchEvent): void {
    this.updateSatFromPosition(event.touches[0].clientX, event.touches[0].clientY);
    this.startDrag((e) => {
      const x = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
      const y = e instanceof MouseEvent ? e.clientY : e.touches[0].clientY;
      this.updateSatFromPosition(x, y);
    }, true);
  }

  private updateSatFromPosition(clientX: number, clientY: number): void {
    const panel = this.satPanelRef()?.nativeElement;
    if (!panel) return;
    const rect = panel.getBoundingClientRect();
    const s = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const v = Math.max(0, Math.min(1, 1 - (clientY - rect.top) / rect.height));
    this.hsv.update((prev) => ({ ...prev, s, v }));
    this.emitColor();
  }

  // Hue slider
  onHueDown(event: MouseEvent): void {
    event.preventDefault();
    this.updateHueFromPosition(event.clientX);
    this.startDrag((e) => {
      const x = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
      this.updateHueFromPosition(x);
    });
  }

  onHueTouch(event: TouchEvent): void {
    this.updateHueFromPosition(event.touches[0].clientX);
    this.startDrag((e) => {
      const x = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
      this.updateHueFromPosition(x);
    }, true);
  }

  private updateHueFromPosition(clientX: number): void {
    const track = this.hueTrackRef()?.nativeElement;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const percent = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const h = Math.round(percent * 360);
    this.hsv.update((prev) => ({ ...prev, h }));
    this.emitColor();
  }

  // Drag helpers (same pattern as slider component)
  private startDrag(handler: (e: MouseEvent | TouchEvent) => void, touch = false): void {
    this.removeDragListeners();
    this.moveHandler = handler;
    this.upHandler = () => {
      this.onTouched();
      this.removeDragListeners();
    };
    if (touch) {
      document.addEventListener('touchmove', this.moveHandler as EventListener, { passive: true });
      document.addEventListener('touchend', this.upHandler);
    } else {
      document.addEventListener('mousemove', this.moveHandler as EventListener);
      document.addEventListener('mouseup', this.upHandler);
    }
  }

  private removeDragListeners(): void {
    if (this.moveHandler) {
      document.removeEventListener('mousemove', this.moveHandler as EventListener);
      document.removeEventListener('touchmove', this.moveHandler as EventListener);
      this.moveHandler = null;
    }
    if (this.upHandler) {
      document.removeEventListener('mouseup', this.upHandler);
      document.removeEventListener('touchend', this.upHandler);
      this.upHandler = null;
    }
  }

  // Input
  onInputChange(event: Event): void {
    this.inputValue.set((event.target as HTMLInputElement).value);
  }

  commitInput(): void {
    const val = this.inputValue().trim();
    if (isValidColor(val)) {
      const rgb = parseColor(val)!;
      this.hsv.set(rgbToHsv(rgb));
      this.emitColor();
    } else {
      this.inputValue.set(this.displayValue());
    }
  }

  // Format
  cycleFormat(): void {
    const formats: ColorFormat[] = ['hex', 'rgb', 'hsl'];
    const idx = formats.indexOf(this.currentFormat());
    const next = formats[(idx + 1) % formats.length];
    this.currentFormat.set(next);
    this.inputValue.set(this.displayValue());
    this.formatChange.emit(next);
  }

  // Copy
  copyColor(): void {
    navigator.clipboard.writeText(this.displayValue());
    this.copied.set(true);
    setTimeout(() => this.copied.set(false), 2000);
  }

  // Presets & favorites
  selectColor(color: string): void {
    const rgb = parseColor(color);
    if (rgb) {
      this.hsv.set(rgbToHsv(rgb));
      this.emitColor();
    }
  }

  addFavorite(): void {
    const hex = rgbToHex(this.rgb());
    this.favorites.update((favs) =>
      favs.includes(hex) ? favs : [...favs, hex]
    );
  }

  removeFavorite(color: string): void {
    this.favorites.update((favs) => favs.filter((f) => f !== color));
  }

  // EyeDropper
  async pickFromScreen(): Promise<void> {
    if (!this.hasEyeDropper) return;
    try {
      const dropper = new (window as any).EyeDropper();
      const result = await dropper.open();
      this.selectColor(result.sRGBHex);
    } catch {
      // User cancelled
    }
  }

  // Popover
  toggle(): void {
    if (this.open()) {
      this.close();
    } else {
      this.open.set(true);
      this.addPositionListeners();
      setTimeout(() => this.updatePanelPosition());
    }
  }

  close(): void {
    this.open.set(false);
    this.removePositionListeners();
  }

  private updatePanelPosition(): void {
    if (this.inline()) return;
    const trigger = this.triggerRef()?.nativeElement;
    if (!trigger) return;
    const rect = trigger.getBoundingClientRect();
    const panel = this.panelRef()?.nativeElement;
    if (panel) {
      panel.style.top = `${rect.bottom + 4}px`;
      panel.style.left = `${rect.left}px`;
    }
  }

  private addPositionListeners(): void {
    this.removePositionListeners();
    this.scrollHandler = () => requestAnimationFrame(() => this.updatePanelPosition());
    this.resizeHandler = () => requestAnimationFrame(() => this.updatePanelPosition());
    document.addEventListener('scroll', this.scrollHandler, { capture: true, passive: true });
    window.addEventListener('resize', this.resizeHandler, { passive: true });
  }

  private removePositionListeners(): void {
    if (this.scrollHandler) {
      document.removeEventListener('scroll', this.scrollHandler, { capture: true } as EventListenerOptions);
      this.scrollHandler = null;
    }
    if (this.resizeHandler) {
      window.removeEventListener('resize', this.resizeHandler);
      this.resizeHandler = null;
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elRef.nativeElement.contains(event.target)) {
      this.close();
    }
  }

  @HostListener('keydown.escape')
  onEscape(): void {
    this.close();
  }

  ngOnDestroy(): void {
    this.removeDragListeners();
    this.removePositionListeners();
  }
}
