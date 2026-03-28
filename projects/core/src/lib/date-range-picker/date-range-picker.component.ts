import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  forwardRef,
  HostListener,
  inject,
  input,
  model,
  OnDestroy,
  signal,
  viewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { cn } from '../core/utils/cn';
import { SnyCalendarComponent } from '../calendar/calendar.component';
import type { DateRange, DatePickerPreset } from '../calendar/calendar.types';
import { datePickerTriggerVariants, type DatePickerSize } from '../date-picker/date-picker.variants';

@Component({
  selector: 'sny-date-range-picker',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SnyCalendarComponent],
  host: { class: 'relative inline-block w-full' },
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SnyDateRangePickerComponent), multi: true },
  ],
  template: `
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
      <span [class]="displayValue() ? 'truncate' : 'text-muted-foreground truncate'">
        {{ displayValue() || placeholder() }}
      </span>
      <div class="flex items-center gap-1 shrink-0">
        @if (clearable() && value()?.start) {
          <button
            type="button"
            class="rounded-sm p-0.5 hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
            (click)="clear($event)"
            aria-label="Clear date range"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        }
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0 text-muted-foreground"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
      </div>
    </button>

    @if (open()) {
      <div
        #dropdownEl
        role="dialog"
        aria-modal="true"
        aria-label="Choose date range"
        class="fixed z-50 rounded-md border border-border bg-popover text-popover-foreground shadow-lg animate-in fade-in-0 zoom-in-95"
      >
        <div class="flex flex-col sm:flex-row">
          <!-- Presets sidebar -->
          @if (presets().length > 0) {
            <div class="border-b sm:border-b-0 sm:border-r border-border p-3 space-y-0.5 sm:min-w-[150px]">
              <p class="px-3 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Presets</p>
              @for (preset of presets(); track preset.label) {
                <button
                  type="button"
                  class="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
                  (mousedown)="selectPreset(preset); $event.preventDefault()"
                >
                  {{ preset.label }}
                </button>
              }
            </div>
          }

          <!-- Calendar(s) -->
          <div class="flex flex-col sm:flex-row">
            @if (dualCalendar()) {
              <!-- Left calendar -->
              <div class="p-1">
                <div class="flex items-center justify-between px-3 py-2">
                  <button
                    type="button"
                    class="inline-flex items-center justify-center rounded-md h-8 w-8 hover:bg-accent hover:text-accent-foreground transition-colors"
                    (click)="prevMonth()"
                    aria-label="Previous month"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                  </button>
                  <span class="text-sm font-semibold tracking-tight">{{ leftMonthLabel() }}</span>
                  <div class="w-8"></div>
                </div>
                <sny-calendar
                  mode="range"
                  [(rangeValue)]="internalRange"
                  [min]="min()"
                  [max]="max()"
                  [locale]="locale()"
                  [showNavigation]="false"
                  [borderless]="true"
                  [initialViewDate]="leftViewDate()"
                  (rangeValueChange)="onRangeChanged($event)"
                />
              </div>
              <div class="border-t sm:border-t-0 sm:border-l border-border"></div>
              <!-- Right calendar -->
              <div class="p-1">
                <div class="flex items-center justify-between px-3 py-2">
                  <div class="w-8"></div>
                  <span class="text-sm font-semibold tracking-tight">{{ rightMonthLabel() }}</span>
                  <button
                    type="button"
                    class="inline-flex items-center justify-center rounded-md h-8 w-8 hover:bg-accent hover:text-accent-foreground transition-colors"
                    (click)="nextMonth()"
                    aria-label="Next month"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                  </button>
                </div>
                <sny-calendar
                  mode="range"
                  [(rangeValue)]="internalRange"
                  [min]="min()"
                  [max]="max()"
                  [locale]="locale()"
                  [showNavigation]="false"
                  [borderless]="true"
                  [initialViewDate]="rightViewDate()"
                  (rangeValueChange)="onRangeChanged($event)"
                />
              </div>
            } @else {
              <!-- Single calendar -->
              <sny-calendar
                mode="range"
                [(rangeValue)]="internalRange"
                [min]="min()"
                [max]="max()"
                [locale]="locale()"
                (rangeValueChange)="onRangeChanged($event)"
              />
            }
          </div>
        </div>
      </div>
    }
  `,
})
export class SnyDateRangePickerComponent implements ControlValueAccessor, OnDestroy {
  readonly value = model<DateRange | null>(null);
  readonly placeholder = input('Pick a date range...');
  readonly size = input<DatePickerSize>('md');
  readonly locale = input('en-US');
  readonly dateFormat = input<Intl.DateTimeFormatOptions>({
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  readonly separator = input(' \u2014 ');
  readonly dualCalendar = input(false);
  readonly presets = input<DatePickerPreset[]>([]);
  readonly min = input<Date | undefined>(undefined);
  readonly max = input<Date | undefined>(undefined);
  readonly clearable = input(true);
  readonly disabled = input(false);
  readonly class = input<string>('');

  readonly open = signal(false);
  readonly internalRange = signal<DateRange | null>(null);
  readonly leftViewDate = signal(new Date());

  private readonly _disabledByCva = signal(false);
  protected readonly isDisabled = computed(() => this.disabled() || this._disabledByCva());

  private readonly triggerRef = viewChild<ElementRef<HTMLButtonElement>>('triggerEl');
  private readonly dropdownRef = viewChild<ElementRef<HTMLDivElement>>('dropdownEl');
  private readonly elRef = inject(ElementRef);

  private scrollHandler: (() => void) | null = null;
  private resizeHandler: (() => void) | null = null;

  private _onChange: (value: DateRange | null) => void = () => {};
  protected onTouched: () => void = () => {};

  // Computed
  readonly rightViewDate = computed(() => {
    const d = this.leftViewDate();
    return new Date(d.getFullYear(), d.getMonth() + 1, 1);
  });

  readonly leftMonthLabel = computed(() =>
    this.leftViewDate().toLocaleDateString(this.locale(), { month: 'long', year: 'numeric' })
  );

  readonly rightMonthLabel = computed(() =>
    this.rightViewDate().toLocaleDateString(this.locale(), { month: 'long', year: 'numeric' })
  );

  readonly displayValue = computed(() => {
    const r = this.value();
    if (!r?.start) return '';
    const fmt = (d: Date) => d.toLocaleDateString(this.locale(), this.dateFormat());
    if (!r.end) return fmt(r.start) + this.separator() + '...';
    return fmt(r.start) + this.separator() + fmt(r.end);
  });

  protected readonly triggerClass = computed(() =>
    cn(datePickerTriggerVariants({ size: this.size() }), this.class())
  );

  // CVA
  writeValue(val: DateRange | null): void {
    this.value.set(val ?? null);
    this.internalRange.set(val ?? null);
    if (val?.start) {
      this.leftViewDate.set(new Date(val.start.getFullYear(), val.start.getMonth(), 1));
    }
  }

  registerOnChange(fn: (value: DateRange | null) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._disabledByCva.set(isDisabled);
  }

  // Actions
  onRangeChanged(range: DateRange | null): void {
    this.internalRange.set(range);
    if (range?.start && range?.end) {
      this.value.set(range);
      this._onChange(range);
      setTimeout(() => this.close(), 150);
    }
  }

  selectPreset(preset: DatePickerPreset): void {
    this.value.set(preset.range);
    this.internalRange.set(preset.range);
    this._onChange(preset.range);
    this.close();
  }

  clear(event: Event): void {
    event.stopPropagation();
    this.value.set(null);
    this.internalRange.set(null);
    this._onChange(null);
  }

  prevMonth(): void {
    this.leftViewDate.update((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  }

  nextMonth(): void {
    this.leftViewDate.update((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1));
  }

  toggle(): void {
    if (this.open()) {
      this.close();
    } else {
      this.internalRange.set(this.value());
      this.updateDropdownPosition();
      this.open.set(true);
      this.addGlobalListeners();
      setTimeout(() => this.updateDropdownPosition());
    }
  }

  close(): void {
    this.open.set(false);
    this.removeGlobalListeners();
  }

  // Positioning
  private updateDropdownPosition(): void {
    const trigger = this.triggerRef()?.nativeElement;
    if (!trigger) return;
    const rect = trigger.getBoundingClientRect();
    const dropdown = this.dropdownRef()?.nativeElement;
    if (dropdown) {
      dropdown.style.top = `${rect.bottom + 4}px`;
      dropdown.style.left = `${rect.left}px`;
    }
  }

  private addGlobalListeners(): void {
    this.removeGlobalListeners();
    this.scrollHandler = () => {
      requestAnimationFrame(() => this.updateDropdownPosition());
    };
    this.resizeHandler = () => {
      requestAnimationFrame(() => this.updateDropdownPosition());
    };
    document.addEventListener('scroll', this.scrollHandler, { capture: true, passive: true });
    window.addEventListener('resize', this.resizeHandler, { passive: true });
  }

  private removeGlobalListeners(): void {
    if (this.scrollHandler) {
      document.removeEventListener('scroll', this.scrollHandler, { capture: true } as EventListenerOptions);
      this.scrollHandler = null;
    }
    if (this.resizeHandler) {
      window.removeEventListener('resize', this.resizeHandler);
      this.resizeHandler = null;
    }
  }

  ngOnDestroy(): void {
    this.removeGlobalListeners();
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
}
