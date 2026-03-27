import { Component, signal } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { SnyDataTableComponent } from './data-table.component';
import {
  SnyCellDefDirective,
  SnyHeaderCellDefDirective,
  SnyBulkActionsDefDirective,
  SnyRowExpandDefDirective,
} from './data-table.directives';
import type { DataTableColumn } from './data-table.types';

const COLUMNS: DataTableColumn[] = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email' },
  { key: 'age', label: 'Age', sortable: true },
];

function generateRows(count: number): Record<string, unknown>[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `User ${String(i + 1).padStart(2, '0')}`,
    email: `user${i + 1}@test.com`,
    age: 20 + (i % 40),
  }));
}

// Basic test host
@Component({
  standalone: true,
  imports: [SnyDataTableComponent],
  template: `
    <sny-data-table
      [columns]="columns()"
      [data]="data()"
      [selectable]="selectable()"
      [paginated]="paginated()"
      [filterable]="filterable()"
      [paginationConfig]="paginationConfig()"
      [noDataText]="noDataText()"
      [trackBy]="'id'"
      [(selectedRows)]="selectedRows"
      (sortChanged)="lastSort = $event"
      (rowClicked)="lastRow = $event"
    />
  `,
})
class TestHostComponent {
  columns = signal(COLUMNS);
  data = signal(generateRows(5));
  selectable = signal(false);
  paginated = signal(false);
  filterable = signal(true);
  paginationConfig = signal({ pageSize: 10, pageSizeOptions: [5, 10, 25] });
  noDataText = signal('No data available');
  selectedRows = signal<Record<string, unknown>[]>([]);
  lastSort: unknown = null;
  lastRow: unknown = null;
}

// Enhanced test host with templates
@Component({
  standalone: true,
  imports: [
    SnyDataTableComponent,
    SnyCellDefDirective,
    SnyHeaderCellDefDirective,
    SnyBulkActionsDefDirective,
    SnyRowExpandDefDirective,
  ],
  template: `
    <sny-data-table
      [columns]="columns()"
      [data]="data()"
      [selectable]="selectable()"
      [expandable]="expandable()"
      [loading]="loading()"
      [loadingRows]="loadingRows()"
      [showColumnToggle]="showColumnToggle()"
      [paginated]="false"
      [filterable]="false"
      [trackBy]="'id'"
      [(selectedRows)]="selectedRows"
    >
      <ng-template snyCell="name" let-value let-row="row">
        <span class="custom-cell">{{ value }}</span>
      </ng-template>
      <ng-template snyHeaderCell="name" let-col>
        <span class="custom-header">{{ col.label }}</span>
      </ng-template>
      <ng-template snyBulkActions let-selected>
        <button class="bulk-action-btn">Delete ({{ selected.length }})</button>
      </ng-template>
      <ng-template snyRowExpand let-row>
        <div class="expand-content">Details for {{ row['name'] }}</div>
      </ng-template>
    </sny-data-table>
  `,
})
class EnhancedTestHostComponent {
  columns = signal(COLUMNS);
  data = signal(generateRows(5));
  selectable = signal(false);
  expandable = signal(false);
  loading = signal(false);
  loadingRows = signal(5);
  showColumnToggle = signal(false);
  selectedRows = signal<Record<string, unknown>[]>([]);
}

