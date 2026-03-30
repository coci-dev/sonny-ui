import { Directive, ElementRef, computed, inject, input, signal, InjectionToken } from '@angular/core';
import { cn } from '../core/utils/cn';

export const SNY_ACCORDION = new InjectionToken<SnyAccordionDirective>('SnyAccordion');
export const SNY_ACCORDION_ITEM = new InjectionToken<SnyAccordionItemDirective>('SnyAccordionItem');

@Directive({
  selector: '[snyAccordion]',
  exportAs: 'snyAccordion',
  providers: [{ provide: SNY_ACCORDION, useExisting: SnyAccordionDirective }],
  host: {
    '[class]': 'computedClass()',
    '(keydown)': 'onKeydown($event)',
  },
})
export class SnyAccordionDirective {
  readonly multi = input(false);
  readonly class = input<string>('');

  private readonly elRef = inject(ElementRef);
  private readonly _openItems = signal(new Set<string>());

  protected readonly computedClass = computed(() =>
    cn('divide-y divide-border', this.class())
  );

  isOpen(id: string): boolean {
    return this._openItems().has(id);
  }

  toggle(id: string): void {
    this._openItems.update(set => {
      const next = new Set(set);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (!this.multi()) next.clear();
        next.add(id);
      }
      return next;
    });
  }

  onKeydown(event: KeyboardEvent): void {
    const target = event.target as HTMLElement;
    if (!target.hasAttribute('snyaccordiontrigger') && !target.closest('[snyAccordionTrigger]')) return;

    const triggers = Array.from(
      (this.elRef.nativeElement as HTMLElement).querySelectorAll<HTMLElement>('[snyAccordionTrigger]')
    );
    if (triggers.length === 0) return;

    const currentIndex = triggers.indexOf(target.closest('[snyAccordionTrigger]') as HTMLElement || target);
    if (currentIndex === -1) return;

    let nextIndex: number | null = null;
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        nextIndex = (currentIndex + 1) % triggers.length;
        break;
      case 'ArrowUp':
        event.preventDefault();
        nextIndex = (currentIndex - 1 + triggers.length) % triggers.length;
        break;
      case 'Home':
        event.preventDefault();
        nextIndex = 0;
        break;
      case 'End':
        event.preventDefault();
        nextIndex = triggers.length - 1;
        break;
    }
    if (nextIndex !== null) {
      triggers[nextIndex].focus();
    }
  }
}

@Directive({
  selector: '[snyAccordionItem]',
  exportAs: 'snyAccordionItem',
  providers: [{ provide: SNY_ACCORDION_ITEM, useExisting: SnyAccordionItemDirective }],
  host: { '[class]': 'computedClass()' },
})
export class SnyAccordionItemDirective {
  readonly value = input.required<string>();
  readonly class = input<string>('');
  private readonly accordion = inject(SNY_ACCORDION);

  readonly isOpen = computed(() => this.accordion.isOpen(this.value()));

  protected readonly computedClass = computed(() =>
    cn('', this.class())
  );

  toggle(): void {
    this.accordion.toggle(this.value());
  }
}

@Directive({
  selector: '[snyAccordionTrigger]',
  host: {
    '[class]': 'computedClass()',
    '[attr.aria-expanded]': 'item.isOpen()',
    'tabindex': '0',
    '(click)': 'item.toggle()',
  },
})
export class SnyAccordionTriggerDirective {
  readonly class = input<string>('');
  readonly item = inject(SNY_ACCORDION_ITEM);

  protected readonly computedClass = computed(() =>
    cn(
      'flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline cursor-pointer [&>svg]:transition-transform',
      this.item.isOpen() && '[&>svg]:rotate-180',
      this.class()
    )
  );
}

@Directive({
  selector: '[snyAccordionContent]',
  host: {
    '[class]': 'computedClass()',
    role: 'region',
  },
})
export class SnyAccordionContentDirective {
  readonly class = input<string>('');
  readonly item = inject(SNY_ACCORDION_ITEM);

  protected readonly computedClass = computed(() =>
    cn(
      'grid transition-all duration-200',
      this.item.isOpen() ? 'grid-rows-[1fr] opacity-100 pb-4' : 'grid-rows-[0fr] opacity-0 overflow-hidden',
      this.class()
    )
  );
}
