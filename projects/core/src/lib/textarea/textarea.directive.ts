import {
  Directive,
  computed,
  input,
  effect,
  inject,
  ElementRef,
  afterNextRender,
} from '@angular/core';
import { cn } from '../core/utils/cn';
import {
  textareaVariants,
  type TextareaVariant,
  type TextareaSize,
  type TextareaResize,
} from './textarea.variants';

@Directive({
  selector: 'textarea[snyTextarea]',
  host: {
    '[class]': 'computedClass()',
    '[attr.aria-invalid]': 'variant() === "error" || null',
    '(input)': 'onInput()',
  },
})
export class SnyTextareaDirective {
  readonly variant = input<TextareaVariant>('default');
  readonly textareaSize = input<TextareaSize>('md');
  readonly resize = input<TextareaResize>('vertical');
  readonly autoResize = input(false);
  readonly class = input<string>('');

  private readonly el = inject(ElementRef<HTMLTextAreaElement>);

  protected readonly computedClass = computed(() =>
    cn(
      textareaVariants({
        variant: this.variant(),
        textareaSize: this.textareaSize(),
        resize: this.autoResize() ? 'none' : this.resize(),
      }),
      this.class()
    )
  );

  constructor() {
    afterNextRender(() => {
      if (this.autoResize()) {
        this.adjustHeight();
      }
    });

    effect(() => {
      if (this.autoResize()) {
        this.adjustHeight();
      }
    });
  }

  protected onInput(): void {
    if (this.autoResize()) {
      this.adjustHeight();
    }
  }

  private adjustHeight(): void {
    const textarea = this.el.nativeElement;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }
}
