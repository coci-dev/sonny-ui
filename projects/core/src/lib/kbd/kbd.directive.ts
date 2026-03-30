import { Directive, computed, input } from '@angular/core';
import { cn } from '../core/utils/cn';
import { kbdVariants, type KbdSize } from './kbd.variants';

@Directive({
  selector: 'kbd[snyKbd]',
  host: {
    '[class]': 'computedClass()',
  },
})
export class SnyKbdDirective {
  readonly size = input<KbdSize>('md');
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn(kbdVariants({ size: this.size() }), this.class())
  );
}
