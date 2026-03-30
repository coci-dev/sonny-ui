import { Directive, computed, input } from '@angular/core';
import { cn } from '../core/utils/cn';
import type { AbstractControl } from '@angular/forms';

export type ValidatorHintVariant = 'error' | 'success' | 'warning' | 'info';

@Directive({
  selector: '[snyValidator]',
  host: { '[class]': 'computedClass()' },
})
export class SnyValidatorDirective {
  readonly control = input<AbstractControl | null>(null);
  readonly state = input<'default' | 'error' | 'success' | 'warning'>('default');
  readonly class = input<string>('');

  readonly errors = computed(() => this.control()?.errors ?? null);
  readonly showErrors = computed(() => {
    const c = this.control();
    return c ? c.touched && c.invalid : false;
  });

  protected readonly computedClass = computed(() =>
    cn('flex flex-col gap-1 mt-1', this.class())
  );
}

@Directive({
  selector: '[snyValidatorHint]',
  host: {
    'role': 'alert',
    '[class]': 'computedClass()',
  },
})
export class SnyValidatorHintDirective {
  readonly when = input<string>('');
  readonly type = input<ValidatorHintVariant>('error');
  /** @deprecated Use `type` instead */
  readonly variant = input<ValidatorHintVariant | undefined>(undefined);
  readonly class = input<string>('');

  protected readonly computedClass = computed(() => {
    const v = this.variant() ?? this.type();
    const variantClass =
      v === 'success' ? 'text-green-600 dark:text-green-400' :
      v === 'warning' ? 'text-amber-600 dark:text-amber-400' :
      v === 'info' ? 'text-blue-600 dark:text-blue-400' :
      'text-destructive';
    return cn('text-xs', variantClass, this.class());
  });
}
