import { Directive, computed, input } from '@angular/core';
import { cn } from '../core/utils/cn';
import { skeletonVariants, type SkeletonVariant, type SkeletonSize } from './skeleton.variants';

@Directive({
  selector: '[snySkeleton]',
  host: {
    '[class]': 'computedClass()',
    'aria-busy': 'true',
    'aria-hidden': 'true',
  },
})
export class SnySkeletonDirective {
  readonly variant = input<SkeletonVariant>('line');
  readonly size = input<SkeletonSize>('md');
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn(skeletonVariants({ variant: this.variant(), size: this.size() }), this.class())
  );
}
