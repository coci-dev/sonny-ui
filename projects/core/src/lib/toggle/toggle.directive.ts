import { Directive, computed, forwardRef, input, model, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { cn } from '../core/utils/cn';
import { toggleVariants, type ToggleVariant, type ToggleSize } from './toggle.variants';

@Directive({
  selector: 'button[snyToggle]',
  standalone: true,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SnyToggleDirective), multi: true },
  ],
  host: {
    '[class]': 'computedClass()',
    '[attr.aria-pressed]': 'pressed()',
    '[attr.disabled]': 'isDisabled() || null',
    '(click)': 'toggle()',
    '(blur)': 'onTouched()',
  },
})
export class SnyToggleDirective implements ControlValueAccessor {
  readonly variant = input<ToggleVariant>('default');
  readonly size = input<ToggleSize>('md');
  readonly pressed = model(false);
  readonly class = input<string>('');

  private readonly _disabledByCva = signal(false);
  protected readonly isDisabled = computed(() => this._disabledByCva());

  private _onChange: (value: boolean) => void = () => {};
  protected onTouched: () => void = () => {};

  writeValue(val: boolean): void {
    this.pressed.set(val ?? false);
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._disabledByCva.set(isDisabled);
  }

  protected toggle(): void {
    if (this.isDisabled()) return;
    const newVal = !this.pressed();
    this.pressed.set(newVal);
    this._onChange(newVal);
  }

  protected readonly computedClass = computed(() =>
    cn(
      toggleVariants({ variant: this.variant(), size: this.size() }),
      this.pressed() ? 'bg-accent text-accent-foreground' : '',
      this.class()
    )
  );
}
