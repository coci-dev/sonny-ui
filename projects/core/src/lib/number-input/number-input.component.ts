import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  forwardRef,
  input,
  model,
  signal,
  untracked,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { cn } from '../core/utils/cn';
import { numberInputVariants, type NumberInputSize } from './number-input.variants';

@Component({
  selector: 'sny-number-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SnyNumberInputComponent), multi: true },
  ],
  template: `
    <div [class]="containerClass()">
      <button
        type="button"
        class="px-2.5 hover:bg-accent transition-colors border-r border-border disabled:opacity-40 disabled:cursor-not-allowed"
        [disabled]="isDisabled() || atMin()"
        (click)="decrement()"
        aria-label="Decrease"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/></svg>
      </button>
      <input
        #inputEl
        type="text"
        inputmode="decimal"
        class="flex-1 w-14 text-center outline-none bg-transparent font-medium"
        [value]="inputValue()"
        [disabled]="isDisabled()"
        [placeholder]="placeholder()"
        [attr.aria-label]="'Number input'"
        [attr.aria-valuemin]="min() ?? null"
        [attr.aria-valuemax]="max() ?? null"
        [attr.aria-valuenow]="value()"
        role="spinbutton"
        (input)="onInput($event)"
        (blur)="commitValue()"
        (keydown)="onKeydown($event)"
      />
      <button
        type="button"
        class="px-2.5 hover:bg-accent transition-colors border-l border-border disabled:opacity-40 disabled:cursor-not-allowed"
        [disabled]="isDisabled() || atMax()"
        (click)="increment()"
        aria-label="Increase"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
      </button>
    </div>
  `,
})
export class SnyNumberInputComponent implements ControlValueAccessor {
  readonly value = model(0);
  readonly min = input<number | null>(null);
  readonly max = input<number | null>(null);
  readonly step = input(1);
  readonly disabled = input(false);
  readonly size = input<NumberInputSize>('md');
  readonly placeholder = input('');
  readonly class = input<string>('');

  readonly inputValue = signal('0');
  private readonly _disabledByCva = signal(false);
  readonly isDisabled = computed(() => this.disabled() || this._disabledByCva());

  readonly atMin = computed(() => this.min() !== null && this.value() <= this.min()!);
  readonly atMax = computed(() => this.max() !== null && this.value() >= this.max()!);

  readonly containerClass = computed(() =>
    cn(numberInputVariants({ size: this.size() }), this.isDisabled() && 'opacity-50', this.class())
  );

  private _onChange: (value: number) => void = () => {};
  private _onTouched: () => void = () => {};

  constructor() {
    effect(() => {
      const val = this.value();
      untracked(() => this.inputValue.set(String(val)));
    });
  }

  writeValue(val: number): void {
    this.value.set(val ?? 0);
  }

  registerOnChange(fn: (value: number) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._disabledByCva.set(isDisabled);
  }

  increment(): void {
    this.setValue(this.value() + this.step());
  }

  decrement(): void {
    this.setValue(this.value() - this.step());
  }

  onInput(event: Event): void {
    this.inputValue.set((event.target as HTMLInputElement).value);
  }

  commitValue(): void {
    const parsed = parseFloat(this.inputValue());
    if (isNaN(parsed)) {
      this.inputValue.set(String(this.value()));
    } else {
      this.setValue(parsed);
    }
    this._onTouched();
  }

  onKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault();
        this.increment();
        break;
      case 'ArrowDown':
        event.preventDefault();
        this.decrement();
        break;
    }
  }

  private setValue(raw: number): void {
    let clamped = raw;
    if (this.min() !== null) clamped = Math.max(this.min()!, clamped);
    if (this.max() !== null) clamped = Math.min(this.max()!, clamped);
    const rounded = parseFloat(clamped.toFixed(10));
    this.value.set(rounded);
    this._onChange(rounded);
  }
}
