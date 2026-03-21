import { Directive, computed, inject, input, model, InjectionToken } from '@angular/core';
import { cn } from '../core/utils/cn';

export const SNY_TABS = new InjectionToken<SnyTabsDirective>('SnyTabs');

@Directive({
  selector: '[snyTabs]',
  standalone: true,
  providers: [{ provide: SNY_TABS, useExisting: SnyTabsDirective }],
  host: { '[class]': 'computedClass()' },
})
export class SnyTabsDirective {
  readonly value = model<string>('');
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('', this.class())
  );

  select(value: string): void {
    this.value.set(value);
  }
}

@Directive({
  selector: '[snyTabsList]',
  standalone: true,
  host: {
    role: 'tablist',
    '[class]': 'computedClass()',
  },
})
export class SnyTabsListDirective {
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn(
      'inline-flex h-10 items-center justify-center rounded-sm bg-muted p-1 text-muted-foreground',
      this.class()
    )
  );
}

@Directive({
  selector: '[snyTabsTrigger]',
  standalone: true,
  host: {
    role: 'tab',
    '[class]': 'computedClass()',
    '[attr.aria-selected]': 'isActive()',
    '(click)': 'tabs.select(value())',
  },
})
export class SnyTabsTriggerDirective {
  readonly value = input.required<string>();
  readonly class = input<string>('');
  readonly tabs = inject(SNY_TABS);

  readonly isActive = computed(() => this.tabs.value() === this.value());

  protected readonly computedClass = computed(() =>
    cn(
      'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
      this.isActive()
        ? 'bg-background text-foreground shadow-sm'
        : 'hover:bg-background/50',
      this.class()
    )
  );
}

@Directive({
  selector: '[snyTabsContent]',
  standalone: true,
  host: {
    role: 'tabpanel',
    '[class]': 'computedClass()',
    '[style.display]': 'isActive() ? null : "none"',
  },
})
export class SnyTabsContentDirective {
  readonly value = input.required<string>();
  readonly class = input<string>('');
  private readonly tabs = inject(SNY_TABS);

  readonly isActive = computed(() => this.tabs.value() === this.value());

  protected readonly computedClass = computed(() =>
    cn('mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2', this.class())
  );
}
