import { Directive, computed, input } from '@angular/core';
import { cn } from '../core/utils/cn';

export type NavbarVariant = 'default' | 'bordered' | 'floating';

@Directive({
  selector: '[snyNavbar]',
  host: {
    'role': 'navigation',
    '[attr.aria-label]': 'ariaLabel()',
    '[class]': 'computedClass()',
  },
})
export class SnyNavbarDirective {
  readonly variant = input<NavbarVariant>('default');
  readonly sticky = input(false);
  readonly ariaLabel = input<string>('Main navigation');
  readonly class = input<string>('');

  protected readonly computedClass = computed(() => {
    const v = this.variant();
    const base = 'flex items-center justify-between px-4 py-2 w-full bg-background';
    const variantClass =
      v === 'bordered' ? 'border-b border-border' :
      v === 'floating' ? 'mx-4 mt-2 rounded-lg border border-border shadow-sm' :
      '';
    const stickyClass = this.sticky() ? 'sticky top-0 z-40' : '';
    return cn(base, variantClass, stickyClass, this.class());
  });
}

@Directive({
  selector: '[snyNavbarBrand]',
  host: { '[class]': 'computedClass()' },
})
export class SnyNavbarBrandDirective {
  readonly class = input<string>('');
  protected readonly computedClass = computed(() => cn('flex items-center gap-2 font-bold text-lg', this.class()));
}

@Directive({
  selector: '[snyNavbarContent]',
  host: { '[class]': 'computedClass()' },
})
export class SnyNavbarContentDirective {
  readonly class = input<string>('');
  protected readonly computedClass = computed(() => cn('flex items-center gap-1', this.class()));
}

@Directive({
  selector: '[snyNavbarEnd]',
  host: { '[class]': 'computedClass()' },
})
export class SnyNavbarEndDirective {
  readonly class = input<string>('');
  protected readonly computedClass = computed(() => cn('flex items-center gap-2 ml-auto', this.class()));
}
