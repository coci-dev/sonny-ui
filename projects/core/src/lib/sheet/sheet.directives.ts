import { Directive, computed, input, inject } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';
import { cn } from '../core/utils/cn';

@Directive({
  selector: '[snySheetHeader]',
  host: { '[class]': 'computedClass()' },
})
export class SnySheetHeaderDirective {
  readonly class = input<string>('');
  protected readonly computedClass = computed(() =>
    cn('flex flex-col space-y-2', this.class())
  );
}

@Directive({
  selector: '[snySheetTitle]',
  host: { '[class]': 'computedClass()' },
})
export class SnySheetTitleDirective {
  readonly class = input<string>('');
  protected readonly computedClass = computed(() =>
    cn('text-lg font-semibold text-foreground', this.class())
  );
}

@Directive({
  selector: '[snySheetDescription]',
  host: { '[class]': 'computedClass()' },
})
export class SnySheetDescriptionDirective {
  readonly class = input<string>('');
  protected readonly computedClass = computed(() =>
    cn('text-sm text-muted-foreground', this.class())
  );
}

@Directive({
  selector: '[snySheetContent]',
  host: { '[class]': 'computedClass()' },
})
export class SnySheetContentDirective {
  readonly class = input<string>('');
  protected readonly computedClass = computed(() =>
    cn('py-4', this.class())
  );
}

@Directive({
  selector: '[snySheetClose]',
  host: {
    '[class]': 'computedClass()',
    '(click)': 'onClick()',
  },
})
export class SnySheetCloseDirective {
  readonly class = input<string>('');
  protected readonly computedClass = computed(() =>
    cn(
      'absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
      this.class()
    )
  );

  private readonly dialogRef = inject(DialogRef, { optional: true });

  onClick(): void {
    this.dialogRef?.close();
  }
}
