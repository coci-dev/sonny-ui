import { Directive, InjectionToken, computed, inject, input, signal } from '@angular/core';
import { cn } from '../core/utils/cn';

export const SNY_FAB = new InjectionToken<SnyFabDirective>('SnyFab');
export type FabPosition = 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
export type FabDirection = 'up' | 'down' | 'left' | 'right';

const positionMap: Record<FabPosition, string> = {
  'bottom-right': 'fixed bottom-6 right-6',
  'bottom-left': 'fixed bottom-6 left-6',
  'top-right': 'fixed top-6 right-6',
  'top-left': 'fixed top-6 left-6',
};

@Directive({
  selector: '[snyFab]',
  exportAs: 'snyFab',
  providers: [{ provide: SNY_FAB, useExisting: SnyFabDirective }],
  host: { '[class]': 'computedClass()' },
})
export class SnyFabDirective {
  readonly position = input<FabPosition>('bottom-right');
  readonly direction = input<FabDirection>('up');
  readonly class = input<string>('');
  readonly isOpen = signal(false);

  toggle(): void { this.isOpen.update((v) => !v); }
  open(): void { this.isOpen.set(true); }
  close(): void { this.isOpen.set(false); }

  protected readonly computedClass = computed(() =>
    cn('z-50 flex flex-col items-center gap-2', positionMap[this.position()], this.class())
  );
}

@Directive({
  selector: '[snyFabTrigger]',
  host: {
    '(click)': 'fab.toggle()',
    '[attr.aria-expanded]': 'fab.isOpen()',
    '[attr.aria-haspopup]': '"menu"',
    'aria-label': 'Quick actions',
    '[class]': 'computedClass()',
  },
})
export class SnyFabTriggerDirective {
  readonly fab = inject(SNY_FAB);
  readonly class = input<string>('');
  protected readonly computedClass = computed(() =>
    cn(
      'inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg h-14 w-14 hover:bg-primary/90 transition-transform',
      this.fab.isOpen() && 'rotate-45',
      this.class()
    )
  );
}

@Directive({
  selector: '[snyFabAction]',
  host: {
    'role': 'menuitem',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[class]': 'computedClass()',
  },
})
export class SnyFabActionDirective {
  readonly fab = inject(SNY_FAB);
  readonly ariaLabel = input<string>('');
  readonly class = input<string>('');
  protected readonly computedClass = computed(() =>
    cn(
      'inline-flex items-center justify-center rounded-full bg-secondary text-secondary-foreground shadow-md h-10 w-10 transition-all',
      this.fab.isOpen() ? 'scale-100 opacity-100' : 'scale-0 opacity-0',
      this.class()
    )
  );
}
