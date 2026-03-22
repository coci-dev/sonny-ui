import { Directive, ElementRef, HostListener, InjectionToken, computed, inject, input, signal } from '@angular/core';
import { cn } from '../core/utils/cn';
import {
  dropdownContentVariants,
  dropdownItemVariants,
  type DropdownItemVariant,
} from './dropdown.variants';

export const SNY_DROPDOWN = new InjectionToken<SnyDropdownDirective>('SnyDropdown');

@Directive({
  selector: '[snyDropdown]',
  standalone: true,
  exportAs: 'snyDropdown',
  providers: [{ provide: SNY_DROPDOWN, useExisting: SnyDropdownDirective }],
  host: {
    '[class]': '"relative inline-block"',
  },
})
export class SnyDropdownDirective {
  private readonly elementRef = inject(ElementRef);
  readonly isOpen = signal(false);

  toggle(): void { this.isOpen.update((v) => !v); }
  open(): void { this.isOpen.set(true); }
  close(): void { this.isOpen.set(false); }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.close();
    }
  }

  @HostListener('keydown.escape')
  onEscape(): void {
    this.close();
  }
}

@Directive({
  selector: '[snyDropdownTrigger]',
  standalone: true,
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
  standalone: true,
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
  standalone: true,
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
  standalone: true,
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
  standalone: true,
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
  standalone: true,
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
