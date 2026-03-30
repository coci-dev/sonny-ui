import { Directive, computed, input } from '@angular/core';
import { cn } from '../core/utils/cn';
import { labelVariants, type InputVariant } from './input.variants';

@Directive({
  selector: 'label[snyLabel]',
  host: { '[class]': 'computedClass()' },
})
export class SnyLabelDirective {
  readonly variant = input<InputVariant>('default');
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn(labelVariants({ variant: this.variant() }), this.class())
  );
}
