import { Component, signal } from '@angular/core';
import { CodeBlockComponent } from '../../shared/code-block';
import { ComponentPreviewComponent } from '../../shared/component-preview';
import { PropsTableComponent, type PropDef } from '../../shared/props-table';
import {
  SnyTableDirective,
  SnyTableHeaderDirective,
  SnyTableBodyDirective,
  SnyTableRowDirective,
  SnyTableHeadDirective,
  SnyTableCellDirective,
  SnyTableFooterDirective,
  SnyBadgeDirective,
  SnyButtonDirective,
  type TableVariant,
  type TableDensity,
} from 'core';

@Component({
  selector: 'docs-table-doc',
  standalone: true,
  imports: [
    CodeBlockComponent, ComponentPreviewComponent, PropsTableComponent,
    SnyTableDirective, SnyTableHeaderDirective, SnyTableBodyDirective,
    SnyTableRowDirective, SnyTableHeadDirective, SnyTableCellDirective,
    SnyTableFooterDirective,
    SnyBadgeDirective, SnyButtonDirective,
  ],
  template: `
    <div class="space-y-8">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Table</h1>
        <p class="text-muted-foreground mt-2">A highly customizable table with variants, density, and interactive features.</p>
      </div>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Import</h2>
        <docs-code-block [code]="importCode" language="typescript" />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Usage</h2>
        <docs-component-preview [code]="basicCode" language="markup">
          <div class="w-full overflow-auto">
            <table snyTable>
              <thead snyTableHeader>
                <tr snyTableRow>
                  <th snyTableHead>Invoice</th>
                  <th snyTableHead>Status</th>
                  <th snyTableHead>Method</th>
                  <th snyTableHead align="right">Amount</th>
                </tr>
              </thead>
              <tbody snyTableBody>
                @for (inv of invoices; track inv.id) {
                  <tr snyTableRow>
                    <td snyTableCell class="font-medium">{{ inv.id }}</td>
                    <td snyTableCell>
                      <span snyBadge [variant]="inv.status === 'Paid' ? 'default' : inv.status === 'Pending' ? 'secondary' : 'destructive'">{{ inv.status }}</span>
                    </td>
                    <td snyTableCell>{{ inv.method }}</td>
                    <td snyTableCell align="right">{{ inv.amount }}</td>
                  </tr>
                }
              </tbody>
              <tfoot snyTableFooter>
                <tr snyTableRow>
                  <td snyTableCell colspan="3">Total</td>
                  <td snyTableCell align="right" class="font-bold">$2,500.00</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Interactive Example</h2>
        <p class="text-sm text-muted-foreground">Toggle table features interactively.</p>
        <docs-component-preview [code]="interactiveCode" language="typescript">
          <div class="w-full space-y-4">
            <div class="flex flex-wrap gap-2">
              @for (v of variants; track v) {
                <button snyBtn [variant]="variant() === v ? 'default' : 'outline'" size="sm" (click)="variant.set(v)">{{ v }}</button>
              }
              <span class="text-xs text-muted-foreground self-center mx-2">|</span>
              @for (d of densities; track d) {
                <button snyBtn [variant]="density() === d ? 'default' : 'outline'" size="sm" (click)="density.set(d)">{{ d }}</button>
              }
              <span class="text-xs text-muted-foreground self-center mx-2">|</span>
              <button snyBtn [variant]="hoverable() ? 'default' : 'outline'" size="sm" (click)="hoverable.set(!hoverable())">Hover</button>
              <button snyBtn [variant]="stickyHeader() ? 'default' : 'outline'" size="sm" (click)="stickyHeader.set(!stickyHeader())">Sticky</button>
            </div>
            <div class="overflow-auto max-h-64 border border-border rounded-sm">
              <table snyTable [variant]="variant()" [density]="density()" [hoverable]="hoverable()" [stickyHeader]="stickyHeader()">
                <thead snyTableHeader>
                  <tr snyTableRow>
                    <th snyTableHead>Invoice</th>
                    <th snyTableHead>Status</th>
                    <th snyTableHead>Method</th>
                    <th snyTableHead align="right">Amount</th>
                  </tr>
                </thead>
                <tbody snyTableBody>
                  @for (inv of allInvoices; track inv.id) {
                    <tr snyTableRow>
                      <td snyTableCell class="font-medium">{{ inv.id }}</td>
                      <td snyTableCell>
                        <span snyBadge [variant]="inv.status === 'Paid' ? 'default' : inv.status === 'Pending' ? 'secondary' : 'destructive'">{{ inv.status }}</span>
                      </td>
                      <td snyTableCell>{{ inv.method }}</td>
                      <td snyTableCell align="right">{{ inv.amount }}</td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">API Reference</h2>
        <h3 class="text-lg font-medium">Table (root)</h3>
        <docs-props-table [props]="tableProps" />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Directives</h2>
        <ul class="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
          <li><code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">snyTable</code> — Root table element</li>
          <li><code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">snyTableHeader</code> — Table header (thead)</li>
          <li><code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">snyTableBody</code> — Table body (tbody)</li>
          <li><code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">snyTableRow</code> — Table row (tr)</li>
          <li><code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">snyTableHead</code> — Header cell (th)</li>
          <li><code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">snyTableCell</code> — Data cell (td)</li>
          <li><code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">snyTableFooter</code> — Table footer (tfoot)</li>
          <li><code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">snyTableCaption</code> — Table caption</li>
        </ul>
      </section>
    </div>
  `,
})
export class TableDocComponent {
  readonly variant = signal<TableVariant>('default');
  readonly density = signal<TableDensity>('normal');
  readonly hoverable = signal(true);
  readonly stickyHeader = signal(false);

