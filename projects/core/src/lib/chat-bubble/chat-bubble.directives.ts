import { Directive, InjectionToken, computed, inject, input } from '@angular/core';
import { cn } from '../core/utils/cn';

export type ChatBubbleAlign = 'start' | 'end';
export type ChatBubbleContentVariant = 'default' | 'primary' | 'secondary' | 'accent';

export const SNY_CHAT_BUBBLE = new InjectionToken<SnyChatBubbleDirective>('SnyChatBubble');

@Directive({
  selector: '[snyChatBubble]',
  providers: [{ provide: SNY_CHAT_BUBBLE, useExisting: SnyChatBubbleDirective }],
  host: {
    'role': 'article',
    '[class]': 'computedClass()',
  },
})
export class SnyChatBubbleDirective {
  readonly align = input<ChatBubbleAlign>('start');
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn(
      'flex gap-3 mb-4',
      this.align() === 'end' && 'flex-row-reverse',
      this.class()
    )
  );
}

@Directive({
  selector: '[snyChatBubbleAvatar]',
  host: { '[class]': 'computedClass()' },
})
export class SnyChatBubbleAvatarDirective {
  readonly class = input<string>('');
  protected readonly computedClass = computed(() =>
    cn('flex-shrink-0 w-10 h-10 rounded-full overflow-hidden', this.class())
  );
}

@Directive({
  selector: '[snyChatBubbleHeader]',
  host: { '[class]': 'computedClass()' },
})
export class SnyChatBubbleHeaderDirective {
  readonly class = input<string>('');
  protected readonly computedClass = computed(() =>
    cn('text-xs text-muted-foreground mb-1', this.class())
  );
}

@Directive({
  selector: '[snyChatBubbleContent]',
  host: { '[class]': 'computedClass()' },
})
export class SnyChatBubbleContentDirective {
  readonly variant = input<ChatBubbleContentVariant>('default');
  readonly class = input<string>('');

  protected readonly computedClass = computed(() => {
    const v = this.variant();
    const variantClass =
      v === 'primary' ? 'bg-primary text-primary-foreground' :
      v === 'secondary' ? 'bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100' :
      v === 'accent' ? 'bg-violet-100 text-violet-900 dark:bg-violet-900 dark:text-violet-100' :
      'bg-muted';
    return cn('rounded-lg px-3 py-2 text-sm max-w-[80%]', variantClass, this.class());
  });
}

@Directive({
  selector: '[snyChatBubbleFooter]',
  host: { '[class]': 'computedClass()' },
})
export class SnyChatBubbleFooterDirective {
  readonly class = input<string>('');
  protected readonly computedClass = computed(() =>
    cn('text-xs text-muted-foreground mt-1', this.class())
  );
}

@Directive({
  selector: '[snyChatBubbleBody]',
  host: { '[class]': 'computedClass()' },
})
export class SnyChatBubbleBodyDirective {
  private readonly chatBubble = inject(SNY_CHAT_BUBBLE);
  readonly class = input<string>('');
  protected readonly computedClass = computed(() =>
    cn(
      'flex flex-col',
      this.chatBubble.align() === 'end' && 'items-end',
      this.class()
    )
  );
}
