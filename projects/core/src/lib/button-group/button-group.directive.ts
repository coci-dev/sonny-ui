import { Directive, computed, input } from '@angular/core';
import { cn } from '../core/utils/cn';
import { buttonGroupVariants, type ButtonGroupOrientation } from './button-group.variants';

@Directive({
  selector: '[snyButtonGroup]',
  standalone: true,
  host: {
    role: 'group',
    '[class]': 'computedClass()',
  },
})
export class SnyButtonGroupDirective {
  readonly orientation = input<ButtonGroupOrientation>('horizontal');
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn(buttonGroupVariants({ orientation: this.orientation() }), this.class())
  );
}
