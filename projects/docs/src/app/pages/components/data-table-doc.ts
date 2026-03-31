import { Component, computed, inject, signal } from '@angular/core';
import { CodeBlockComponent } from '../../shared/code-block';
import { ComponentPreviewComponent } from '../../shared/component-preview';
import { PropsTableComponent, type PropDef } from '../../shared/props-table';
import {
  SnyDataTableComponent,
  SnyCellDefDirective,
  SnyBulkActionsDefDirective,
  SnyRowExpandDefDirective,
  SnyBadgeDirective,
  SnyButtonDirective,
  type DataTableColumn,
} from 'core';
import { I18nService } from '../../i18n/i18n.service';
import { DATA_TABLE_DOC_EN } from '../../i18n/en/pages/data-table-doc';
import { DATA_TABLE_DOC_ES } from '../../i18n/es/pages/data-table-doc';

@Component({
  selector: 'docs-data-table-doc',
  standalone: true,
  imports: [
    CodeBlockComponent,
    ComponentPreviewComponent,
    PropsTableComponent,
    SnyDataTableComponent,
    SnyCellDefDirective,
    SnyBulkActionsDefDirective,
    SnyRowExpandDefDirective,
    SnyBadgeDirective,
    SnyButtonDirective,
  ],
  template: `
    <div class="space-y-8">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">{{ t().title }}</h1>
        <p class="text-muted-foreground mt-2">{{ t().description }}</p>
      </div>

      <!-- Import -->
      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.import }}</h2>
        <docs-code-block [code]="importCode" language="typescript" />
      </section>

      <!-- Basic Usage -->
      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.usage }}</h2>
        <docs-component-preview [code]="basicCode" language="markup">
          <sny-data-table
            [columns]="basicColumns"
            [data]="basicData"
            [paginated]="false"
            [filterable]="false"
          />
        </docs-component-preview>
      </section>

      <!-- Sorting -->
      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ t().sorting }}</h2>
        <p class="text-sm text-muted-foreground">{{ t().sortingDesc }}</p>
        <docs-component-preview [code]="sortCode" language="markup">
          <sny-data-table
            [columns]="sortableColumns"
            [data]="sampleData"
            [paginated]="false"
            [filterable]="false"
          />
        </docs-component-preview>
      </section>

      <!-- Filtering -->
      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ t().filtering }}</h2>
        <p class="text-sm text-muted-foreground">{{ t().filteringDesc }}</p>
        <docs-component-preview [code]="filterCode" language="markup">
          <sny-data-table
            [columns]="basicColumns"
            [data]="sampleData"
            [paginated]="false"
          />
        </docs-component-preview>
      </section>

      <!-- Custom Cell Templates -->
      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ t().customCells }}</h2>
        <p class="text-sm text-muted-foreground">{{ t().customCellsDesc }}</p>
        <docs-component-preview [code]="customCellCode" language="markup">
          <sny-data-table
            [columns]="statusColumns"
            [data]="statusData"
            [paginated]="false"
            [filterable]="false"
          >
            <ng-template snyCell="status" let-value>
              @let badgeVariant = value === 'Active' ? 'default' : value === 'Pending' ? 'secondary' : 'destructive';
              <span snyBadge [variant]="badgeVariant">{{ value }}</span>
            </ng-template>
            <ng-template snyCell="actions" let-row="row">
              <button snyBtn variant="ghost" size="sm">Edit</button>
            </ng-template>
          </sny-data-table>
        </docs-component-preview>
      </section>

      <!-- Loading State -->
      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ t().loadingState }}</h2>
        <p class="text-sm text-muted-foreground">{{ t().loadingStateDesc }}</p>
        <docs-component-preview [code]="loadingCode" language="markup">
          <div class="space-y-2">
            <button snyBtn variant="outline" size="sm" (click)="loadingDemo.set(!loadingDemo())">
              Toggle Loading
            </button>
            <sny-data-table
              [columns]="basicColumns"
              [data]="sampleData"
              [loading]="loadingDemo()"
              [loadingRows]="3"
              [paginated]="false"
              [filterable]="false"
            />
          </div>
        </docs-component-preview>
      </section>

      <!-- Selection + Bulk Actions -->
      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ t().bulkActions }}</h2>
        <p class="text-sm text-muted-foreground">{{ t().bulkActionsDesc }}</p>
        <docs-component-preview [code]="bulkCode" language="markup">
          <sny-data-table
            [columns]="basicColumns"
            [data]="sampleData"
            [selectable]="true"
            [paginated]="false"
            [filterable]="false"
            [trackBy]="'id'"
          >
            <ng-template snyBulkActions let-selected>
              <button snyBtn variant="destructive" size="sm">Delete ({{ selected.length }})</button>
              <button snyBtn variant="outline" size="sm">Archive</button>
            </ng-template>
          </sny-data-table>
        </docs-component-preview>
      </section>

      <!-- Row Expansion -->
      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ t().rowExpansion }}</h2>
        <p class="text-sm text-muted-foreground">{{ t().rowExpansionDesc }}</p>
        <docs-component-preview [code]="expandCode" language="markup">
          <sny-data-table
            [columns]="basicColumns"
            [data]="sampleData"
            [expandable]="true"
            [paginated]="false"
            [filterable]="false"
            [trackBy]="'id'"
          >
            <ng-template snyRowExpand let-row>
              <div class="p-4 space-y-1">
                <p class="text-sm font-medium">Details for {{ row['name'] }}</p>
                <p class="text-sm text-muted-foreground">Email: {{ row['email'] }}</p>
                <p class="text-sm text-muted-foreground">Role: {{ row['role'] }}</p>
              </div>
            </ng-template>
          </sny-data-table>
        </docs-component-preview>
      </section>

      <!-- Column Visibility -->
      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ t().columnVisibility }}</h2>
        <p class="text-sm text-muted-foreground">{{ t().columnVisibilityDesc }}</p>
        <docs-component-preview [code]="columnToggleCode" language="markup">
          <sny-data-table
            [columns]="basicColumns"
            [data]="sampleData"
            [showColumnToggle]="true"
            [paginated]="false"
          />
        </docs-component-preview>
      </section>

      <!-- Full Example -->
      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ t().fullExample }}</h2>
        <p class="text-sm text-muted-foreground">{{ t().fullExampleDesc }}</p>
        <docs-component-preview [code]="fullCode" language="markup">
          <sny-data-table
            [columns]="sortableColumns"
            [data]="largeData"
            [selectable]="true"
            [expandable]="true"
            [showExport]="true"
            [showColumnToggle]="true"
            [hoverable]="true"
            variant="striped"
            [trackBy]="'id'"
            [paginationConfig]="{ pageSize: 5, pageSizeOptions: [5, 10, 25] }"
          >
            <ng-template snyCell="role" let-value>
              <span snyBadge [variant]="value === 'Admin' ? 'default' : 'secondary'">{{ value }}</span>
            </ng-template>
            <ng-template snyBulkActions let-selected>
              <button snyBtn variant="destructive" size="sm">Delete ({{ selected.length }})</button>
            </ng-template>
            <ng-template snyRowExpand let-row>
              <div class="p-4 text-sm text-muted-foreground">
                Expanded details for {{ row['name'] }} ({{ row['email'] }})
              </div>
            </ng-template>
          </sny-data-table>
        </docs-component-preview>
      </section>

      <!-- API Reference -->
      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.apiReference }}</h2>
        <docs-props-table [props]="props()" />
      </section>

      <!-- Accessibility -->
      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.accessibility }}</h2>
        <ul class="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
          @for (item of t().accessibility; track item) {
            <li [innerHTML]="item"></li>
          }
        </ul>
      </section>
    </div>
  `,
})
export class DataTableDocComponent {
  readonly i18n = inject(I18nService);
  readonly t = computed(() => (this.i18n.locale() === 'es' ? DATA_TABLE_DOC_ES : DATA_TABLE_DOC_EN));

