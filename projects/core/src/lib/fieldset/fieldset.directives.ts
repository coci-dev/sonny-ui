import { Directive, computed, input } from '@angular/core';
import { cn } from '../core/utils/cn';
import { fieldsetVariants, type FieldsetVariant } from './fieldset.variants';

@Directive({
  selector: 'fieldset[snyFieldset]',
  standalone: true,
  host: {
    '[class]': 'computedClass()',
    '[attr.disabled]': 'disabled() || null',
    '[attr.aria-disabled]': 'disabled() || null',
  },
})
export class SnyFieldsetDirective {
  readonly variant = input<FieldsetVariant>('default');
  readonly disabled = input(false);
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn(fieldsetVariants({ variant: this.variant() }), this.class())
  );
}

@Directive({
  selector: 'legend[snyFieldsetLegend]',
  standalone: true,
  host: {
    '[class]': 'computedClass()',
  },
})
export class SnyFieldsetLegendDirective {
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('text-sm font-medium leading-none', this.class())
  );
}

@Directive({
  selector: '[snyFieldsetContent]',
  standalone: true,
  host: {
    '[class]': 'computedClass()',
  },
})
export class SnyFieldsetContentDirective {
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('space-y-2', this.class())
  );
}
