import { Directive, TemplateRef, inject, input } from '@angular/core';

@Directive({
  selector: '[snyCell]',
})
export class SnyCellDefDirective {
  readonly snyCell = input.required<string>();
  readonly template = inject(TemplateRef);
}

@Directive({
  selector: '[snyHeaderCell]',
})
export class SnyHeaderCellDefDirective {
  readonly snyHeaderCell = input.required<string>();
  readonly template = inject(TemplateRef);
}

@Directive({
  selector: '[snyBulkActions]',
})
export class SnyBulkActionsDefDirective {
  readonly template = inject(TemplateRef);
}

@Directive({
  selector: '[snyRowExpand]',
})
export class SnyRowExpandDefDirective {
  readonly template = inject(TemplateRef);
}
