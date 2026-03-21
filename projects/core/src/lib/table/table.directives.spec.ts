import { Component, signal } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import {
  SnyTableDirective,
  SnyTableHeaderDirective,
  SnyTableBodyDirective,
  SnyTableRowDirective,
  SnyTableHeadDirective,
  SnyTableCellDirective,
  SnyTableFooterDirective,
  SnyTableCaptionDirective,
} from './table.directives';
import type { TableVariant, TableDensity } from './table.variants';

@Component({
  standalone: true,
  imports: [
    SnyTableDirective, SnyTableHeaderDirective, SnyTableBodyDirective,
    SnyTableRowDirective, SnyTableHeadDirective, SnyTableCellDirective,
    SnyTableFooterDirective, SnyTableCaptionDirective,
  ],
  template: `
    <table snyTable [variant]="variant()" [density]="density()" [hoverable]="hoverable()" [stickyHeader]="stickyHeader()">
      <caption snyTableCaption>Test table</caption>
      <thead snyTableHeader>
        <tr snyTableRow>
          <th snyTableHead>Name</th>
          <th snyTableHead>Value</th>
        </tr>
      </thead>
      <tbody snyTableBody>
        <tr snyTableRow>
          <td snyTableCell>A</td>
          <td snyTableCell>1</td>
        </tr>
      </tbody>
      <tfoot snyTableFooter>
        <tr snyTableRow>
          <td snyTableCell>Total</td>
          <td snyTableCell>1</td>
        </tr>
      </tfoot>
    </table>
  `,
})
class TestHostComponent {
  variant = signal<TableVariant>('default');
  density = signal<TableDensity>('normal');
  hoverable = signal(false);
  stickyHeader = signal(false);
}

describe('Table Directives', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let table: HTMLTableElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    table = fixture.nativeElement.querySelector('table');
  });

  it('should apply base table classes', () => {
    expect(table.className).toContain('w-full');
    expect(table.className).toContain('caption-bottom');
  });

  it('should apply striped variant', () => {
    fixture.componentInstance.variant.set('striped');
    fixture.detectChanges();
    expect(table.className).toContain('nth-child');
  });

  it('should apply bordered variant', () => {
    fixture.componentInstance.variant.set('bordered');
    fixture.detectChanges();
    expect(table.className).toContain('border');
  });

  it('should apply compact density to cells', () => {
    fixture.componentInstance.density.set('compact');
    fixture.detectChanges();
    const th = fixture.nativeElement.querySelector('th');
    expect(th.className).toContain('px-2');
    expect(th.className).toContain('text-xs');
  });

  it('should apply hoverable to rows', () => {
    fixture.componentInstance.hoverable.set(true);
    fixture.detectChanges();
    const row = fixture.nativeElement.querySelector('tbody tr');
    expect(row.className).toContain('hover:bg-muted/50');
  });

  it('should apply sticky header', () => {
    fixture.componentInstance.stickyHeader.set(true);
    fixture.detectChanges();
    const thead = fixture.nativeElement.querySelector('thead');
    expect(thead.className).toContain('sticky');
  });

  it('should render caption', () => {
    const caption = fixture.nativeElement.querySelector('caption');
    expect(caption.className).toContain('text-muted-foreground');
    expect(caption.textContent).toContain('Test table');
  });
});
