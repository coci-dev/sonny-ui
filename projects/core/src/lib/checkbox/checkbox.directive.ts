import { Directive, computed, input } from '@angular/core';
import { cn } from '../core/utils/cn';
import { checkboxVariants, type CheckboxSize } from './checkbox.variants';

@Directive({
  selector: 'input[type="checkbox"][snyCheckbox]',
  standalone: true,
  host: { '[class]': 'computedClass()' },
})
export class SnyCheckboxDirective {
  readonly size = input<CheckboxSize>('md');
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn(checkboxVariants({ size: this.size() }), this.class())
  );
}
