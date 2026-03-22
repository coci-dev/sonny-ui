import { Directive, ElementRef, computed, inject, input } from '@angular/core';
import { cn } from '../core/utils/cn';

export type DockPosition = 'bottom' | 'top';

@Directive({
  selector: '[snyDock]',
  standalone: true,
  host: {
    'role': 'toolbar',
    'aria-label': 'Dock',
    '[class]': 'computedClass()',
    '(keydown)': 'onKeydown($event)',
  },
})
export class SnyDockDirective {
  readonly position = input<DockPosition>('bottom');
  readonly class = input<string>('');

  private readonly elRef = inject(ElementRef);

  protected readonly computedClass = computed(() =>
    cn(
      'fixed left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 rounded-full border bg-background/80 backdrop-blur-sm px-3 py-2 shadow-lg',
      this.position() === 'bottom' ? 'bottom-4' : 'top-4',
      this.class()
    )
  );

  onKeydown(event: KeyboardEvent): void {
    const items = Array.from(
      (this.elRef.nativeElement as HTMLElement).querySelectorAll<HTMLElement>('[snyDockItem]')
    );
    if (items.length === 0) return;

    const currentIndex = items.indexOf(document.activeElement as HTMLElement);
    if (currentIndex === -1) return;

    let nextIndex: number | null = null;
    switch (event.key) {
      case 'ArrowRight':
        event.preventDefault();
        nextIndex = (currentIndex + 1) % items.length;
        break;
      case 'ArrowLeft':
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

@Directive({
  selector: '[snyDockItem]',
  standalone: true,
  host: {
    '[class]': 'computedClass()',
    '[attr.tabindex]': 'active() ? 0 : -1',
  },
})
export class SnyDockItemDirective {
  readonly active = input(false);
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn(
      'inline-flex items-center justify-center rounded-full p-2 transition-all hover:scale-110',
      this.active() && 'bg-primary text-primary-foreground',
      this.class()
    )
  );
}
