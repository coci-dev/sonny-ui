import { Directive, computed, input } from '@angular/core';
import { cn } from '../core/utils/cn';
import { statusVariants, type StatusVariant, type StatusSize } from './status.variants';

const variantLabels: Record<StatusVariant, string> = {
  default: 'Active',
  success: 'Online',
  warning: 'Away',
  error: 'Error',
  info: 'Info',
  neutral: 'Offline',
};

@Directive({
  selector: '[snyStatus]',
  host: {
    'role': 'status',
    '[attr.aria-label]': 'ariaLabel()',
    '[class]': 'computedClass()',
  },
})
export class SnyStatusDirective {
  readonly variant = input<StatusVariant>('default');
  readonly size = input<StatusSize>('md');
  readonly pulse = input(false);
  readonly class = input<string>('');

  protected readonly ariaLabel = computed(() => variantLabels[this.variant()]);

  protected readonly computedClass = computed(() =>
    cn(
      statusVariants({ variant: this.variant(), size: this.size() }),
      this.pulse() && 'animate-pulse',
      this.class()
    )
  );
}
