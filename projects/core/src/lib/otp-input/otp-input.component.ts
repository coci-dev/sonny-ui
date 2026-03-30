import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  forwardRef,
  input,
  linkedSignal,
  model,
  output,
  signal,
  untracked,
  viewChildren,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { cn } from '../core/utils/cn';
import { otpCellVariants, type OtpInputSize, type OtpInputType } from './otp-input.variants';

@Component({
  selector: 'sny-otp-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SnyOtpInputComponent), multi: true },
  ],
  template: `
    <div
      role="group"
      [attr.aria-label]="'OTP input, ' + length() + ' digits'"
      class="flex items-center gap-2"
    >
      @for (digit of digits(); track $index; let i = $index) {
        @if (separator() !== null && i === separator() && i > 0) {
          <span class="text-muted-foreground text-lg select-none" aria-hidden="true">—</span>
        }
        <input
          #inputEl
          [type]="mask() ? 'password' : 'text'"
          [inputMode]="type() === 'number' ? 'numeric' : 'text'"
          [attr.pattern]="type() === 'number' ? '[0-9]' : '[a-zA-Z0-9]'"
          maxlength="1"
          autocomplete="one-time-code"
          [value]="digit"
          [placeholder]="placeholder()"
          [disabled]="isDisabled()"
          [class]="cellClass(i)"
          [attr.aria-label]="'Digit ' + (i + 1) + ' of ' + length()"
          (input)="onInput($event, i)"
          (keydown)="onKeydown($event, i)"
          (paste)="onPaste($event, i)"
          (focus)="focusedIndex.set(i)"
          (blur)="onBlur()"
        />
      }
    </div>
  `,
})
export class SnyOtpInputComponent implements ControlValueAccessor {
  // Public API
  readonly length = input(6);
  readonly type = input<OtpInputType>('number');
  readonly size = input<OtpInputSize>('md');
  readonly disabled = input(false);
  readonly mask = input(false);
  readonly autoFocus = input(true);
  readonly placeholder = input('');
  readonly separator = input<number | null>(null);
  readonly status = input<'idle' | 'loading' | 'success' | 'error'>('idle');
  readonly value = model('');

  readonly completed = output<string>();

  // Internal state
  readonly digits = linkedSignal<string[]>(() => Array(this.length()).fill(''));
  readonly focusedIndex = signal(-1);
  readonly inputRefs = viewChildren<ElementRef<HTMLInputElement>>('inputEl');

  private readonly _disabledByCva = signal(false);
  readonly isDisabled = computed(() => this.disabled() || this._disabledByCva() || this.status() === 'loading');

  private _onChange: (value: string) => void = () => {};
  private _onTouched: () => void = () => {};

  // Computed
  readonly fullValue = computed(() => this.digits().join(''));
  readonly isComplete = computed(() => {
    const d = this.digits();
    return d.length === this.length() && d.every((c) => c !== '');
  });

  constructor() {
    // Sync value → digits when value changes externally (e.g. reset)
    effect(() => {
      const val = this.value();
      untracked(() => {
        const chars = val.split('').slice(0, this.length());
        const padded = [...chars, ...Array(this.length() - chars.length).fill('')];
        const current = this.digits();
        if (padded.join('') !== current.join('')) {
          this.digits.set(padded);
        }
      });
    });

    afterNextRender(() => {
      if (this.autoFocus()) {
        this.focusInput(0);
      }
    });
  }

  // CVA
  writeValue(val: string): void {
    const str = val ?? '';
    this.value.set(str);
    const chars = str.split('').slice(0, this.length());
    const padded = [...chars, ...Array(this.length() - chars.length).fill('')];
    this.digits.set(padded);
  }

  registerOnChange(fn: (value: string) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._disabledByCva.set(isDisabled);
  }

  // Cell class
  cellClass(index: number): string {
    const isFocused = this.focusedIndex() === index;
    const hasValue = this.digits()[index] !== '';
    const st = this.status();
    return cn(
      otpCellVariants({ size: this.size() }),
      st === 'idle' && isFocused && 'border-primary ring-2 ring-ring',
      st === 'idle' && hasValue && !isFocused && 'border-primary/50',
      st === 'loading' && 'border-muted-foreground/30 opacity-70',
      st === 'success' && 'border-green-500 bg-green-500/5',
      st === 'error' && 'border-destructive bg-destructive/5 animate-shake',
    );
  }

  // Input handler
  onInput(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    const char = input.value.slice(-1);

    if (!this.isValidChar(char)) {
      input.value = this.digits()[index];
      return;
    }

    this.setDigit(index, char);

    if (index < this.length() - 1) {
      this.focusInput(index + 1);
    }

    this.emitValue();
  }

  // Keyboard handler
  onKeydown(event: KeyboardEvent, index: number): void {
    switch (event.key) {
      case 'Backspace':
        event.preventDefault();
        if (this.digits()[index] !== '') {
          this.setDigit(index, '');
          this.emitValue();
        } else if (index > 0) {
          this.setDigit(index - 1, '');
          this.focusInput(index - 1);
          this.emitValue();
        }
        break;

      case 'Delete':
        event.preventDefault();
        this.setDigit(index, '');
        this.emitValue();
        break;

      case 'ArrowLeft':
        event.preventDefault();
        if (index > 0) this.focusInput(index - 1);
        break;

      case 'ArrowRight':
        event.preventDefault();
        if (index < this.length() - 1) this.focusInput(index + 1);
        break;

      case 'Home':
        event.preventDefault();
        this.focusInput(0);
        break;

      case 'End':
        event.preventDefault();
        this.focusInput(this.length() - 1);
        break;
    }
  }

  // Paste handler
  onPaste(event: ClipboardEvent, index: number): void {
    event.preventDefault();
    const text = event.clipboardData?.getData('text') ?? '';
    const chars = text.split('').filter((c) => this.isValidChar(c));

    if (chars.length === 0) return;

    const newDigits = [...this.digits()];
    let lastFilledIndex = index;

    for (let i = 0; i < chars.length && index + i < this.length(); i++) {
      newDigits[index + i] = chars[i];
      lastFilledIndex = index + i;
    }

    this.digits.set(newDigits);

    const nextIndex = Math.min(lastFilledIndex + 1, this.length() - 1);
    this.focusInput(nextIndex);
    this.emitValue();
  }

  // Blur
  onBlur(): void {
    this.focusedIndex.set(-1);
    this._onTouched();
  }

  // Helpers
  private setDigit(index: number, char: string): void {
    this.digits.update((d) => {
      const next = [...d];
      next[index] = char;
      return next;
    });
  }

  private emitValue(): void {
    const val = this.fullValue();
    this.value.set(val);
    this._onChange(val);

    if (this.isComplete()) {
      this.completed.emit(val);
    }
  }

  private focusInput(index: number): void {
    const refs = this.inputRefs();
    if (refs[index]) {
      const el = refs[index].nativeElement;
      el.focus();
      el.select();
    }
  }

  private isValidChar(char: string): boolean {
    if (!char || char.length !== 1) return false;
    if (this.type() === 'number') return /^[0-9]$/.test(char);
    return /^[a-zA-Z0-9]$/.test(char);
  }

}
