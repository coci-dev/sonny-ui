import { Directive, InjectionToken, computed, contentChildren, input } from '@angular/core';
import { cn } from '../core/utils/cn';

export const SNY_TIMELINE = new InjectionToken<SnyTimelineDirective>('SnyTimeline');
export type TimelineOrientation = 'vertical' | 'horizontal';
export type TimelineConnect = 'start' | 'end' | 'both' | 'none';
export type TimelineMiddleVariant = 'default' | 'primary' | 'success' | 'error';

@Directive({
  selector: '[snyTimelineItem]',
  standalone: true,
  host: { 'role': 'listitem', '[class]': 'computedClass()' },
})
export class SnyTimelineItemDirective {
  readonly connect = input<TimelineConnect>('both');
  readonly class = input<string>('');
  protected readonly computedClass = computed(() =>
    cn('relative flex gap-4', this.class())
  );
}

@Directive({
  selector: '[snyTimelineStart]',
  standalone: true,
  host: { '[class]': 'computedClass()' },
})
export class SnyTimelineStartDirective {
  readonly class = input<string>('');
  protected readonly computedClass = computed(() =>
    cn('text-sm text-muted-foreground min-w-[80px] text-right', this.class())
  );
}

@Directive({
  selector: '[snyTimelineMiddle]',
  standalone: true,
  host: { '[class]': 'computedClass()', 'aria-hidden': 'true' },
})
export class SnyTimelineMiddleDirective {
  readonly variant = input<TimelineMiddleVariant>('default');
  readonly class = input<string>('');
  protected readonly computedClass = computed(() => {
    const v = this.variant();
    const variantClass =
      v === 'primary' ? 'bg-primary' :
      v === 'success' ? 'bg-green-600 dark:bg-green-500' :
      v === 'error' ? 'bg-destructive' :
      'bg-border';
    return cn('flex flex-col items-center', variantClass, this.class());
  });
}

@Directive({
  selector: '[snyTimelineEnd]',
  standalone: true,
  host: { '[class]': 'computedClass()' },
})
export class SnyTimelineEndDirective {
  readonly class = input<string>('');
  protected readonly computedClass = computed(() =>
    cn('flex-1 pb-8', this.class())
  );
}

@Directive({
  selector: '[snyTimeline]',
  standalone: true,
  exportAs: 'snyTimeline',
  providers: [{ provide: SNY_TIMELINE, useExisting: SnyTimelineDirective }],
  host: {
    'role': 'list',
    'aria-label': 'Timeline',
    '[class]': 'computedClass()',
  },
})
export class SnyTimelineDirective {
  readonly orientation = input<TimelineOrientation>('vertical');
  readonly class = input<string>('');

  readonly items = contentChildren(SnyTimelineItemDirective);

  protected readonly computedClass = computed(() => {
    const o = this.orientation();
    return cn(
      'relative',
      o === 'vertical' ? 'flex flex-col' : 'flex flex-row',
      this.class()
    );
  });
}
