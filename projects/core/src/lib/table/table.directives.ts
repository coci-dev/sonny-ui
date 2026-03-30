import { Directive, computed, inject, input, InjectionToken } from '@angular/core';
import { cn } from '../core/utils/cn';
import { tableVariants, tableCellVariants, type TableVariant, type TableDensity } from './table.variants';

export const SNY_TABLE = new InjectionToken<SnyTableDirective>('SnyTable');

@Directive({
  selector: 'table[snyTable]',
  providers: [{ provide: SNY_TABLE, useExisting: SnyTableDirective }],
  host: { '[class]': 'computedClass()' },
})
export class SnyTableDirective {
  readonly variant = input<TableVariant>('default');
  readonly density = input<TableDensity>('normal');
  readonly hoverable = input(false);
  readonly stickyHeader = input(false);
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn(tableVariants({ variant: this.variant() }), this.class())
  );
}

@Directive({
  selector: 'thead[snyTableHeader]',
  host: { '[class]': 'computedClass()' },
})
export class SnyTableHeaderDirective {
  readonly class = input<string>('');
  private readonly table = inject(SNY_TABLE, { optional: true });

  protected readonly computedClass = computed(() =>
    cn(
      '[&_tr]:border-b',
      this.table?.stickyHeader() ? 'sticky top-0 z-10 bg-background' : '',
      this.class()
    )
  );
}

@Directive({
  selector: 'tbody[snyTableBody]',
  host: { '[class]': 'computedClass()' },
})
export class SnyTableBodyDirective {
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('[&_tr:last-child]:border-0', this.class())
  );
}

@Directive({
  selector: 'tr[snyTableRow]',
  host: { '[class]': 'computedClass()' },
})
export class SnyTableRowDirective {
  readonly class = input<string>('');
  private readonly table = inject(SNY_TABLE, { optional: true });

  protected readonly computedClass = computed(() =>
    cn(
      'border-b border-border transition-colors data-[state=selected]:bg-muted',
      this.table?.hoverable() ? 'hover:bg-muted/50' : '',
      this.class()
    )
  );
}

@Directive({
  selector: 'th[snyTableHead]',
  host: { '[class]': 'computedClass()' },
})
export class SnyTableHeadDirective {
  readonly class = input<string>('');
  private readonly table = inject(SNY_TABLE, { optional: true });

  protected readonly computedClass = computed(() =>
    cn(
      'text-left font-medium text-muted-foreground [&[align=center]]:text-center [&[align=right]]:text-right',
      tableCellVariants({ density: this.table?.density() ?? 'normal' }),
      this.class()
    )
  );
}

@Directive({
  selector: 'td[snyTableCell]',
  host: { '[class]': 'computedClass()' },
})
export class SnyTableCellDirective {
  readonly class = input<string>('');
  private readonly table = inject(SNY_TABLE, { optional: true });

  protected readonly computedClass = computed(() =>
    cn(
      '[&[align=center]]:text-center [&[align=right]]:text-right',
      tableCellVariants({ density: this.table?.density() ?? 'normal' }),
      this.class()
    )
  );
}

@Directive({
  selector: 'tfoot[snyTableFooter]',
  host: { '[class]': 'computedClass()' },
})
export class SnyTableFooterDirective {
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('border-t border-border font-medium [&>tr]:last:border-b-0', this.class())
  );
}

@Directive({
  selector: 'caption[snyTableCaption]',
  host: { '[class]': 'computedClass()' },
})
export class SnyTableCaptionDirective {
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('mt-4 text-sm text-muted-foreground', this.class())
  );
}
