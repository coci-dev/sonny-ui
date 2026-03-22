import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { cn } from '../core/utils/cn';

export type RadialProgressSize = 'sm' | 'md' | 'lg';
export type RadialProgressVariant = 'default' | 'success' | 'warning' | 'error' | 'info';

const sizeMap: Record<RadialProgressSize, number> = { sm: 48, md: 72, lg: 96 };

const variantColorMap: Record<RadialProgressVariant, string> = {
  default: 'stroke-primary',
  success: 'stroke-green-600 dark:stroke-green-500',
  warning: 'stroke-yellow-500',
  error: 'stroke-destructive',
  info: 'stroke-blue-600 dark:stroke-blue-500',
};

@Component({
  selector: 'sny-radial-progress',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'role': 'progressbar',
    '[attr.aria-valuenow]': 'value()',
    '[attr.aria-valuemin]': '0',
    '[attr.aria-valuemax]': '100',
    '[class]': '"inline-flex items-center justify-center"',
  },
  template: `
    <div class="relative" [style.width.px]="svgSize()" [style.height.px]="svgSize()">
      <svg [attr.width]="svgSize()" [attr.height]="svgSize()" class="-rotate-90">
        <circle
          [attr.cx]="svgSize() / 2"
          [attr.cy]="svgSize() / 2"
          [attr.r]="radius()"
          fill="none"
          class="stroke-muted"
          [attr.stroke-width]="thickness()"
        />
        <circle
          [attr.cx]="svgSize() / 2"
          [attr.cy]="svgSize() / 2"
          [attr.r]="radius()"
          fill="none"
          [class]="strokeClass()"
          [attr.stroke-width]="thickness()"
          [attr.stroke-dasharray]="circumference()"
          [attr.stroke-dashoffset]="offset()"
          stroke-linecap="round"
          class="transition-all duration-300"
        />
      </svg>
      <div class="absolute inset-0 flex items-center justify-center">
        <ng-content />
      </div>
    </div>
  `,
})
export class SnyRadialProgressComponent {
  readonly value = input(0);
  readonly size = input<RadialProgressSize>('md');
  readonly thickness = input(4);
  readonly variant = input<RadialProgressVariant>('default');
  readonly class = input<string>('');

  readonly svgSize = computed(() => sizeMap[this.size()]);
  readonly radius = computed(() => (this.svgSize() - this.thickness()) / 2);
  readonly circumference = computed(() => 2 * Math.PI * this.radius());
  readonly offset = computed(() => this.circumference() - (this.value() / 100) * this.circumference());

  readonly strokeClass = computed(() => variantColorMap[this.variant()]);
}
