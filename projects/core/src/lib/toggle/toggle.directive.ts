import { Directive, computed, input, model } from '@angular/core';
import { cn } from '../core/utils/cn';
import { toggleVariants, type ToggleVariant, type ToggleSize } from './toggle.variants';

@Directive({
  selector: 'button[snyToggle]',
  standalone: true,
  host: {
    '[class]': 'computedClass()',
    '[attr.aria-pressed]': 'pressed()',
    '(click)': 'pressed.set(!pressed())',
  },
})
export class SnyToggleDirective {
  readonly variant = input<ToggleVariant>('default');
  readonly size = input<ToggleSize>('md');
  readonly pressed = model(false);
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn(
      toggleVariants({ variant: this.variant(), size: this.size() }),
      this.pressed() ? 'bg-accent text-accent-foreground' : '',
      this.class()
    )
  );
}
