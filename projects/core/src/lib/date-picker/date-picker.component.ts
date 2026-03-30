import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  forwardRef,
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
import { datePickerTriggerVariants, type DatePickerSize } from './date-picker.variants';

@Component({
  selector: 'sny-date-picker',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SnyCalendarComponent],
  host: {
    class: 'relative inline-block w-full',
    '(document:click)': 'onDocumentClick($event)',
    '(keydown.escape)': 'onEscape()',
  },
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SnyDatePickerComponent), multi: true },
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
        @if (clearable() && value()) {
          <button
            type="button"
            class="rounded-sm p-0.5 hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
            (click)="clear($event)"
            aria-label="Clear date"
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
        aria-label="Choose date"
        class="fixed z-50 rounded-md border border-border bg-popover text-popover-foreground shadow-lg animate-in fade-in-0 zoom-in-95"
      >
        <sny-calendar
          [(value)]="internalValue"
          [min]="min()"
          [max]="max()"
          [locale]="locale()"
          (valueChange)="onDateSelected($event)"
        />
      </div>
    }
  `,
})
export class SnyDatePickerComponent implements ControlValueAccessor, OnDestroy {
  readonly value = model<Date | null>(null);
  readonly placeholder = input('Pick a date...');
  readonly size = input<DatePickerSize>('md');
  readonly locale = input('en-US');
  readonly dateFormat = input<Intl.DateTimeFormatOptions>({
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  readonly min = input<Date | undefined>(undefined);
  readonly max = input<Date | undefined>(undefined);
  readonly clearable = input(true);
  readonly disabled = input(false);
  readonly class = input<string>('');

  readonly open = signal(false);
  readonly internalValue = signal<Date | null>(null);

  private readonly _disabledByCva = signal(false);
  protected readonly isDisabled = computed(() => this.disabled() || this._disabledByCva());

  private readonly triggerRef = viewChild<ElementRef<HTMLButtonElement>>('triggerEl');
  private readonly dropdownRef = viewChild<ElementRef<HTMLDivElement>>('dropdownEl');
  private readonly elRef = inject(ElementRef);

  private scrollHandler: (() => void) | null = null;
  private resizeHandler: (() => void) | null = null;

  private _onChange: (value: Date | null) => void = () => {};
  protected onTouched: () => void = () => {};

  // CVA
  writeValue(val: Date | null): void {
    this.value.set(val ?? null);
    this.internalValue.set(val ?? null);
  }

  registerOnChange(fn: (value: Date | null) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._disabledByCva.set(isDisabled);
  }

  // Display
  readonly displayValue = computed(() => {
    const d = this.value();
    if (!d) return '';
    return d.toLocaleDateString(this.locale(), this.dateFormat());
  });

  protected readonly triggerClass = computed(() =>
    cn(datePickerTriggerVariants({ size: this.size() }), this.class())
  );

  // Actions
  onDateSelected(date: Date | null): void {
    this.value.set(date);
    this._onChange(date);
    this.close();
  }

  clear(event: Event): void {
    event.stopPropagation();
    this.value.set(null);
    this.internalValue.set(null);
    this._onChange(null);
  }

  toggle(): void {
    if (this.open()) {
      this.close();
    } else {
      this.internalValue.set(this.value());
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

  // Positioning (combobox pattern)
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

  onDocumentClick(event: MouseEvent): void {
    if (!this.elRef.nativeElement.contains(event.target)) {
      this.close();
    }
  }

  onEscape(): void {
    this.close();
  }
}
