import { Directive, InjectionToken, computed, contentChildren, inject, input } from '@angular/core';
import { cn } from '../core/utils/cn';

export const SNY_STEPS = new InjectionToken<SnyStepsDirective>('SnySteps');

export type StepStatus = 'default' | 'active' | 'completed' | 'error';
export type StepsOrientation = 'horizontal' | 'vertical';
export type StepsSize = 'sm' | 'md' | 'lg';

@Directive({
  selector: '[snyStep]',
  host: {
    'role': 'listitem',
    '[class]': 'computedClass()',
    '[attr.aria-current]': 'status() === "active" ? "step" : null',
  },
})
export class SnyStepDirective {
  readonly status = input<StepStatus>('default');
  readonly icon = input<string>('');
  readonly class = input<string>('');

  protected readonly computedClass = computed(() => {
    const s = this.status();
    const base = 'flex items-center gap-2';

    // Step indicator via before: pseudo-element
    const indicatorBase = 'before:flex before:items-center before:justify-center before:w-8 before:h-8 before:rounded-full before:border-2 before:text-xs before:shrink-0';

    const statusIndicator =
      s === 'completed' ? 'before:bg-primary before:border-primary before:text-primary-foreground before:content-["✓"]' :
      s === 'active' ? 'before:border-primary before:text-primary before:content-["●"]' :
      s === 'error' ? 'before:border-destructive before:text-destructive before:content-["!"]' :
      'before:border-muted-foreground/30 before:text-muted-foreground before:content-["○"]';

    const statusClass =
      s === 'completed' ? 'text-primary' :
      s === 'active' ? 'text-primary font-medium' :
      s === 'error' ? 'text-destructive' :
      'text-muted-foreground';

    return cn(base, indicatorBase, statusIndicator, statusClass, this.class());
  });
}

@Directive({
  selector: '[snySteps]',
  exportAs: 'snySteps',
  providers: [{ provide: SNY_STEPS, useExisting: SnyStepsDirective }],
  host: {
    'role': 'list',
    'aria-label': 'Progress steps',
    '[class]': 'computedClass()',
  },
})
export class SnyStepsDirective {
  readonly orientation = input<StepsOrientation>('horizontal');
  readonly size = input<StepsSize>('md');
  readonly class = input<string>('');

  readonly steps = contentChildren(SnyStepDirective);

  readonly activeIndex = computed(() => {
    const s = this.steps();
    return s.findIndex((step) => step.status() === 'active');
  });

  protected readonly computedClass = computed(() => {
    const o = this.orientation();
    const s = this.size();
    const base = 'flex';
    const orientationClass = o === 'horizontal'
      ? 'flex-row items-center gap-2 [&>*+*]:before:content-[""] [&>*+*]:before:flex-1 [&>*+*]:before:h-px [&>*+*]:before:bg-border [&>*+*]:before:mx-2 [&>*+*]:before:min-w-[2rem]'
      : 'flex-col gap-2 [&>*+*]:before:content-[""] [&>*+*]:before:w-px [&>*+*]:before:h-4 [&>*+*]:before:bg-border [&>*+*]:before:ml-4';
    const sizeClass = s === 'sm' ? 'text-xs' : s === 'lg' ? 'text-base' : 'text-sm';
    return cn(base, orientationClass, sizeClass, this.class());
  });
}
