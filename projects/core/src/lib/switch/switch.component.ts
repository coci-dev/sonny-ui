import { ChangeDetectionStrategy, Component, computed, forwardRef, input, model, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { cn } from '../core/utils/cn';
import { switchTrackVariants, switchThumbSize, switchThumbTranslate, type SwitchSize } from './switch.variants';

@Component({
  selector: 'sny-switch',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'inline-flex' },
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SnySwitchComponent), multi: true },
  ],
  template: `
    <button
      type="button"
      role="switch"
      [attr.aria-checked]="checked()"
      [disabled]="isDisabled()"
      [class]="trackClass()"
      (click)="toggle()"
      (blur)="onTouched()"
    >
      <span [class]="thumbClass()"></span>
    </button>
  `,
})
export class SnySwitchComponent implements ControlValueAccessor {
  readonly checked = model(false);
  readonly disabled = input(false);
  readonly size = input<SwitchSize>('md');
  readonly class = input<string>('');

  private readonly _disabledByCva = signal(false);
  protected readonly isDisabled = computed(() => this.disabled() || this._disabledByCva());

  private _onChange: (value: boolean) => void = () => {};
  protected onTouched: () => void = () => {};

  writeValue(val: boolean): void {
    this.checked.set(val ?? false);
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

  toggle(): void {
    const newVal = !this.checked();
    this.checked.set(newVal);
    this._onChange(newVal);
  }

  protected readonly trackClass = computed(() =>
    cn(
      switchTrackVariants({ size: this.size() }),
      this.checked() ? 'bg-primary' : 'bg-input',
      this.class()
    )
  );

  protected readonly thumbClass = computed(() =>
    cn(
      'pointer-events-none block rounded-full bg-background shadow-lg ring-0 transition-transform',
      switchThumbSize[this.size()],
      this.checked() ? switchThumbTranslate[this.size()] : 'translate-x-0'
    )
  );
}
