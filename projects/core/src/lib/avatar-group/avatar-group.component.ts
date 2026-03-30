import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { cn } from '../core/utils/cn';

export interface AvatarGroupItem {
  src?: string;
  alt?: string;
  fallback?: string;
}

const sizeMap = {
  sm: { avatar: 'h-7 w-7 text-xs', counter: 'h-7 w-7 text-[10px]' },
  md: { avatar: 'h-9 w-9 text-sm', counter: 'h-9 w-9 text-xs' },
  lg: { avatar: 'h-11 w-11 text-base', counter: 'h-11 w-11 text-sm' },
};

const spacingMap = {
  tight: '-space-x-3',
  normal: '-space-x-2',
};

export type AvatarGroupSize = 'sm' | 'md' | 'lg';
export type AvatarGroupSpacing = 'tight' | 'normal';

@Component({
  selector: 'sny-avatar-group',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="containerClass()" role="group" [attr.aria-label]="'Group of ' + items().length + ' users'">
      @for (item of visibleItems(); track $index) {
        @if (item.src) {
          <img
            [src]="item.src"
            [alt]="item.alt ?? ''"
            [class]="avatarClass()"
          />
        } @else {
          <div [class]="fallbackClass()">
            {{ item.fallback ?? '?' }}
          </div>
        }
      }
      @if (overflowCount() > 0) {
        <div [class]="counterClass()" [title]="overflowCount() + ' more'">
          +{{ overflowCount() }}
        </div>
      }
    </div>
  `,
})
export class SnyAvatarGroupComponent {
  readonly items = input.required<AvatarGroupItem[]>();
  readonly max = input(3);
  readonly size = input<AvatarGroupSize>('md');
  readonly spacing = input<AvatarGroupSpacing>('normal');

  readonly visibleItems = computed(() => this.items().slice(0, this.max()));
  readonly overflowCount = computed(() => Math.max(0, this.items().length - this.max()));

  readonly containerClass = computed(() =>
    cn('flex items-center', spacingMap[this.spacing()])
  );

  readonly avatarClass = computed(() =>
    cn(
      'inline-block rounded-full object-cover ring-2 ring-background',
      sizeMap[this.size()].avatar
    )
  );

  readonly fallbackClass = computed(() =>
    cn(
      'inline-flex items-center justify-center rounded-full bg-muted text-muted-foreground font-medium ring-2 ring-background',
      sizeMap[this.size()].avatar
    )
  );

  readonly counterClass = computed(() =>
    cn(
      'inline-flex items-center justify-center rounded-full bg-muted text-muted-foreground font-semibold ring-2 ring-background',
      sizeMap[this.size()].counter
    )
  );
}
