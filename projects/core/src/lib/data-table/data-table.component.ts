import {
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  computed,
  contentChild,
  contentChildren,
  effect,
  input,
  model,
  output,
  signal,
  untracked,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import {
  SnyTableDirective,
  SnyTableHeaderDirective,
  SnyTableBodyDirective,
  SnyTableRowDirective,
  SnyTableHeadDirective,
  SnyTableCellDirective,
} from '../table/table.directives';
import type { TableVariant, TableDensity } from '../table/table.variants';
import { SnyPaginationComponent } from '../pagination/pagination.component';
import { SnyCheckboxDirective } from '../checkbox/checkbox.directive';
import { SnyInputDirective } from '../input/input.directive';
import { SnyButtonDirective } from '../button/button.directive';
import { SnySelectComponent, type SelectOption } from '../select/select.component';
import { SnySkeletonDirective } from '../skeleton/skeleton.directive';
import {
  SnyDropdownDirective,
  SnyDropdownTriggerDirective,
  SnyDropdownContentDirective,
  SnyMenuItemDirective,
} from '../dropdown/dropdown.directives';
import {
  SnyCellDefDirective,
  SnyHeaderCellDefDirective,
  SnyBulkActionsDefDirective,
  SnyRowExpandDefDirective,
} from './data-table.directives';
import type {
  DataTableColumn,
  DataTablePaginationConfig,
  SortState,
  SortDirection,
} from './data-table.types';

const DEFAULT_PAGINATION: DataTablePaginationConfig = {
  pageSize: 10,
  pageSizeOptions: [5, 10, 25, 50],
};

@Component({
  selector: 'sny-data-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgTemplateOutlet,
    SnyTableDirective,
    SnyTableHeaderDirective,
    SnyTableBodyDirective,
    SnyTableRowDirective,
    SnyTableHeadDirective,
    SnyTableCellDirective,
    SnyPaginationComponent,
    SnyCheckboxDirective,
    SnyInputDirective,
    SnyButtonDirective,
    SnySelectComponent,
    SnySkeletonDirective,
    SnyDropdownDirective,
    SnyDropdownTriggerDirective,
    SnyDropdownContentDirective,
    SnyMenuItemDirective,
  ],
  template: `
    <!-- Toolbar -->
    @if (filterable() || showExport() || showColumnToggle()) {
      <div class="flex items-center justify-between gap-4 mb-4 flex-wrap">
        @if (filterable()) {
          <input
            snyInput
            [value]="filterText()"
            (input)="onFilterInput($event)"
            placeholder="Filter..."
            class="w-full sm:max-w-sm"
          />
        }
        <div class="flex items-center gap-2">
          @if (showExport()) {
            <button snyBtn variant="outline" size="sm" (click)="onExport()">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="sm:mr-2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/><path d="M12 18v-6"/><path d="m9 15 3-3 3 3"/></svg>
              <span class="hidden sm:inline">Export</span>
            </button>
          }
          @if (showColumnToggle()) {
            <div snyDropdown class="relative">
              <button snyBtn variant="outline" size="sm" snyDropdownTrigger>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="sm:mr-2"><path d="M12 3v18"/><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M3 15h18"/></svg>
                <span class="hidden sm:inline">Columns</span>
              </button>
              <div snyDropdownContent class="w-48 right-0 left-auto">
                @for (col of columns(); track col.key) {
                  <label snyMenuItem class="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      snyCheckbox
                      [checked]="!hiddenColumns().has(col.key)"
                      (change)="toggleColumnVisibility(col.key)"
                      (click)="$event.stopPropagation()"
                    />
                    {{ col.label }}
                  </label>
                }
              </div>
            </div>
          }
        </div>
      </div>
    }

    <!-- Bulk Actions Bar -->
    @if (showBulkActions()) {
      @let selected = selectedRows();
      <div class="flex items-center gap-2 mb-4 p-3 bg-muted/50 rounded-sm border border-border flex-wrap">
        <span class="text-sm font-medium text-muted-foreground mr-2">
          {{ selected.length }} selected
        </span>
        <ng-container
          [ngTemplateOutlet]="bulkActionsDef()!.template"
          [ngTemplateOutletContext]="{ $implicit: selected }"
        />
        <button
          snyBtn variant="ghost" size="sm" class="ml-auto"
          (click)="selectedRows.set([])"
        >
          Clear
        </button>
      </div>
    }

    <!-- Table -->
    <div class="overflow-auto border border-border rounded-sm">
      <table
        snyTable
        [variant]="variant()"
        [density]="density()"
        [hoverable]="hoverable()"
        [stickyHeader]="stickyHeader()"
      >
        <thead snyTableHeader>
          <tr snyTableRow>
            @if (selectable()) {
              <th snyTableHead class="w-12">
                <input
                  type="checkbox"
                  snyCheckbox
                  [checked]="allSelected()"
                  [indeterminate]="someSelected() && !allSelected()"
                  (change)="toggleSelectAll()"
                />
              </th>
            }
            @if (expandable()) {
              <th snyTableHead class="w-10"></th>
            }
            @let sort = sortState();
            @let headerDefs = headerCellDefMap();
            @for (col of visibleColumns(); track col.key) {
              <th
                snyTableHead
                [style.width]="col.width ?? null"
                [class]="col.sortable ? 'cursor-pointer select-none' : ''"
                (click)="col.sortable ? toggleSort(col.key) : null"
              >
                @if (headerDefs.has(col.key)) {
                  <ng-container
                    [ngTemplateOutlet]="headerDefs.get(col.key)!"
                    [ngTemplateOutletContext]="{ $implicit: col }"
                  />
                } @else {
                  <div class="flex items-center gap-1">
                    <span>{{ col.label }}</span>
                    @if (col.sortable) {
                      @let isActive = sort.key === col.key;
                      @if (isActive && sort.direction === 'asc') {
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 7-7 7 7"/></svg>
                      } @else if (isActive && sort.direction === 'desc') {
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m19 12-7 7-7-7"/></svg>
                      } @else {
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-30"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>
                      }
                    }
                  </div>
                }
              </th>
            }
          </tr>
        </thead>
        <tbody snyTableBody>
          @if (loading()) {
            @for (i of skeletonRows(); track i) {
              <tr snyTableRow>
                @if (selectable()) {
                  <td snyTableCell class="w-12"><div snySkeleton class="w-4 h-4 rounded"></div></td>
                }
                @if (expandable()) {
                  <td snyTableCell class="w-10"><div snySkeleton class="w-4 h-4 rounded"></div></td>
                }
                @for (col of visibleColumns(); track col.key) {
                  <td snyTableCell [style.width]="col.width ?? null">
                    <div snySkeleton class="w-full h-4 rounded"></div>
                  </td>
                }
              </tr>
            }
          } @else if (paginatedData().length === 0) {
            <tr snyTableRow>
              <td
                snyTableCell
                [attr.colspan]="totalColSpan()"
                class="text-center text-muted-foreground py-8"
              >
                {{ noDataText() }}
              </td>
            </tr>
          } @else {
            @let cellDefs = cellDefMap();
            @let cols = visibleColumns();
            @let expandTpl = rowExpandDef();
            @for (row of paginatedData(); track trackByFn(row, $index)) {
              <tr
                snyTableRow
                [attr.data-state]="isSelected(row) ? 'selected' : null"
                (click)="onRowClick(row)"
                class="cursor-pointer"
              >
                @if (selectable()) {
                  <td snyTableCell class="w-12">
                    <input
                      type="checkbox"
                      snyCheckbox
                      [checked]="isSelected(row)"
                      (change)="toggleRowSelection(row)"
                      (click)="$event.stopPropagation()"
                    />
                  </td>
                }
                @if (expandable()) {
                  <td snyTableCell class="w-10">
                    <button
                      class="p-0.5 rounded hover:bg-accent transition-transform duration-150"
                      [class.rotate-90]="isExpanded(row)"
                      (click)="toggleRowExpansion(row); $event.stopPropagation()"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                    </button>
                  </td>
                }
                @for (col of cols; track col.key) {
                  <td snyTableCell [style.width]="col.width ?? null">
                    @if (cellDefs.has(col.key)) {
                      <ng-container
                        [ngTemplateOutlet]="cellDefs.get(col.key)!"
                        [ngTemplateOutletContext]="{ $implicit: row[col.key], row: row }"
                      />
                    } @else {
                      {{ row[col.key] }}
                    }
                  </td>
                }
              </tr>
              @if (expandable() && isExpanded(row) && expandTpl) {
                <tr snyTableRow>
                  <td snyTableCell [attr.colspan]="totalColSpan()" class="bg-muted/30">
                    <ng-container
                      [ngTemplateOutlet]="expandTpl.template"
                      [ngTemplateOutletContext]="{ $implicit: row }"
                    />
                  </td>
                </tr>
              }
            }
          }
        </tbody>
      </table>
    </div>

    <!-- Footer -->
    @if (paginated()) {
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-4 gap-3 sm:gap-4">
        <span class="text-sm text-muted-foreground">
          @if (selectable()) {
            {{ selectedRows().length }} of {{ filteredData().length }} row(s) selected
          } @else {
            {{ filteredData().length }} row(s)
          }
        </span>
        <div class="flex items-center gap-3 sm:gap-4 flex-wrap">
          <div class="flex items-center gap-2">
            <span class="hidden sm:inline text-sm text-muted-foreground whitespace-nowrap">Rows per page</span>
            <sny-select
              [options]="pageSizeOptions()"
              [value]="pageSizeValue()"
              (valueChange)="onPageSizeChange($event)"
              size="sm"
              class="w-20"
            />
          </div>
          <sny-pagination
            [currentPage]="currentPage()"
            (currentPageChange)="currentPage.set($event)"
            [totalPages]="totalPages()"
          />
        </div>
      </div>
    }
  `,
})
export class SnyDataTableComponent {
  // Inputs
  readonly columns = input.required<DataTableColumn[]>();
  readonly data = input.required<Record<string, unknown>[]>();
  readonly variant = input<TableVariant>('default');
  readonly density = input<TableDensity>('normal');
  readonly hoverable = input(true);
  readonly stickyHeader = input(false);
  readonly selectable = input(false);
  readonly paginated = input(true);
  readonly filterable = input(true);
  readonly showExport = input(false);
  readonly showColumnToggle = input(false);
  readonly expandable = input(false);
  readonly loading = input(false);
  readonly loadingRows = input(5);
  readonly paginationConfig = input<DataTablePaginationConfig>(DEFAULT_PAGINATION);
  readonly trackBy = input('');
  readonly noDataText = input('No data available');

