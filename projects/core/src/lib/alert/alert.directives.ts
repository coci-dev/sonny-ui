import { Directive, computed, input, signal } from '@angular/core';
import { cn } from '../core/utils/cn';
import { alertVariants, type AlertVariant } from './alert.variants';

@Directive({
  selector: '[snyAlert]',
  exportAs: 'snyAlert',
  host: {
    '[class]': 'computedClass()',
    '[attr.role]': 'role()',
    '[attr.aria-live]': 'ariaLive()',
    '[style.display]': 'visible() ? null : "none"',
  },
})
export class SnyAlertDirective {
  readonly variant = input<AlertVariant>('default');
  readonly dismissible = input(false);
  readonly class = input<string>('');

  readonly visible = signal(true);

  protected readonly role = computed(() => {
    const v = this.variant();
    return v === 'destructive' || v === 'warning' || v === 'info' ? 'alert' : 'status';
  });

  protected readonly ariaLive = computed(() => {
    const v = this.variant();
    return v === 'destructive' || v === 'warning' ? 'assertive' : 'polite';
  });

  protected readonly computedClass = computed(() =>
    cn(alertVariants({ variant: this.variant() }), this.class())
  );

  dismiss(): void {
    this.visible.set(false);
  }
}

@Directive({
  selector: '[snyAlertTitle]',
  host: {
    '[class]': 'computedClass()',
  },
})
export class SnyAlertTitleDirective {
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('mb-1 font-medium leading-none tracking-tight', this.class())
  );
}

@Directive({
  selector: '[snyAlertDescription]',
  host: {
    '[class]': 'computedClass()',
  },
})
export class SnyAlertDescriptionDirective {
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('text-sm [&_p]:leading-relaxed', this.class())
  );
}