  readonly selectedRows = signal<Record<string, unknown>[]>([]);
  readonly exportedJson = signal('');
  readonly loadingDemo = signal(false);

  basicColumns: DataTableColumn[] = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
  ];

  sortableColumns: DataTableColumn[] = [
    { key: 'id', label: 'ID', sortable: true, width: '80px' },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role', sortable: true },
  ];

  statusColumns: DataTableColumn[] = [
    { key: 'id', label: 'ID', width: '80px' },
    { key: 'name', label: 'Name' },
    { key: 'status', label: 'Status' },
    { key: 'actions', label: 'Actions', filterable: false, width: '100px' },
  ];

  basicData: Record<string, unknown>[] = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Editor' },
    { id: 3, name: 'Carol White', email: 'carol@example.com', role: 'Viewer' },
  ];

  sampleData: Record<string, unknown>[] = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Editor' },
    { id: 3, name: 'Carol White', email: 'carol@example.com', role: 'Viewer' },
    { id: 4, name: 'David Brown', email: 'david@example.com', role: 'Admin' },
    { id: 5, name: 'Eve Davis', email: 'eve@example.com', role: 'Editor' },
  ];

  statusData: Record<string, unknown>[] = [
    { id: 1, name: 'Alice Johnson', status: 'Active', actions: '' },
    { id: 2, name: 'Bob Smith', status: 'Pending', actions: '' },
    { id: 3, name: 'Carol White', status: 'Inactive', actions: '' },
  ];

  largeData: Record<string, unknown>[] = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    name: ['Alice', 'Bob', 'Carol', 'David', 'Eve', 'Frank', 'Grace', 'Henry', 'Ivy', 'Jack'][i % 10] + ' ' + ['Johnson', 'Smith', 'White', 'Brown', 'Davis', 'Wilson', 'Moore', 'Taylor', 'Lee', 'Clark'][i % 10],
    email: `user${i + 1}@example.com`,
    role: ['Admin', 'Editor', 'Viewer'][i % 3],
  }));

  onExport(data: Record<string, unknown>[]): void {
    this.exportedJson.set(JSON.stringify(data, null, 2));
  }

  importCode = `import {
  SnyDataTableComponent,
  SnyCellDefDirective,
  SnyHeaderCellDefDirective,
  SnyBulkActionsDefDirective,
  SnyRowExpandDefDirective,
  type DataTableColumn,
} from '@sonny-ui/core';`;

  basicCode = `<sny-data-table
  [columns]="columns"
  [data]="data"
  [paginated]="false"
  [filterable]="false"
/>`;

  sortCode = `columns: DataTableColumn[] = [
  { key: 'id', label: 'ID', sortable: true },
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email' },
];

<sny-data-table [columns]="columns" [data]="data" />`;

  filterCode = `<sny-data-table
  [columns]="columns"
  [data]="data"
  [filterable]="true"
/>`;

  customCellCode = `<sny-data-table [columns]="columns" [data]="data">
  <ng-template snyCell="status" let-value>
    <span snyBadge [variant]="value === 'Active' ? 'default' : 'destructive'">
      {{ value }}
    </span>
  </ng-template>
  <ng-template snyCell="actions" let-row="row">
    <button snyBtn variant="ghost" size="sm">Edit</button>
  </ng-template>
</sny-data-table>`;

  loadingCode = `<sny-data-table
  [columns]="columns"
  [data]="data"
  [loading]="true"
  [loadingRows]="3"
/>`;

  bulkCode = `<sny-data-table [columns]="columns" [data]="data" [selectable]="true">
  <ng-template snyBulkActions let-selected>
    <button snyBtn variant="destructive" size="sm">
      Delete ({{ selected.length }})
    </button>
    <button snyBtn variant="outline" size="sm">Archive</button>
  </ng-template>
</sny-data-table>`;

  expandCode = `<sny-data-table [columns]="columns" [data]="data" [expandable]="true" [trackBy]="'id'">
  <ng-template snyRowExpand let-row>
    <div class="p-4">
      <p>Details for {{ row['name'] }}</p>
      <p>Email: {{ row['email'] }}</p>
    </div>
  </ng-template>
</sny-data-table>`;

  columnToggleCode = `<sny-data-table
  [columns]="columns"
  [data]="data"
  [showColumnToggle]="true"
/>`;

  selectionCode = `selectedRows = signal<Record<string, unknown>[]>([]);

<sny-data-table
  [columns]="columns"
  [data]="data"
  [selectable]="true"
  [trackBy]="'id'"
  [(selectedRows)]="selectedRows"
/>`;

  paginationCode = `<sny-data-table
  [columns]="columns"
  [data]="data"
  [paginationConfig]="{ pageSize: 5, pageSizeOptions: [5, 10, 25] }"
/>`;

  exportCode = `onExport(data: Record<string, unknown>[]) {
  console.log('Exported:', JSON.stringify(data));
}

<sny-data-table
  [columns]="columns"
  [data]="data"
  [showExport]="true"
  (dataExported)="onExport($event)"
/>`;

  fullCode = `<sny-data-table
  [columns]="columns"
  [data]="data"
  [selectable]="true"
  [expandable]="true"
  [showExport]="true"
  [showColumnToggle]="true"
  variant="striped"
  [trackBy]="'id'"
  [paginationConfig]="{ pageSize: 5, pageSizeOptions: [5, 10, 25] }"
>
  <ng-template snyCell="role" let-value>
    <span snyBadge [variant]="value === 'Admin' ? 'default' : 'secondary'">{{ value }}</span>
  </ng-template>
  <ng-template snyBulkActions let-selected>
    <button snyBtn variant="destructive" size="sm">Delete ({{ selected.length }})</button>
  </ng-template>
  <ng-template snyRowExpand let-row>
    <div class="p-4">Details for {{ row['name'] }} ({{ row['email'] }})</div>
  </ng-template>
</sny-data-table>`;

  readonly props = computed<PropDef[]>(() => [
    { name: 'columns', type: 'DataTableColumn[]', default: '(required)', description: this.t().propDescriptions.columns },
    { name: 'data', type: 'Record<string, unknown>[]', default: '(required)', description: this.t().propDescriptions.data },
    { name: 'variant', type: "'default' | 'striped' | 'bordered'", default: "'default'", description: this.t().propDescriptions.variant },
    { name: 'density', type: "'compact' | 'normal' | 'comfortable'", default: "'normal'", description: this.t().propDescriptions.density },
    { name: 'hoverable', type: 'boolean', default: 'true', description: this.t().propDescriptions.hoverable },
    { name: 'stickyHeader', type: 'boolean', default: 'false', description: this.t().propDescriptions.stickyHeader },
    { name: 'selectable', type: 'boolean', default: 'false', description: this.t().propDescriptions.selectable },
    { name: 'paginated', type: 'boolean', default: 'true', description: this.t().propDescriptions.paginated },
    { name: 'filterable', type: 'boolean', default: 'true', description: this.t().propDescriptions.filterable },
    { name: 'showExport', type: 'boolean', default: 'false', description: this.t().propDescriptions.showExport },
    { name: 'showColumnToggle', type: 'boolean', default: 'false', description: this.t().propDescriptions.showColumnToggle },
    { name: 'expandable', type: 'boolean', default: 'false', description: this.t().propDescriptions.expandable },
    { name: 'loading', type: 'boolean', default: 'false', description: this.t().propDescriptions.loading },
    { name: 'loadingRows', type: 'number', default: '5', description: this.t().propDescriptions.loadingRows },
    { name: 'paginationConfig', type: 'DataTablePaginationConfig', default: '{ pageSize: 10, ... }', description: this.t().propDescriptions.paginationConfig },
    { name: 'trackBy', type: 'string', default: "''", description: this.t().propDescriptions.trackBy },
    { name: 'noDataText', type: 'string', default: "'No data available'", description: this.t().propDescriptions.noDataText },
    { name: 'labels', type: 'DataTableLabels', default: '{}', description: this.t().propDescriptions.labels },
    { name: 'selectedRows', type: 'Record<string, unknown>[]', default: '[]', description: this.t().propDescriptions.selectedRows },
    { name: 'sortChanged', type: 'output<SortState>', default: '—', description: this.t().propDescriptions.sortChanged },
    { name: 'rowClicked', type: 'output<Record<string, unknown>>', default: '—', description: this.t().propDescriptions.rowClicked },
    { name: 'dataExported', type: 'output<Record<string, unknown>[]>', default: '—', description: this.t().propDescriptions.dataExported },
  ]);
}