  // Model
  readonly selectedRows = model<Record<string, unknown>[]>([]);

  // Outputs
  readonly sortChanged = output<SortState>();
  readonly rowClicked = output<Record<string, unknown>>();
  readonly dataExported = output<Record<string, unknown>[]>();

  // Content queries
  readonly cellDefs = contentChildren(SnyCellDefDirective);
  readonly headerCellDefs = contentChildren(SnyHeaderCellDefDirective);
  readonly bulkActionsDef = contentChild(SnyBulkActionsDefDirective);
  readonly rowExpandDef = contentChild(SnyRowExpandDefDirective);

  // Internal state
  readonly sortState = signal<SortState>({ key: '', direction: null });
  readonly filterText = signal('');
  readonly currentPage = signal(1);
  readonly pageSize = signal(10);
  readonly hiddenColumns = signal<Set<string>>(new Set());
  readonly expandedRows = signal<Set<unknown>>(new Set());

  // Template def maps
  readonly cellDefMap = computed(() => {
    const map = new Map<string, TemplateRef<unknown>>();
    for (const def of this.cellDefs()) {
      map.set(def.snyCell(), def.template);
    }
    return map;
  });

  readonly headerCellDefMap = computed(() => {
    const map = new Map<string, TemplateRef<unknown>>();
    for (const def of this.headerCellDefs()) {
      map.set(def.snyHeaderCell(), def.template);
    }
    return map;
  });

