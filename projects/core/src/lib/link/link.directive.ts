import { Directive, computed, input } from '@angular/core';
import { cn } from '../core/utils/cn';
import { linkVariants, type LinkVariant } from './link.variants';

@Directive({
  selector: 'a[snyLink]',
  host: {
    '[class]': 'computedClass()',
  },
})
export class SnyLinkDirective {
  readonly variant = input<LinkVariant>('default');
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn(linkVariants({ variant: this.variant() }), this.class())
  );
}