  variants: TableVariant[] = ['default', 'striped', 'bordered'];
  densities: TableDensity[] = ['compact', 'normal', 'comfortable'];

  invoices = [
    { id: 'INV001', status: 'Paid', method: 'Credit Card', amount: '$250.00' },
    { id: 'INV002', status: 'Pending', method: 'PayPal', amount: '$150.00' },
    { id: 'INV003', status: 'Unpaid', method: 'Bank Transfer', amount: '$350.00' },
    { id: 'INV004', status: 'Paid', method: 'Credit Card', amount: '$450.00' },
    { id: 'INV005', status: 'Paid', method: 'PayPal', amount: '$550.00' },
    { id: 'INV006', status: 'Pending', method: 'Credit Card', amount: '$200.00' },
    { id: 'INV007', status: 'Paid', method: 'Bank Transfer', amount: '$500.00' },
  ];

  allInvoices = [
    ...this.invoices,
    { id: 'INV008', status: 'Paid', method: 'Credit Card', amount: '$120.00' },
    { id: 'INV009', status: 'Pending', method: 'PayPal', amount: '$380.00' },
    { id: 'INV010', status: 'Unpaid', method: 'Bank Transfer', amount: '$220.00' },
    { id: 'INV011', status: 'Paid', method: 'Credit Card', amount: '$640.00' },
    { id: 'INV012', status: 'Pending', method: 'PayPal', amount: '$175.00' },
  ];

  importCode = `import {
  SnyTableDirective,
  SnyTableHeaderDirective,
  SnyTableBodyDirective,
  SnyTableRowDirective,
  SnyTableHeadDirective,
  SnyTableCellDirective,
  SnyTableFooterDirective,
  SnyTableCaptionDirective,
} from '@sonny-ui/core';`;

  basicCode = `<table snyTable>
  <thead snyTableHeader>
    <tr snyTableRow>
      <th snyTableHead>Invoice</th>
      <th snyTableHead>Status</th>
      <th snyTableHead align="right">Amount</th>
    </tr>
  </thead>
  <tbody snyTableBody>
    <tr snyTableRow>
      <td snyTableCell>INV001</td>
      <td snyTableCell><span snyBadge>Paid</span></td>
      <td snyTableCell align="right">$250.00</td>
    </tr>
  </tbody>
</table>`;

  interactiveCode = `readonly variant = signal<TableVariant>('default');
readonly density = signal<TableDensity>('normal');
readonly hoverable = signal(true);
readonly stickyHeader = signal(false);

<table snyTable [variant]="variant()" [density]="density()"
       [hoverable]="hoverable()" [stickyHeader]="stickyHeader()">
  ...
</table>`;

  tableProps: PropDef[] = [
    { name: 'variant', type: "'default' | 'striped' | 'bordered'", default: "'default'", description: 'Visual variant of the table.' },
    { name: 'density', type: "'compact' | 'normal' | 'comfortable'", default: "'normal'", description: 'Cell padding density.' },
    { name: 'hoverable', type: 'boolean', default: 'false', description: 'Enable row hover effect.' },
    { name: 'stickyHeader', type: 'boolean', default: 'false', description: 'Make the header sticky on scroll.' },
    { name: 'class', type: 'string', default: "''", description: 'Additional CSS classes to apply.' },
  ];
}
