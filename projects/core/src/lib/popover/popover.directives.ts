import {
  Directive,
  ElementRef,
  InjectionToken,
  OnDestroy,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { cn } from '../core/utils/cn';

export const SNY_POPOVER = new InjectionToken<SnyPopoverDirective>('SnyPopover');

@Directive({
  selector: '[snyPopover]',
  exportAs: 'snyPopover',
  providers: [{ provide: SNY_POPOVER, useExisting: SnyPopoverDirective }],
  host: {
    '[class]': '"relative inline-block"',
    '(document:click)': 'onDocumentClick($event)',
    '(keydown.escape)': 'onEscape()',
  },
})
export class SnyPopoverDirective implements OnDestroy {
  private readonly elRef = inject(ElementRef);

  readonly matchWidth = input(false);
  readonly offset = input(4);
  readonly closeOnOutside = input(true);
  readonly closeOnEscape = input(true);

  readonly isOpen = signal(false);
  readonly triggerEl = signal<HTMLElement | null>(null);
  readonly panelEl = signal<HTMLElement | null>(null);

  private scrollHandler: (() => void) | null = null;
  private resizeHandler: (() => void) | null = null;

  toggle(): void {
    if (this.isOpen()) {
      this.close();
    } else {
      this.open();
    }
  }

  open(): void {
    this.isOpen.set(true);
    this.addListeners();
    setTimeout(() => this.updatePosition());
  }

  close(): void {
    this.isOpen.set(false);
    this.removeListeners();
  }

  updatePosition(): void {
    const trigger = this.triggerEl();
    const panel = this.panelEl();
    if (!trigger || !panel) return;
    const rect = trigger.getBoundingClientRect();
    panel.style.top = `${rect.bottom + this.offset()}px`;
    panel.style.left = `${rect.left}px`;
    if (this.matchWidth()) {
      panel.style.width = `${rect.width}px`;
    }
  }

  private addListeners(): void {
    this.removeListeners();
    this.scrollHandler = () => {
      requestAnimationFrame(() => this.updatePosition());
    };
    this.resizeHandler = () => {
      requestAnimationFrame(() => this.updatePosition());
    };
    document.addEventListener('scroll', this.scrollHandler, { capture: true, passive: true });
    window.addEventListener('resize', this.resizeHandler, { passive: true });
  }

  private removeListeners(): void {
    if (this.scrollHandler) {
      document.removeEventListener('scroll', this.scrollHandler, { capture: true } as EventListenerOptions);
      this.scrollHandler = null;
    }
    if (this.resizeHandler) {
      window.removeEventListener('resize', this.resizeHandler);
      this.resizeHandler = null;
    }
  }

  onDocumentClick(event: MouseEvent): void {
    if (this.closeOnOutside() && this.isOpen() && !this.elRef.nativeElement.contains(event.target)) {
      this.close();
    }
  }

  onEscape(): void {
    if (this.closeOnEscape() && this.isOpen()) {
      this.close();
    }
  }

  ngOnDestroy(): void {
    this.removeListeners();
  }
}

@Directive({
  selector: '[snyPopoverTrigger]',
  host: {
    '(click)': 'popover.toggle()',
    '[attr.aria-expanded]': 'popover.isOpen()',
    'aria-haspopup': 'dialog',
  },
})
export class SnyPopoverTriggerDirective {
  protected readonly popover = inject(SNY_POPOVER);
  private readonly elRef = inject(ElementRef);

  constructor() {
    this.popover.triggerEl.set(this.elRef.nativeElement);
  }
}

@Directive({
  selector: '[snyPopoverContent]',
  host: {
    'role': 'dialog',
    '[style.display]': 'popover.isOpen() ? "" : "none"',
    '[class]': 'computedClass()',
  },
})
export class SnyPopoverContentDirective {
  protected readonly popover = inject(SNY_POPOVER);
  private readonly elRef = inject(ElementRef);
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn(
      'fixed z-50 rounded-md border border-border bg-popover text-popover-foreground shadow-lg animate-in fade-in-0 zoom-in-95',
      this.class()
    )
  );

  constructor() {
    this.popover.panelEl.set(this.elRef.nativeElement);
  }
}
