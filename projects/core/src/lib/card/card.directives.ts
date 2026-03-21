import { Directive, computed, input } from '@angular/core';
import { cn } from '../core/utils/cn';
import { cardVariants, type CardVariant, type CardPadding } from './card.variants';

@Directive({
  selector: '[snyCard]',
  standalone: true,
  host: { '[class]': 'computedClass()' },
})
export class SnyCardDirective {
  readonly variant = input<CardVariant>('default');
  readonly padding = input<CardPadding>('none');
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn(cardVariants({ variant: this.variant(), padding: this.padding() }), this.class())
  );
}

@Directive({
  selector: '[snyCardHeader]',
  standalone: true,
  host: { '[class]': 'computedClass()' },
})
export class SnyCardHeaderDirective {
  readonly class = input<string>('');
  protected readonly computedClass = computed(() =>
    cn('flex flex-col space-y-1.5 p-6', this.class())
  );
}

@Directive({
  selector: '[snyCardTitle]',
  standalone: true,
  host: { '[class]': 'computedClass()' },
})
export class SnyCardTitleDirective {
  readonly class = input<string>('');
  protected readonly computedClass = computed(() =>
    cn('text-2xl font-semibold leading-none tracking-tight', this.class())
  );
}

@Directive({
  selector: '[snyCardDescription]',
  standalone: true,
  host: { '[class]': 'computedClass()' },
})
export class SnyCardDescriptionDirective {
  readonly class = input<string>('');
  protected readonly computedClass = computed(() =>
    cn('text-sm text-muted-foreground', this.class())
  );
}

@Directive({
  selector: '[snyCardContent]',
  standalone: true,
  host: { '[class]': 'computedClass()' },
})
export class SnyCardContentDirective {
  readonly class = input<string>('');
  protected readonly computedClass = computed(() =>
    cn('p-6 pt-0', this.class())
  );
}

@Directive({
  selector: '[snyCardFooter]',
  standalone: true,
  host: { '[class]': 'computedClass()' },
})
export class SnyCardFooterDirective {
  readonly class = input<string>('');
  protected readonly computedClass = computed(() =>
    cn('flex items-center p-6 pt-0', this.class())
  );
}