describe('SnyDataTableComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
    el = fixture.nativeElement;
  });

  it('should render column headers', () => {
    const headers = el.querySelectorAll('th');
    expect(headers.length).toBe(3);
    expect(headers[0].textContent).toContain('Name');
    expect(headers[1].textContent).toContain('Email');
    expect(headers[2].textContent).toContain('Age');
  });

  it('should render data rows', () => {
    const rows = el.querySelectorAll('tbody tr');
    expect(rows.length).toBe(5);
    expect(rows[0].textContent).toContain('User 01');
  });

  it('should sort ascending on header click', () => {
    host.data.set([
      { id: 1, name: 'Charlie', email: 'c@t.com', age: 30 },
      { id: 2, name: 'Alice', email: 'a@t.com', age: 25 },
      { id: 3, name: 'Bob', email: 'b@t.com', age: 35 },
    ]);
    fixture.detectChanges();

    const nameHeader = el.querySelector('th') as HTMLElement;
    nameHeader.click();
    fixture.detectChanges();

    const firstCell = el.querySelector('tbody tr td');
    expect(firstCell?.textContent).toContain('Alice');
  });

  it('should sort descending on second click', () => {
    host.data.set([
      { id: 1, name: 'Charlie', email: 'c@t.com', age: 30 },
      { id: 2, name: 'Alice', email: 'a@t.com', age: 25 },
      { id: 3, name: 'Bob', email: 'b@t.com', age: 35 },
    ]);
    fixture.detectChanges();

    const nameHeader = el.querySelector('th') as HTMLElement;
    nameHeader.click();
    fixture.detectChanges();
    nameHeader.click();
    fixture.detectChanges();

    const firstCell = el.querySelector('tbody tr td');
    expect(firstCell?.textContent).toContain('Charlie');
  });

  it('should clear sort on third click', () => {
    host.data.set([
      { id: 1, name: 'Charlie', email: 'c@t.com', age: 30 },
      { id: 2, name: 'Alice', email: 'a@t.com', age: 25 },
    ]);
    fixture.detectChanges();

    const nameHeader = el.querySelector('th') as HTMLElement;
    nameHeader.click();
    fixture.detectChanges();
    nameHeader.click();
    fixture.detectChanges();
    nameHeader.click();
    fixture.detectChanges();

    const firstCell = el.querySelector('tbody tr td');
    expect(firstCell?.textContent).toContain('Charlie');
  });

  it('should filter rows by text', () => {
    fixture.detectChanges();
    const input = el.querySelector('input[snyinput]') as HTMLInputElement;
    input.value = 'User 01';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const rows = el.querySelectorAll('tbody tr');
    expect(rows.length).toBe(1);
    expect(rows[0].textContent).toContain('User 01');
  });

  it('should show correct pagination page count', () => {
    host.data.set(generateRows(25));
    host.paginated.set(true);
    host.paginationConfig.set({ pageSize: 10, pageSizeOptions: [10, 25] });
    fixture.detectChanges();

    const rows = el.querySelectorAll('tbody tr');
    expect(rows.length).toBe(10);
  });

  it('should navigate pagination', () => {
    host.data.set(generateRows(25));
    host.paginated.set(true);
    host.paginationConfig.set({ pageSize: 10, pageSizeOptions: [10, 25] });
    fixture.detectChanges();

    const nextBtn = el.querySelector('sny-pagination button:last-child') as HTMLButtonElement;
    nextBtn.click();
    fixture.detectChanges();

    const firstCell = el.querySelector('tbody tr td');
    expect(firstCell?.textContent).toContain('User 11');
  });

  it('should select row with checkbox', () => {
    host.selectable.set(true);
    fixture.detectChanges();

    const checkboxes = el.querySelectorAll('tbody input[type="checkbox"]');
    (checkboxes[0] as HTMLInputElement).click();
    fixture.detectChanges();

    expect(host.selectedRows().length).toBe(1);
    expect(host.selectedRows()[0]['name']).toBe('User 01');
  });

  it('should select all with header checkbox', () => {
    host.selectable.set(true);
    fixture.detectChanges();

    const headerCheckbox = el.querySelector('thead input[type="checkbox"]') as HTMLInputElement;
    headerCheckbox.click();
    fixture.detectChanges();

    expect(host.selectedRows().length).toBe(5);
  });

  it('should emit rowClicked on row click', () => {
    fixture.detectChanges();
    const firstRow = el.querySelector('tbody tr') as HTMLElement;
    firstRow.click();
    fixture.detectChanges();

    expect(host.lastRow).toBeTruthy();
    expect((host.lastRow as Record<string, unknown>)['name']).toBe('User 01');
  });

  it('should show empty state text', () => {
    host.data.set([]);
    host.noDataText.set('Nothing here');
    fixture.detectChanges();

    const cell = el.querySelector('tbody td');
    expect(cell?.textContent).toContain('Nothing here');
  });

  it('should reset page to 1 on filter', () => {
    host.data.set(generateRows(25));
    host.paginated.set(true);
    host.paginationConfig.set({ pageSize: 10, pageSizeOptions: [10] });
    fixture.detectChanges();

    const nextBtn = el.querySelector('sny-pagination button:last-child') as HTMLButtonElement;
    nextBtn.click();
    fixture.detectChanges();

    const input = el.querySelector('input[snyinput]') as HTMLInputElement;
    input.value = 'User 0';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const firstCell = el.querySelector('tbody tr td');
    expect(firstCell?.textContent).toContain('User 0');
  });
});

