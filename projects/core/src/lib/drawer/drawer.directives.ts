import { ChangeDetectionStrategy, Component, Directive, InjectionToken, computed, inject, input, signal } from '@angular/core';
import { cn } from '../core/utils/cn';

export const SNY_DRAWER = new InjectionToken<SnyDrawerLayoutComponent>('SnyDrawer');

@Component({
  selector: '[snyDrawerLayout]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'snyDrawerLayout',
  providers: [{ provide: SNY_DRAWER, useExisting: SnyDrawerLayoutComponent }],
  host: {
    '[class]': 'computedClass()',
  },
  template: `
    <ng-content />
    @if (isOpen() && overlay()) {
      <div
        class="fixed inset-0 z-30 bg-black/50 transition-opacity"
        (click)="close()"
      ></div>
    }
  `,
})
export class SnyDrawerLayoutComponent {
  readonly class = input<string>('');
  readonly overlay = input(true);
  readonly isOpen = signal(false);

  protected readonly computedClass = computed(() =>
    cn('relative flex h-full w-full overflow-hidden', this.class())
  );

  toggle(): void { this.isOpen.update((v) => !v); }
  open(): void { this.isOpen.set(true); }
  close(): void { this.isOpen.set(false); }
}

/** @deprecated Use SnyDrawerLayoutComponent instead */
export const SnyDrawerLayoutDirective = SnyDrawerLayoutComponent;

@Directive({
  selector: '[snyDrawerContent]',
  host: {
    '[class]': 'computedClass()',
  },
})
export class SnyDrawerContentDirective {
  readonly class = input<string>('');
  protected readonly computedClass = computed(() =>
    cn('flex-1 overflow-auto', this.class())
  );
}

export type DrawerSide = 'left' | 'right';

@Directive({
  selector: '[snyDrawerSide]',
  host: {
    'role': 'navigation',
    'aria-label': 'Sidebar navigation',
    '[attr.aria-modal]': 'drawer.overlay() && drawer.isOpen() || null',
    '[class]': 'computedClass()',
  },
})
export class SnyDrawerSideDirective {
  protected readonly drawer = inject(SNY_DRAWER);
  readonly side = input<DrawerSide>('left');
  readonly class = input<string>('');

  protected readonly computedClass = computed(() => {
    const isOpen = this.drawer.isOpen();
    const s = this.side();
    const base = 'fixed inset-y-0 z-40 w-64 bg-background border-r border-border transition-transform duration-300 ease-in-out';
    const sideClass = s === 'left' ? 'left-0' : 'right-0 border-l border-r-0';
    const transformClass = isOpen
      ? 'translate-x-0'
      : s === 'left' ? '-translate-x-full' : 'translate-x-full';
    return cn(base, sideClass, transformClass, this.class());
  });
}
