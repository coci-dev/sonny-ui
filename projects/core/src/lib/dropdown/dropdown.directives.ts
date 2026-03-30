import { Directive, ElementRef, InjectionToken, computed, inject, input, signal } from '@angular/core';
import { cn } from '../core/utils/cn';
import {
  dropdownContentVariants,
  dropdownItemVariants,
  type DropdownItemVariant,
} from './dropdown.variants';

export const SNY_DROPDOWN = new InjectionToken<SnyDropdownDirective>('SnyDropdown');

@Directive({
  selector: '[snyDropdown]',
  exportAs: 'snyDropdown',
  providers: [{ provide: SNY_DROPDOWN, useExisting: SnyDropdownDirective }],
  host: {
    '[class]': '"relative inline-block"',
    '(document:click)': 'onDocumentClick($event)',
    '(keydown.escape)': 'onEscape()',
  },
})
export class SnyDropdownDirective {
  private readonly elementRef = inject(ElementRef);
  readonly isOpen = signal(false);

  toggle(): void { this.isOpen.update((v) => !v); }
  open(): void { this.isOpen.set(true); }
  close(): void { this.isOpen.set(false); }

  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.close();
    }
  }

  onEscape(): void {
    this.close();
  }
}

@Directive({
  selector: '[snyDropdownTrigger]',
  host: {
    '(click)': 'dropdown.toggle()',
    '[attr.aria-expanded]': 'dropdown.isOpen()',
    '[attr.aria-haspopup]': '"menu"',
  },
})
export class SnyDropdownTriggerDirective {
  readonly dropdown = inject(SNY_DROPDOWN);
}

@Directive({
  selector: '[snyDropdownContent]',
  host: {
    'role': 'menu',
    '[class]': 'computedClass()',
    '[style.display]': 'dropdown.isOpen() ? "" : "none"',
  },
})
export class SnyDropdownContentDirective {
  readonly dropdown = inject(SNY_DROPDOWN);
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn(
      dropdownContentVariants(),
      'absolute mt-1 left-0 animate-in fade-in-0 zoom-in-95',
      this.class()
    )
  );
}

@Directive({
  selector: '[snyMenuContent]',
  host: {
    '[class]': 'computedClass()',
  },
})
export class SnyMenuContentDirective {
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn(dropdownContentVariants(), this.class())
  );
}

@Directive({
  selector: '[snyMenuItem]',
  host: {
    'role': 'menuitem',
    '[class]': 'computedClass()',
    '(click)': 'onClick()',
  },
})
export class SnyMenuItemDirective {
  private readonly dropdown = inject(SNY_DROPDOWN, { optional: true });
  readonly variant = input<DropdownItemVariant>('default');
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn(dropdownItemVariants({ variant: this.variant() }), 'cursor-pointer hover:bg-accent hover:text-accent-foreground', this.class())
  );

  onClick(): void {
    this.dropdown?.close();
  }
}

@Directive({
  selector: '[snyMenuSeparator]',
  host: {
    'role': 'separator',
    '[class]': 'computedClass()',
  },
})
export class SnyMenuSeparatorDirective {
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('-mx-1 my-1 h-px bg-muted', this.class())
  );
}

@Directive({
  selector: '[snyMenuLabel]',
  host: {
    '[class]': 'computedClass()',
  },
})
export class SnyMenuLabelDirective {
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('px-2 py-1.5 text-sm font-semibold', this.class())
  );
}