describe('SnyDataTableComponent (enhanced)', () => {
  let fixture: ComponentFixture<EnhancedTestHostComponent>;
  let host: EnhancedTestHostComponent;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnhancedTestHostComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(EnhancedTestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
    el = fixture.nativeElement;
  });

  // Custom Cell Templates
  it('should render custom cell template', () => {
    const customCell = el.querySelector('tbody .custom-cell');
    expect(customCell).toBeTruthy();
    expect(customCell?.textContent).toContain('User 01');
  });

  it('should fall back to plain text for columns without custom template', () => {
    const cells = el.querySelectorAll('tbody tr:first-child td');
    // email column (index 1) should not have .custom-cell
    expect(cells[1].querySelector('.custom-cell')).toBeNull();
    expect(cells[1].textContent).toContain('user1@test.com');
  });

  // Custom Header Templates
  it('should render custom header template', () => {
    const customHeader = el.querySelector('thead .custom-header');
    expect(customHeader).toBeTruthy();
    expect(customHeader?.textContent).toContain('Name');
  });

  it('should fall back to default header for columns without custom template', () => {
    const headers = el.querySelectorAll('th');
    // Email header (index 1) should not have .custom-header
    expect(headers[1].querySelector('.custom-header')).toBeNull();
    expect(headers[1].textContent).toContain('Email');
  });

  // Loading State
  it('should show skeleton rows when loading', () => {
    host.loading.set(true);
    fixture.detectChanges();

    const skeletons = el.querySelectorAll('[aria-busy="true"]');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('should show correct number of skeleton rows', () => {
    host.loading.set(true);
    host.loadingRows.set(3);
    fixture.detectChanges();

    const rows = el.querySelectorAll('tbody tr');
    expect(rows.length).toBe(3);
  });

  it('should show data when loading is false', () => {
    host.loading.set(false);
    fixture.detectChanges();

    const rows = el.querySelectorAll('tbody tr');
    expect(rows.length).toBe(5);
    expect(rows[0].textContent).toContain('User 01');
  });

  // Bulk Actions
  it('should not show bulk actions when no rows selected', () => {
    host.selectable.set(true);
    fixture.detectChanges();

    const bulkBar = el.querySelector('.bulk-action-btn');
    expect(bulkBar).toBeNull();
  });

  it('should show bulk actions when rows selected and template provided', () => {
    host.selectable.set(true);
    fixture.detectChanges();

    const checkbox = el.querySelector('tbody input[type="checkbox"]') as HTMLInputElement;
    checkbox.click();
    fixture.detectChanges();

    const bulkBtn = el.querySelector('.bulk-action-btn');
    expect(bulkBtn).toBeTruthy();
    expect(bulkBtn?.textContent).toContain('Delete (1)');
  });

  it('should update bulk actions context when selection changes', () => {
    host.selectable.set(true);
    fixture.detectChanges();

    const checkboxes = el.querySelectorAll('tbody input[type="checkbox"]');
    (checkboxes[0] as HTMLInputElement).click();
    fixture.detectChanges();
    (checkboxes[1] as HTMLInputElement).click();
    fixture.detectChanges();

    const bulkBtn = el.querySelector('.bulk-action-btn');
    expect(bulkBtn?.textContent).toContain('Delete (2)');
  });

  // Row Expansion
  it('should show expand button when expandable', () => {
    host.expandable.set(true);
    fixture.detectChanges();

    const expandBtns = el.querySelectorAll('tbody tr button');
    expect(expandBtns.length).toBeGreaterThan(0);
  });

  it('should toggle expanded content on click', () => {
    host.expandable.set(true);
    fixture.detectChanges();

    let expandContent = el.querySelector('.expand-content');
    expect(expandContent).toBeNull();

    const expandBtn = el.querySelector('tbody tr button') as HTMLElement;
    expandBtn.click();
    fixture.detectChanges();

    expandContent = el.querySelector('.expand-content');
    expect(expandContent).toBeTruthy();
    expect(expandContent?.textContent).toContain('Details for User 01');
  });

  it('should collapse expanded row on second click', () => {
    host.expandable.set(true);
    fixture.detectChanges();

    const expandBtn = el.querySelector('tbody tr button') as HTMLElement;
    expandBtn.click();
    fixture.detectChanges();
    expandBtn.click();
    fixture.detectChanges();

    const expandContent = el.querySelector('.expand-content');
    expect(expandContent).toBeNull();
  });

  // Column Visibility
  it('should show column toggle when enabled', () => {
    host.showColumnToggle.set(true);
    fixture.detectChanges();

    const toggleBtn = el.querySelector('[snydropdowntrigger]');
    expect(toggleBtn).toBeTruthy();
  });
});
