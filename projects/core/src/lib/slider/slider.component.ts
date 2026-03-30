import { ChangeDetectionStrategy, Component, computed, ElementRef, forwardRef, input, model, OnDestroy, signal, viewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { cn } from '../core/utils/cn';
import { sliderTrackVariants, sliderThumbSize, type SliderSize } from './slider.variants';

@Component({
  selector: 'sny-slider',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block',
    '(keydown)': 'onKeydown($event)',
  },
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SnySliderComponent), multi: true },
  ],
  template: `
    <div
      #trackEl
      [class]="trackClass()"
      (mousedown)="onTrackMousedown($event)"
      (touchstart)="onTrackTouchstart($event)"
    >
      <div class="absolute h-full rounded-full bg-primary" [style.width.%]="percentage()"></div>
      <button
        type="button"
        role="slider"
        [attr.aria-valuemin]="min()"
        [attr.aria-valuemax]="max()"
        [attr.aria-valuenow]="value()"
        [disabled]="isDisabled()"
        [class]="thumbClass()"
        [style.left.%]="percentage()"
        tabindex="0"
        (blur)="onTouched()"
      ></button>
    </div>
  `,
})
export class SnySliderComponent implements ControlValueAccessor, OnDestroy {
  readonly value = model(0);
  readonly min = input(0);
  readonly max = input(100);
  readonly step = input(1);
  readonly disabled = input(false);
  readonly size = input<SliderSize>('md');
  readonly class = input<string>('');

  private readonly _disabledByCva = signal(false);
  protected readonly isDisabled = computed(() => this.disabled() || this._disabledByCva());

  private readonly trackRef = viewChild<ElementRef<HTMLDivElement>>('trackEl');
  private moveHandler: ((e: MouseEvent | TouchEvent) => void) | null = null;
  private upHandler: (() => void) | null = null;

  private _onChange: (value: number) => void = () => {};
  protected onTouched: () => void = () => {};

  writeValue(val: number): void {
    this.value.set(val ?? 0);
  }

  registerOnChange(fn: (value: number) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._disabledByCva.set(isDisabled);
  }

  protected readonly percentage = computed(() => {
    const range = this.max() - this.min();
    if (range <= 0) return 0;
    return ((this.value() - this.min()) / range) * 100;
  });

  protected readonly trackClass = computed(() =>
    cn(sliderTrackVariants({ size: this.size() }), this.isDisabled() && 'opacity-50 cursor-not-allowed', this.class())
  );

  protected readonly thumbClass = computed(() =>
    cn(
      'absolute top-1/2 -translate-x-1/2 -translate-y-1/2 block rounded-full border-2 border-primary bg-background shadow ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
      sliderThumbSize[this.size()]
    )
  );

  private updateValueFromPosition(clientX: number): void {
    if (this.isDisabled()) return;
    const track = this.trackRef()?.nativeElement;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const percent = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const raw = this.min() + percent * (this.max() - this.min());
    const stepped = Math.round(raw / this.step()) * this.step();
    const clamped = Math.max(this.min(), Math.min(this.max(), stepped));
    this.value.set(clamped);
    this._onChange(clamped);
  }

  onTrackMousedown(event: MouseEvent): void {
    if (this.isDisabled()) return;
    event.preventDefault();
    this.updateValueFromPosition(event.clientX);
    this.moveHandler = (e: MouseEvent | TouchEvent) => {
      const clientX = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
      this.updateValueFromPosition(clientX);
    };
    this.upHandler = () => {
      this.onTouched();
      this.removeListeners();
    };
    document.addEventListener('mousemove', this.moveHandler as EventListener);
    document.addEventListener('mouseup', this.upHandler);
  }

  onTrackTouchstart(event: TouchEvent): void {
    if (this.isDisabled()) return;
    this.updateValueFromPosition(event.touches[0].clientX);
    this.moveHandler = (e: MouseEvent | TouchEvent) => {
      const clientX = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
      this.updateValueFromPosition(clientX);
    };
    this.upHandler = () => {
      this.onTouched();
      this.removeListeners();
    };
    document.addEventListener('touchmove', this.moveHandler as EventListener, { passive: true });
    document.addEventListener('touchend', this.upHandler);
  }

  onKeydown(event: KeyboardEvent): void {
    if (this.isDisabled()) return;
    const step = this.step();
    let newVal: number | undefined;
    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        event.preventDefault();
        newVal = Math.min(this.max(), this.value() + step);
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        event.preventDefault();
        newVal = Math.max(this.min(), this.value() - step);
        break;
      case 'Home':
        event.preventDefault();
        newVal = this.min();
        break;
      case 'End':
        event.preventDefault();
        newVal = this.max();
        break;
    }
    if (newVal !== undefined) {
      this.value.set(newVal);
      this._onChange(newVal);
    }
  }

  private removeListeners(): void {
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

  ngOnDestroy(): void {
    this.removeListeners();
  }
}
