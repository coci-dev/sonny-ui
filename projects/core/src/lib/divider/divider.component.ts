import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { cn } from '../core/utils/cn';
import {
  dividerVariants,
  type DividerOrientation,
  type DividerVariant,
} from './divider.variants';

@Component({
  selector: 'sny-divider',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'role': 'separator',
    '[attr.aria-orientation]': 'orientation()',
  },
  template: `
    @if (hasLabel()) {
      <div [class]="labelContainerClass()">
        <div [class]="lineClass()"></div>
        <span class="px-2 text-xs text-muted-foreground">{{ label() }}</span>
        <div [class]="lineClass()"></div>
      </div>
    } @else {
      <div [class]="dividerClass()"></div>
    }
  `,
})
export class SnyDividerComponent {
  readonly orientation = input<DividerOrientation>('horizontal');
  readonly variant = input<DividerVariant>('solid');
  readonly label = input<string>('');
  readonly class = input<string>('');

  readonly hasLabel = computed(() => !!this.label());

  protected readonly dividerClass = computed(() =>
    cn(dividerVariants({ orientation: this.orientation(), variant: this.variant() }), this.class())
  );

  protected readonly lineClass = computed(() =>
    cn('flex-1 bg-border', this.orientation() === 'horizontal' ? 'h-[1px]' : 'w-[1px]')
  );

  protected readonly labelContainerClass = computed(() =>
    cn(
      'flex items-center',
      this.orientation() === 'horizontal' ? 'flex-row' : 'flex-col',
      this.class()
    )
  );
}
