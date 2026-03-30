import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { cn } from '../core/utils/cn';
import {
  progressTrackVariants,
  progressBarVariants,
  type ProgressVariant,
  type ProgressSize,
} from './progress.variants';

@Component({
  selector: 'sny-progress',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'role': 'progressbar',
    '[attr.aria-valuenow]': 'indeterminate() ? null : value()',
    '[attr.aria-valuemin]': '0',
    '[attr.aria-valuemax]': 'max()',
    '[attr.aria-label]': 'label()',
    '[class]': '"w-full"',
  },
  template: `
    <div [class]="trackClass()">
      <div
        [class]="barClass()"
        [style.width.%]="indeterminate() ? null : percentage()"
      ></div>
    </div>
  `,
  styles: `
    @keyframes progress-indeterminate {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(400%); }
    }
    :host .animate-progress-indeterminate {
      animation: progress-indeterminate 1.5s ease-in-out infinite;
    }
  `,
})
export class SnyProgressComponent {
  readonly value = input(0);
  readonly max = input(100);
  readonly variant = input<ProgressVariant>('default');
  readonly size = input<ProgressSize>('md');
  readonly indeterminate = input(false);
  readonly label = input('Progress');
  readonly class = input<string>('');

  readonly percentage = computed(() =>
    Math.min(100, (this.value() / this.max()) * 100)
  );

  protected readonly trackClass = computed(() =>
    cn(progressTrackVariants({ size: this.size() }), this.class())
  );

  protected readonly barClass = computed(() =>
    cn(
      progressBarVariants({
        variant: this.variant(),
        indeterminate: this.indeterminate(),
      })
    )
  );
}
