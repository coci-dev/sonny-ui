import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  ElementRef,
  InjectionToken,
  PLATFORM_ID,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { cn } from '../core/utils/cn';
import { sidebarVariants, sidebarItemVariants, type SidebarSide } from './sidebar.variants';

export const SNY_SIDEBAR = new InjectionToken<SnySidebarLayoutComponent>('SnySidebar');
export const SNY_SIDEBAR_ITEM = new InjectionToken<SnySidebarItemDirective>('SnySidebarItem');

// ─── Layout ──────────────────────────────────────────────────────────────────

@Component({
  selector: '[snySidebarLayout]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'snySidebarLayout',
  providers: [{ provide: SNY_SIDEBAR, useExisting: SnySidebarLayoutComponent }],
  host: {
    '[class]': 'computedClass()',
  },
  template: `
    <ng-content />
    @if (isMobileOpen() && isMobile()) {
      <div
        class="fixed inset-0 z-30 bg-black/50 transition-opacity"
        (click)="closeMobile()"
      ></div>
    }
  `,
})
export class SnySidebarLayoutComponent {
  readonly class = input<string>('');

  private readonly _collapsed = signal(false);
  private readonly _mobileOpen = signal(false);
  private readonly _isMobile = signal(false);

  readonly isCollapsed = this._collapsed.asReadonly();
  readonly isMobileOpen = this._mobileOpen.asReadonly();
  readonly isMobile = this._isMobile.asReadonly();

  protected readonly computedClass = computed(() =>
    cn('relative flex h-full w-full overflow-hidden', this.class())
  );

  constructor() {
    const platformId = inject(PLATFORM_ID);
    if (isPlatformBrowser(platformId) && typeof window.matchMedia === 'function') {
      const mql = window.matchMedia('(max-width: 768px)');
      this._isMobile.set(mql.matches);
      mql.addEventListener('change', (e) => this._isMobile.set(e.matches));
    }
  }

  toggleCollapse(): void { this._collapsed.update((v) => !v); }
  collapse(): void { this._collapsed.set(true); }
  expand(): void { this._collapsed.set(false); }

  toggleMobile(): void { this._mobileOpen.update((v) => !v); }
  openMobile(): void { this._mobileOpen.set(true); }
  closeMobile(): void { this._mobileOpen.set(false); }
}

// ─── Sidebar (nav panel) ─────────────────────────────────────────────────────

@Directive({
  selector: '[snySidebar]',
  host: {
    'role': 'navigation',
    '[attr.aria-label]': 'ariaLabel()',
    '[class]': 'computedClass()',
    '(keydown)': 'onKeydown($event)',
  },
})
export class SnySidebarDirective {
  private readonly layout = inject(SNY_SIDEBAR);
  private readonly elRef = inject(ElementRef);

  readonly collapsible = input(false);
  readonly side = input<SidebarSide>('left');
  readonly collapsedWidth = input('w-16');
  readonly expandedWidth = input('w-64');
  readonly ariaLabel = input('Sidebar navigation');
  readonly class = input<string>('');

  protected readonly computedClass = computed(() => {
    const layout = this.layout;
    const isMobile = layout.isMobile();
    const s = this.side();

    if (isMobile) {
      const isOpen = layout.isMobileOpen();
      const base = 'fixed inset-y-0 z-50 bg-background transition-transform duration-300 ease-in-out overflow-y-auto';
      const sideClass = s === 'left' ? 'left-0' : 'right-0';
      const borderClass = s === 'left' ? 'border-r border-border' : 'border-l border-border';
      const transformClass = isOpen
        ? 'translate-x-0'
        : s === 'left' ? '-translate-x-full' : 'translate-x-full';
      return cn(base, this.expandedWidth(), sideClass, borderClass, transformClass, this.class());
    }

    const isCollapsed = this.collapsible() && layout.isCollapsed();
    const widthClass = isCollapsed ? this.collapsedWidth() : this.expandedWidth();
    return cn(
      sidebarVariants({ side: s }),
      'relative',
      widthClass,
      this.class()
    );
  });

  onKeydown(event: KeyboardEvent): void {
    const target = event.target as HTMLElement;
    if (!target.hasAttribute('snysidebaritem') && !target.closest('[snySidebarItem]') &&
        !target.hasAttribute('snysidebarsubitem') && !target.closest('[snySidebarSubItem]')) {
      return;
    }

    const items = Array.from(
      (this.elRef.nativeElement as HTMLElement).querySelectorAll<HTMLElement>(
        '[snySidebarItem]:not([aria-disabled="true"]), [snySidebarSubItem]'
      )
    ).filter((el) => {
      // Skip sub-items inside collapsed sub-menus
      const subMenu = el.closest('[snySidebarSubMenu]');
      if (subMenu && subMenu.classList.contains('grid-rows-[0fr]')) return false;
      return el.tabIndex >= 0;
    });

    if (items.length === 0) return;
    const currentIndex = items.indexOf(target.closest('[snySidebarItem], [snySidebarSubItem]') as HTMLElement || target);
    if (currentIndex === -1) return;

    let nextIndex: number | null = null;
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        nextIndex = (currentIndex + 1) % items.length;
        break;
      case 'ArrowUp':
        event.preventDefault();
        nextIndex = (currentIndex - 1 + items.length) % items.length;
        break;
      case 'Home':
        event.preventDefault();
        nextIndex = 0;
        break;
      case 'End':
        event.preventDefault();
        nextIndex = items.length - 1;
        break;
    }
    if (nextIndex !== null) {
      items[nextIndex].focus();
    }
  }
}

