import { Directive, computed, input } from '@angular/core';
import { cn } from '../core/utils/cn';

@Directive({
  selector: 'nav[snyBreadcrumb]',
  standalone: true,
  host: {
    '[class]': 'computedClass()',
    'aria-label': 'Breadcrumb',
  },
})
export class SnyBreadcrumbDirective {
  readonly class = input<string>('');
  protected readonly computedClass = computed(() => cn('', this.class()));
}

@Directive({
  selector: 'ol[snyBreadcrumbList]',
  standalone: true,
  host: { '[class]': 'computedClass()' },
})
export class SnyBreadcrumbListDirective {
  readonly class = input<string>('');
  protected readonly computedClass = computed(() =>
    cn('flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5', this.class())
  );
}

@Directive({
  selector: 'li[snyBreadcrumbItem]',
  standalone: true,
  host: { '[class]': 'computedClass()' },
})
export class SnyBreadcrumbItemDirective {
  readonly class = input<string>('');
  protected readonly computedClass = computed(() =>
    cn('inline-flex items-center gap-1.5', this.class())
  );
}

@Directive({
  selector: '[snyBreadcrumbLink]',
  standalone: true,
  host: { '[class]': 'computedClass()' },
})
export class SnyBreadcrumbLinkDirective {
  readonly class = input<string>('');
  protected readonly computedClass = computed(() =>
    cn('transition-colors hover:text-foreground', this.class())
  );
}

@Directive({
  selector: '[snyBreadcrumbSeparator]',
  standalone: true,
  host: {
    role: 'presentation',
    '[aria-hidden]': 'true',
    '[class]': 'computedClass()',
  },
})
export class SnyBreadcrumbSeparatorDirective {
  readonly class = input<string>('');
  protected readonly computedClass = computed(() =>
    cn('[&>svg]:size-3.5', this.class())
  );
}

@Directive({
  selector: '[snyBreadcrumbPage]',
  standalone: true,
  host: {
    role: 'link',
    'aria-disabled': 'true',
    '[attr.aria-current]': '"page"',
    '[class]': 'computedClass()',
  },
})
export class SnyBreadcrumbPageDirective {
  readonly class = input<string>('');
  protected readonly computedClass = computed(() =>
    cn('font-normal text-foreground', this.class())
  );
}
