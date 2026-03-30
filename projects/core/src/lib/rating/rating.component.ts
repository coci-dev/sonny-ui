import { ChangeDetectionStrategy, Component, computed, forwardRef, input, model, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { cn } from '../core/utils/cn';
import { ratingVariants, type RatingSize, type RatingVariant } from './rating.variants';

interface StarState {
  index: number;
  fill: 'full' | 'half' | 'empty';
}

@Component({
  selector: 'sny-rating',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'role': 'slider',
    'tabindex': '0',
    '[attr.aria-valuenow]': 'value()',
    '[attr.aria-valuemin]': '0',
    '[attr.aria-valuemax]': 'max()',
    '[attr.aria-label]': '"Rating"',
    '[attr.aria-readonly]': 'readonly() || null',
    '[class]': 'computedClass()',
    '(keydown)': 'onKeydown($event)',
    '(mouseleave)': 'onMouseLeave()',
    '(blur)': 'onTouched()',
  },
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SnyRatingComponent), multi: true },
  ],
  template: `
    @for (star of stars(); track star.index) {
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        [class]="starClass(star)"
        (click)="onStarClick(star.index + 1)"
        (mouseenter)="onStarHover(star.index + 1)"
      >
        @if (ratingVariant() === 'star') {
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        } @else {
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        }
      </svg>
    }
  `,
})
export class SnyRatingComponent implements ControlValueAccessor {
  readonly value = model(0);
  readonly max = input(5);
  readonly readonly = input(false);
  readonly size = input<RatingSize>('md');
  readonly ratingVariant = input<RatingVariant>('star');
  readonly half = input(false);
  readonly class = input<string>('');

  private readonly _disabledByCva = signal(false);
  protected readonly isDisabled = computed(() => this.readonly() || this._disabledByCva());

  readonly hoverValue = signal<number | null>(null);

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

  readonly displayValue = computed(() => this.hoverValue() ?? this.value());

  readonly stars = computed<StarState[]>(() => {
    const display = this.displayValue();
    const m = this.max();
    return Array.from({ length: m }, (_, i) => {
      let fill: 'full' | 'half' | 'empty';
      if (i + 1 <= display) {
        fill = 'full';
      } else if (this.half() && i + 0.5 <= display) {
        fill = 'half';
      } else {
        fill = 'empty';
      }
      return { index: i, fill };
    });
  });

  protected readonly computedClass = computed(() =>
    cn(
      ratingVariants({ size: this.size() }),
      this.isDisabled() && 'pointer-events-none',
      this.class()
    )
  );

  starClass(star: StarState): string {
    const base = 'cursor-pointer transition-colors';
    switch (star.fill) {
      case 'full':
        return cn(base, 'fill-yellow-400 stroke-yellow-400');
      case 'half':
        return cn(base, 'fill-yellow-400/50 stroke-yellow-400');
      case 'empty':
        return cn(base, 'fill-none stroke-muted-foreground');
    }
  }

  onStarClick(index: number): void {
    if (this.isDisabled()) return;
    this.value.set(index);
    this._onChange(index);
  }

  onStarHover(index: number): void {
    if (this.isDisabled()) return;
    this.hoverValue.set(index);
  }

  onMouseLeave(): void {
    this.hoverValue.set(null);
  }

  onKeydown(event: KeyboardEvent): void {
    if (this.isDisabled()) return;
    const step = this.half() ? 0.5 : 1;
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
        newVal = Math.max(0, this.value() - step);
        break;
      case 'Home':
        event.preventDefault();
        newVal = 0;
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
}
