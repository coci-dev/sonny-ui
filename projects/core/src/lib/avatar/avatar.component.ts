import { Component, computed, input, signal } from '@angular/core';
import { cn } from '../core/utils/cn';
import { avatarVariants, type AvatarSize, type AvatarVariant } from './avatar.variants';

@Component({
  selector: 'sny-avatar',
  standalone: true,
  host: { '[class]': 'computedClass()' },
  template: `
    @if (src() && !error()) {
      <img
        [src]="src()"
        [alt]="alt()"
        class="aspect-square h-full w-full object-cover"
        (error)="error.set(true)"
      />
    } @else {
      <span class="font-medium text-muted-foreground">{{ fallbackText() }}</span>
    }
  `,
})
export class SnyAvatarComponent {
  readonly src = input<string>('');
  readonly alt = input<string>('');
  readonly fallback = input<string>('');
  readonly size = input<AvatarSize>('md');
  readonly variant = input<AvatarVariant>('circle');
  readonly class = input<string>('');

  readonly error = signal(false);

  protected readonly fallbackText = computed(() => {
    const fb = this.fallback();
    if (fb) return fb;
    const a = this.alt();
    if (a) return a.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
    return '?';
  });

  protected readonly computedClass = computed(() =>
    cn(avatarVariants({ size: this.size(), variant: this.variant() }), this.class())
  );
}
