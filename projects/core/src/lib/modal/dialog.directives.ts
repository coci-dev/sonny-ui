import { Directive, computed, input, inject } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';
import { cn } from '../core/utils/cn';

@Directive({
  selector: '[snyDialogHeader]',
  host: { '[class]': 'computedClass()' },
})
export class SnyDialogHeaderDirective {
  readonly class = input<string>('');
  protected readonly computedClass = computed(() =>
    cn('flex flex-col space-y-1.5 text-center sm:text-left px-6 pt-6 shrink-0', this.class())
  );
}

@Directive({
  selector: '[snyDialogTitle]',
  host: { '[class]': 'computedClass()' },
})
export class SnyDialogTitleDirective {
  readonly class = input<string>('');
  protected readonly computedClass = computed(() =>
    cn('text-lg font-semibold leading-none tracking-tight', this.class())
  );
}

@Directive({
  selector: '[snyDialogDescription]',
  host: { '[class]': 'computedClass()' },
})
export class SnyDialogDescriptionDirective {
  readonly class = input<string>('');
  protected readonly computedClass = computed(() =>
    cn('text-sm text-muted-foreground', this.class())
  );
}

@Directive({
  selector: '[snyDialogContent]',
  host: { '[class]': 'computedClass()' },
})
export class SnyDialogContentDirective {
  readonly class = input<string>('');
  protected readonly computedClass = computed(() =>
    cn(
      'flex-1 overflow-y-auto px-6 py-4',
      this.class()
    )
  );
}

@Directive({
  selector: '[snyDialogFooter]',
  host: { '[class]': 'computedClass()' },
})
export class SnyDialogFooterDirective {
  readonly class = input<string>('');
  protected readonly computedClass = computed(() =>
    cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 px-6 pb-6 shrink-0', this.class())
  );
}

@Directive({
  selector: '[snyDialogClose]',
  host: {
    '[class]': 'computedClass()',
    '(click)': 'onClick()',
  },
})
export class SnyDialogCloseDirective {
  readonly class = input<string>('');
  protected readonly computedClass = computed(() =>
    cn(
      'absolute right-4 top-4 z-10 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none cursor-pointer',
      this.class()
    )
  );

  private readonly dialogRef = inject(DialogRef, { optional: true });

  onClick(): void {
    this.dialogRef?.close();
  }
}
