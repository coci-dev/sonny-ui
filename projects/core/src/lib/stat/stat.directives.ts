import { Directive, InjectionToken, computed, inject, input } from '@angular/core';
import { cn } from '../core/utils/cn';

export const SNY_STAT = new InjectionToken<SnyStatDirective>('SnyStat');

let statIdCounter = 0;

@Directive({
  selector: '[snyStat]',
  standalone: true,
  providers: [{ provide: SNY_STAT, useExisting: SnyStatDirective }],
  host: { '[class]': 'computedClass()' },
})
export class SnyStatDirective {
  readonly class = input<string>('');
  readonly titleId = `sny-stat-title-${++statIdCounter}`;
  protected readonly computedClass = computed(() =>
    cn('flex flex-col gap-0.5', this.class())
  );
}

@Directive({
  selector: '[snyStatTitle]',
  standalone: true,
  host: {
    '[class]': 'computedClass()',
    '[id]': 'stat.titleId',
  },
})
export class SnyStatTitleDirective {
  readonly class = input<string>('');
  readonly stat = inject(SNY_STAT);
  protected readonly computedClass = computed(() =>
    cn('text-sm text-muted-foreground', this.class())
  );
}

@Directive({
  selector: '[snyStatValue]',
  standalone: true,
  host: {
    '[class]': 'computedClass()',
    '[attr.aria-labelledby]': 'stat.titleId',
  },
})
export class SnyStatValueDirective {
  readonly class = input<string>('');
  readonly stat = inject(SNY_STAT);
  protected readonly computedClass = computed(() =>
    cn('text-2xl font-bold', this.class())
  );
}

export type StatDescriptionVariant = 'default' | 'success' | 'error';

@Directive({
  selector: '[snyStatDescription]',
  standalone: true,
  host: { '[class]': 'computedClass()' },
})
export class SnyStatDescriptionDirective {
  readonly variant = input<StatDescriptionVariant>('default');
  readonly class = input<string>('');
  protected readonly computedClass = computed(() => {
    const v = this.variant();
    const variantClass =
      v === 'success' ? 'text-green-600 dark:text-green-400' :
      v === 'error' ? 'text-destructive' :
      'text-muted-foreground';
    return cn('text-xs', variantClass, this.class());
  });
}

@Directive({
  selector: '[snyStatFigure]',
  standalone: true,
  host: { '[class]': 'computedClass()' },
})
export class SnyStatFigureDirective {
  readonly class = input<string>('');
  protected readonly computedClass = computed(() =>
    cn('text-muted-foreground', this.class())
  );
}
