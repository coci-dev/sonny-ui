import { Directive, TemplateRef, inject, input } from '@angular/core';

@Directive({
  selector: '[snyCell]',
  standalone: true,
})
export class SnyCellDefDirective {
  readonly snyCell = input.required<string>();
  readonly template = inject(TemplateRef);
}

@Directive({
  selector: '[snyHeaderCell]',
  standalone: true,
})
export class SnyHeaderCellDefDirective {
  readonly snyHeaderCell = input.required<string>();
  readonly template = inject(TemplateRef);
}

@Directive({
  selector: '[snyBulkActions]',
  standalone: true,
})
export class SnyBulkActionsDefDirective {
  readonly template = inject(TemplateRef);
}

@Directive({
  selector: '[snyRowExpand]',
  standalone: true,
})
export class SnyRowExpandDefDirective {
  readonly template = inject(TemplateRef);
}
