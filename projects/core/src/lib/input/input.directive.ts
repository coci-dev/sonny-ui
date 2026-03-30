import { Directive, computed, input } from '@angular/core';
import { cn } from '../core/utils/cn';
import { inputVariants, type InputVariant, type InputSize } from './input.variants';

@Directive({
  selector: 'input[snyInput], textarea[snyInput]',
  host: {
    '[class]': 'computedClass()',
    '[attr.aria-invalid]': 'variant() === "error" || null',
    '[attr.aria-describedby]': 'ariaDescribedBy() || null',
  },
})
export class SnyInputDirective {
  readonly variant = input<InputVariant>('default');
  readonly inputSize = input<InputSize>('md');
  readonly class = input<string>('');
  readonly ariaDescribedBy = input<string>('');

  protected readonly computedClass = computed(() =>
    cn(
      inputVariants({ variant: this.variant(), inputSize: this.inputSize() }),
      this.class()
    )
  );
}
