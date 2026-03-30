import { Directive, computed, input } from '@angular/core';
import { cn } from '../core/utils/cn';
import { radioVariants, type RadioSize } from './radio.variants';

@Directive({
  selector: 'input[type="radio"][snyRadio]',
  host: { '[class]': 'computedClass()' },
})
export class SnyRadioDirective {
  readonly size = input<RadioSize>('md');
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn(radioVariants({ size: this.size() }), this.class())
  );
}
