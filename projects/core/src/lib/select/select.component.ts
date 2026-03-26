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
import { selectTriggerVariants, type SelectSize } from './select.variants';

export interface SelectOption {
  value: string;
  label: string;
}

@Component({
  selector: 'sny-select',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'relative inline-block w-full',
  },
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SnySelectComponent), multi: true },
  ],
  template: `
    <button
      #triggerEl
      type="button"
      role="combobox"
      [attr.aria-expanded]="open()"
      aria-haspopup="listbox"
      [disabled]="isDisabled()"
      [class]="triggerClass()"
      (click)="toggle()"
      (keydown)="onTriggerKeydown($event)"
      (blur)="onTouched()"
    >
      <span [class]="selectedLabel() ? '' : 'text-muted-foreground'">
        {{ selectedLabel() || placeholder() }}
      </span>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0 opacity-50"><path d="m6 9 6 6 6-6"/></svg>
    </button>

    @if (open()) {
      <div
        #dropdownEl
        class="fixed z-50 rounded-sm border border-border bg-popover text-popover-foreground shadow-md"
      >
        <ul role="listbox" class="max-h-60 overflow-auto p-1">
          @for (opt of options(); track opt.value; let i = $index) {
            <li
              role="option"
              [attr.aria-selected]="value() === opt.value"
              [class]="optionClass(i)"
              (mousedown)="select(opt); $event.preventDefault()"
              (mouseenter)="activeIndex.set(i)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                [class]="value() === opt.value ? 'mr-2 shrink-0 opacity-100' : 'mr-2 shrink-0 opacity-0'"
              ><path d="M20 6 9 17l-5-5"/></svg>
              {{ opt.label }}
            </li>
          }
        </ul>
      </div>
    }
  `,
})
export class SnySelectComponent implements ControlValueAccessor, OnDestroy {
  readonly options = input<SelectOption[]>([]);
  readonly placeholder = input('Select...');
  readonly size = input<SelectSize>('md');
  readonly disabled = input(false);
  readonly class = input<string>('');
  readonly value = model<string>('');

  readonly open = signal(false);
  readonly activeIndex = signal(0);

  private readonly _disabledByCva = signal(false);
  protected readonly isDisabled = computed(() => this.disabled() || this._disabledByCva());

  private readonly triggerRef = viewChild<ElementRef<HTMLButtonElement>>('triggerEl');
  private readonly dropdownRef = viewChild<ElementRef<HTMLDivElement>>('dropdownEl');
  private readonly elRef = inject(ElementRef);

  private scrollHandler: (() => void) | null = null;
  private resizeHandler: (() => void) | null = null;

  private _onChange: (value: string) => void = () => {};
  protected onTouched: () => void = () => {};

  writeValue(val: string): void {
    this.value.set(val ?? '');
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

  readonly selectedLabel = computed(() => {
    const v = this.value();
    if (!v) return '';
    const opt = this.options().find(o => o.value === v);
    return opt?.label ?? '';
  });

  protected readonly triggerClass = computed(() =>
    cn(selectTriggerVariants({ size: this.size() }), this.class())
  );

  optionClass(index: number): string {
    const base = 'relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors';
    const active = index === this.activeIndex() ? 'bg-accent text-accent-foreground' : 'hover:bg-accent/50';
    return cn(base, active);
  }

  private updateDropdownPosition(): void {
    const trigger = this.triggerRef()?.nativeElement;
    if (!trigger) return;
    const rect = trigger.getBoundingClientRect();
    const dropdown = this.dropdownRef()?.nativeElement;
    if (dropdown) {
      dropdown.style.top = `${rect.bottom + 4}px`;
      dropdown.style.left = `${rect.left}px`;
      dropdown.style.width = `${rect.width}px`;
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

  toggle(): void {
    if (this.open()) {
      this.close();
    } else {
      this.open.set(true);
      this.activeIndex.set(
        Math.max(0, this.options().findIndex(o => o.value === this.value()))
      );
      this.addGlobalListeners();
      setTimeout(() => this.updateDropdownPosition());
    }
  }

  close(): void {
    this.open.set(false);
    this.removeGlobalListeners();
  }

  select(opt: SelectOption): void {
    this.value.set(opt.value);
    this._onChange(opt.value);
    this.close();
  }

  onTriggerKeydown(event: KeyboardEvent): void {
    const items = this.options();
    if (!this.open()) {
      if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        this.toggle();
      }
      return;
    }
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.activeIndex.update(i => Math.min(i + 1, items.length - 1));
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.activeIndex.update(i => Math.max(i - 1, 0));
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (items[this.activeIndex()]) {
          this.select(items[this.activeIndex()]);
        }
        break;
      case 'Escape':
        this.close();
        break;
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elRef.nativeElement.contains(event.target)) {
      this.close();
    }
  }
}
