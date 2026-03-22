import { Directive, computed, input } from '@angular/core';
import { cn } from '../core/utils/cn';

export type IndicatorPosition = 'top-start' | 'top-center' | 'top-end' | 'middle-start' | 'middle-end' | 'bottom-start' | 'bottom-center' | 'bottom-end';
export type IndicatorVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';

const positionMap: Record<IndicatorPosition, string> = {
  'top-start': 'top-0 left-0 -translate-x-1/2 -translate-y-1/2',
  'top-center': 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2',
  'top-end': 'top-0 right-0 translate-x-1/2 -translate-y-1/2',
  'middle-start': 'top-1/2 left-0 -translate-x-1/2 -translate-y-1/2',
  'middle-end': 'top-1/2 right-0 translate-x-1/2 -translate-y-1/2',
  'bottom-start': 'bottom-0 left-0 -translate-x-1/2 translate-y-1/2',
  'bottom-center': 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2',
  'bottom-end': 'bottom-0 right-0 translate-x-1/2 translate-y-1/2',
};

const variantMap: Record<IndicatorVariant, string> = {
  default: 'bg-primary text-primary-foreground',
  primary: 'bg-primary text-primary-foreground',
  secondary: 'bg-secondary text-secondary-foreground',
  success: 'bg-green-600 text-white dark:bg-green-500',
  warning: 'bg-yellow-500 text-white dark:bg-yellow-400 dark:text-black',
  error: 'bg-destructive text-destructive-foreground',
};

@Directive({
  selector: '[snyIndicator]',
  standalone: true,
  host: { '[class]': 'computedClass()' },
})
export class SnyIndicatorDirective {
  readonly class = input<string>('');
  protected readonly computedClass = computed(() =>
    cn('relative inline-flex', this.class())
  );
}

@Directive({
  selector: '[snyIndicatorBadge]',
  standalone: true,
  host: {
    '[class]': 'computedClass()',
    '[attr.aria-label]': 'ariaLabel() || null',
  },
})
export class SnyIndicatorBadgeDirective {
  readonly position = input<IndicatorPosition>('top-end');
  readonly variant = input<IndicatorVariant>('default');
  readonly ariaLabel = input<string>('');
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn(
      'absolute z-10 inline-flex items-center justify-center rounded-full text-xs font-bold min-w-[1.25rem] h-5 px-1',
      positionMap[this.position()],
      variantMap[this.variant()],
      this.class()
    )
  );
}