  // Visible columns
  readonly visibleColumns = computed(() =>
    this.columns().filter(
      (col) => col.visible !== false && !this.hiddenColumns().has(col.key)
    )
  );

  // Page size options
  readonly pageSizeOptions = computed<SelectOption[]>(() =>
    this.paginationConfig().pageSizeOptions.map((n) => ({
      value: String(n),
      label: String(n),
    }))
  );

  readonly pageSizeValue = computed(() => String(this.pageSize()));

  // Skeleton rows
  readonly skeletonRows = computed(() =>
    Array.from({ length: this.loadingRows() }, (_, i) => i)
  );

  // Bulk actions visibility
  readonly showBulkActions = computed(
    () =>
      this.selectable() &&
      this.selectedRows().length > 0 &&
      this.bulkActionsDef() != null
  );

  // Data pipeline (filter uses all columns, not just visible)
  readonly filteredData = computed(() => {
    const text = this.filterText().toLowerCase().trim();
    const rows = this.data();
    if (!text) return rows;
    const cols = this.columns().filter((c) => c.filterable !== false);
    return rows.filter((row) =>
      cols.some((col) =>
        String(row[col.key] ?? '').toLowerCase().includes(text)
      )
    );
  });

  readonly sortedData = computed(() => {
    const { key, direction } = this.sortState();
    const rows = this.filteredData();
    if (!key || !direction) return rows;
    return [...rows].sort((a, b) => {
      const aVal = a[key];
      const bVal = b[key];
      if (aVal == null && bVal == null) return 0;
      if (aVal == null) return direction === 'asc' ? -1 : 1;
      if (bVal == null) return direction === 'asc' ? 1 : -1;
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return direction === 'asc' ? aVal - bVal : bVal - aVal;
      }
      const cmp = String(aVal).localeCompare(String(bVal));
      return direction === 'asc' ? cmp : -cmp;
    });
  });

  readonly totalPages = computed(() =>
    Math.max(1, Math.ceil(this.filteredData().length / this.pageSize()))
  );

  readonly paginatedData = computed(() => {
    if (!this.paginated()) return this.sortedData();
    const start = (this.currentPage() - 1) * this.pageSize();
    return this.sortedData().slice(start, start + this.pageSize());
  });

  readonly totalColSpan = computed(
    () =>
      this.visibleColumns().length +
      (this.selectable() ? 1 : 0) +
      (this.expandable() ? 1 : 0)
  );

  // Selection computed
  readonly allSelected = computed(() => {
    const page = this.paginatedData();
    if (page.length === 0) return false;
    const selected = this.selectedRows();
    return page.every((row) => this.isRowInList(row, selected));
  });

  readonly someSelected = computed(() => {
    const page = this.paginatedData();
    const selected = this.selectedRows();
    return page.some((row) => this.isRowInList(row, selected));
  });

  constructor() {
    effect(() => {
      const config = this.paginationConfig();
      untracked(() => this.pageSize.set(config.pageSize));
    });

    effect(() => {
      this.filterText();
      this.pageSize();
      this.data();
      untracked(() => this.currentPage.set(1));
    });
  }

  // Sort
  toggleSort(key: string): void {
    const current = this.sortState();
    let direction: SortDirection;
    if (current.key !== key) {
      direction = 'asc';
    } else if (current.direction === 'asc') {
      direction = 'desc';
    } else if (current.direction === 'desc') {
      direction = null;
    } else {
      direction = 'asc';
    }
    const next: SortState = { key: direction ? key : '', direction };
    this.sortState.set(next);
    this.sortChanged.emit(next);
  }

  // Filter
  onFilterInput(event: Event): void {
    this.filterText.set((event.target as HTMLInputElement).value);
  }

  // Page size
  onPageSizeChange(value: string): void {
    this.pageSize.set(Number(value));
  }

  // Selection
  toggleSelectAll(): void {
    if (this.allSelected()) {
      const page = this.paginatedData();
      this.selectedRows.update((sel) =>
        sel.filter((r) => !page.some((p) => this.rowsEqual(r, p)))
      );
    } else {
      const page = this.paginatedData();
      this.selectedRows.update((sel) => {
        const newSel = [...sel];
        for (const row of page) {
          if (!this.isRowInList(row, newSel)) newSel.push(row);
        }
        return newSel;
      });
    }
  }

  toggleRowSelection(row: Record<string, unknown>): void {
    this.selectedRows.update((sel) =>
      this.isRowInList(row, sel)
        ? sel.filter((r) => !this.rowsEqual(r, row))
        : [...sel, row]
    );
  }

  // Row click
  onRowClick(row: Record<string, unknown>): void {
    this.rowClicked.emit(row);
  }

  // Export
  onExport(): void {
    this.dataExported.emit(this.filteredData());
  }

  // Column visibility
  toggleColumnVisibility(key: string): void {
    this.hiddenColumns.update((set) => {
      const next = new Set(set);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  // Expansion
  toggleRowExpansion(row: Record<string, unknown>): void {
    const key = this.trackBy() ? row[this.trackBy()] : row;
    this.expandedRows.update((set) => {
      const next = new Set(set);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  isExpanded(row: Record<string, unknown>): boolean {
    const key = this.trackBy() ? row[this.trackBy()] : row;
    return this.expandedRows().has(key);
  }

  // Helpers
  isSelected(row: Record<string, unknown>): boolean {
    return this.isRowInList(row, this.selectedRows());
  }

  trackByFn(row: Record<string, unknown>, index: number): unknown {
    const key = this.trackBy();
    return key ? row[key] : index;
  }

  private isRowInList(
    row: Record<string, unknown>,
    list: Record<string, unknown>[]
  ): boolean {
    return list.some((r) => this.rowsEqual(r, row));
  }

  private rowsEqual(
    a: Record<string, unknown>,
    b: Record<string, unknown>
  ): boolean {
    const key = this.trackBy();
    if (key) return a[key] === b[key];
    return a === b;
  }
}
