import { Directive, computed, inject, input, signal, InjectionToken } from '@angular/core';
import { cn } from '../core/utils/cn';

export const SNY_ACCORDION = new InjectionToken<SnyAccordionDirective>('SnyAccordion');
export const SNY_ACCORDION_ITEM = new InjectionToken<SnyAccordionItemDirective>('SnyAccordionItem');

@Directive({
  selector: '[snyAccordion]',
  standalone: true,
  providers: [{ provide: SNY_ACCORDION, useExisting: SnyAccordionDirective }],
  host: { '[class]': 'computedClass()' },
})
export class SnyAccordionDirective {
  readonly multi = input(false);
  readonly class = input<string>('');

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
}

@Directive({
  selector: '[snyAccordionItem]',
  standalone: true,
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
  standalone: true,
  host: {
    '[class]': 'computedClass()',
    '[attr.aria-expanded]': 'item.isOpen()',
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
  standalone: true,
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
