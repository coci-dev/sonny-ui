import { Component, computed, ElementRef, inject, input, model, OnDestroy, viewChild } from '@angular/core';
import { cn } from '../core/utils/cn';
import { sliderTrackVariants, sliderThumbSize, type SliderSize } from './slider.variants';

@Component({
  selector: 'sny-slider',
  standalone: true,
  host: {
    class: 'block',
    '(keydown)': 'onKeydown($event)',
  },
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
        [disabled]="disabled()"
        [class]="thumbClass()"
        [style.left.%]="percentage()"
        tabindex="0"
      ></button>
    </div>
  `,
})
export class SnySliderComponent implements OnDestroy {
  readonly value = model(0);
  readonly min = input(0);
  readonly max = input(100);
  readonly step = input(1);
  readonly disabled = input(false);
  readonly size = input<SliderSize>('md');
  readonly class = input<string>('');

  private readonly trackRef = viewChild<ElementRef<HTMLDivElement>>('trackEl');
  private moveHandler: ((e: MouseEvent | TouchEvent) => void) | null = null;
  private upHandler: (() => void) | null = null;

  protected readonly percentage = computed(() => {
    const range = this.max() - this.min();
    if (range <= 0) return 0;
    return ((this.value() - this.min()) / range) * 100;
  });

  protected readonly trackClass = computed(() =>
    cn(sliderTrackVariants({ size: this.size() }), this.disabled() && 'opacity-50 cursor-not-allowed', this.class())
  );

  protected readonly thumbClass = computed(() =>
    cn(
      'absolute top-1/2 -translate-x-1/2 -translate-y-1/2 block rounded-full border-2 border-primary bg-background shadow ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
      sliderThumbSize[this.size()]
    )
  );

  private updateValueFromPosition(clientX: number): void {
    if (this.disabled()) return;
    const track = this.trackRef()?.nativeElement;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const percent = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const raw = this.min() + percent * (this.max() - this.min());
    const stepped = Math.round(raw / this.step()) * this.step();
    this.value.set(Math.max(this.min(), Math.min(this.max(), stepped)));
  }

  onTrackMousedown(event: MouseEvent): void {
    if (this.disabled()) return;
    event.preventDefault();
    this.updateValueFromPosition(event.clientX);
    this.moveHandler = (e: MouseEvent | TouchEvent) => {
      const clientX = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
      this.updateValueFromPosition(clientX);
    };
    this.upHandler = () => this.removeListeners();
    document.addEventListener('mousemove', this.moveHandler as EventListener);
    document.addEventListener('mouseup', this.upHandler);
  }

  onTrackTouchstart(event: TouchEvent): void {
    if (this.disabled()) return;
    this.updateValueFromPosition(event.touches[0].clientX);
    this.moveHandler = (e: MouseEvent | TouchEvent) => {
      const clientX = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
      this.updateValueFromPosition(clientX);
    };
    this.upHandler = () => this.removeListeners();
    document.addEventListener('touchmove', this.moveHandler as EventListener, { passive: true });
    document.addEventListener('touchend', this.upHandler);
  }

  onKeydown(event: KeyboardEvent): void {
    if (this.disabled()) return;
    const step = this.step();
    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        event.preventDefault();
        this.value.set(Math.min(this.max(), this.value() + step));
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        event.preventDefault();
        this.value.set(Math.max(this.min(), this.value() - step));
        break;
      case 'Home':
        event.preventDefault();
        this.value.set(this.min());
        break;
      case 'End':
        event.preventDefault();
        this.value.set(this.max());
        break;
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
