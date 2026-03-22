import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { cn } from '../core/utils/cn';
import { loaderVariants, type LoaderSize, type LoaderVariant } from './loader.variants';

@Component({
  selector: 'sny-loader',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'computedClass()',
    role: 'status',
    '[attr.aria-label]': '"Loading"',
  },
  template: `
    @switch (variant()) {
      @case ('spinner') {
        <svg class="animate-spin h-full w-full" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      }
      @case ('dots') {
        <span class="flex items-center gap-1">
          <span class="h-1.5 w-1.5 rounded-full bg-current animate-bounce [animation-delay:-0.3s]"></span>
          <span class="h-1.5 w-1.5 rounded-full bg-current animate-bounce [animation-delay:-0.15s]"></span>
          <span class="h-1.5 w-1.5 rounded-full bg-current animate-bounce"></span>
        </span>
      }
      @case ('bars') {
        <span class="flex items-end gap-0.5 h-full">
          <span class="w-1 bg-current animate-pulse rounded-sm [animation-delay:-0.3s]" style="height:60%"></span>
          <span class="w-1 bg-current animate-pulse rounded-sm [animation-delay:-0.15s]" style="height:100%"></span>
          <span class="w-1 bg-current animate-pulse rounded-sm" style="height:40%"></span>
          <span class="w-1 bg-current animate-pulse rounded-sm [animation-delay:-0.2s]" style="height:80%"></span>
        </span>
      }
    }
  `,
})
export class SnyLoaderComponent {
  readonly variant = input<LoaderVariant>('spinner');
  readonly size = input<LoaderSize>('md');
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn(loaderVariants({ size: this.size() }), this.class())
  );
}