// ─── Header ──────────────────────────────────────────────────────────────────

@Directive({
  selector: '[snySidebarHeader]',
  host: { '[class]': 'computedClass()' },
})
export class SnySidebarHeaderDirective {
  readonly class = input<string>('');
  protected readonly computedClass = computed(() =>
    cn('flex items-center gap-2 px-3 py-4 border-b border-border overflow-hidden whitespace-nowrap', this.class())
  );
}

// ─── Body ────────────────────────────────────────────────────────────────────

@Directive({
  selector: '[snySidebarBody]',
  host: { '[class]': 'computedClass()' },
})
export class SnySidebarBodyDirective {
  readonly class = input<string>('');
  protected readonly computedClass = computed(() =>
    cn('flex-1 overflow-y-auto overflow-x-hidden py-2', this.class())
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────

@Directive({
  selector: '[snySidebarFooter]',
  host: { '[class]': 'computedClass()' },
})
export class SnySidebarFooterDirective {
  readonly class = input<string>('');
  protected readonly computedClass = computed(() =>
    cn('mt-auto border-t border-border px-3 py-4 overflow-hidden whitespace-nowrap', this.class())
  );
}

// ─── Group ───────────────────────────────────────────────────────────────────

@Component({
  selector: 'sny-sidebar-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'computedClass()' },
  template: `
    @if (label() && !layout.isCollapsed()) {
      <div class="px-3 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        {{ label() }}
      </div>
    }
    <div role="group" [attr.aria-label]="label()">
      <ng-content />
    </div>
  `,
})
export class SnySidebarGroupComponent {
  protected readonly layout = inject(SNY_SIDEBAR);
  readonly label = input('');
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('block px-2 py-2', this.class())
  );
}

// ─── Item ────────────────────────────────────────────────────────────────────

@Directive({
  selector: '[snySidebarItem]',
  exportAs: 'snySidebarItem',
  providers: [{ provide: SNY_SIDEBAR_ITEM, useExisting: SnySidebarItemDirective }],
  host: {
    '[class]': 'computedClass()',
    '[attr.aria-current]': 'active() ? "page" : null',
    '[attr.aria-expanded]': 'expandable() ? expanded() : null',
    '[attr.aria-disabled]': 'disabled() || null',
    'tabindex': '0',
    '(click)': 'onClick()',
    '(keydown.enter)': 'onClick()',
    '(keydown.space)': 'onSpace($event)',
  },
})
export class SnySidebarItemDirective {
  private readonly layout = inject(SNY_SIDEBAR);

  readonly active = input(false);
  readonly disabled = input(false);
  readonly expandable = input(false);
  readonly class = input<string>('');

  readonly expanded = signal(false);

  protected readonly computedClass = computed(() => {
    const isCollapsed = this.layout.isCollapsed();
    return cn(
      sidebarItemVariants({
        active: this.active(),
        collapsed: isCollapsed,
      }),
      this.disabled() && 'opacity-50 pointer-events-none',
      this.class()
    );
  });

  onClick(): void {
    if (this.disabled()) return;
    if (this.expandable()) {
      this.expanded.update((v) => !v);
    }
  }

  onSpace(event: Event): void {
    event.preventDefault();
    this.onClick();
  }

  toggleExpand(): void {
    this.expanded.update((v) => !v);
  }
}

// ─── SubMenu (expand/collapse container) ─────────────────────────────────────

@Directive({
  selector: '[snySidebarSubMenu]',
  host: { '[class]': 'computedClass()' },
})
export class SnySidebarSubMenuDirective {
  private readonly item = inject(SNY_SIDEBAR_ITEM);
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn(
      'grid transition-all duration-200',
      this.item.expanded()
        ? 'grid-rows-[1fr] opacity-100'
        : 'grid-rows-[0fr] opacity-0 overflow-hidden',
      this.class()
    )
  );
}

// ─── SubItem ─────────────────────────────────────────────────────────────────

@Directive({
  selector: '[snySidebarSubItem]',
  host: {
    '[class]': 'computedClass()',
    '[attr.aria-current]': 'active() ? "page" : null',
    'tabindex': '0',
  },
})
export class SnySidebarSubItemDirective {
  readonly active = input(false);
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn(
      'flex items-center gap-3 pl-9 pr-3 py-1.5 rounded-md text-sm transition-colors hover:bg-accent/50 hover:text-accent-foreground cursor-pointer min-h-0 overflow-hidden',
      this.active() && 'bg-accent text-accent-foreground font-medium',
      this.class()
    )
  );
}

// ─── Content (main area) ─────────────────────────────────────────────────────

@Directive({
  selector: '[snySidebarContent]',
  host: { '[class]': 'computedClass()' },
})
export class SnySidebarContentDirective {
  readonly class = input<string>('');
  protected readonly computedClass = computed(() =>
    cn('flex-1 overflow-auto', this.class())
  );
}
