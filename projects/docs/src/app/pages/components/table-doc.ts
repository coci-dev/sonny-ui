import { Component, computed, inject, signal } from '@angular/core';
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
import { I18nService } from '../../i18n/i18n.service';
import { TABLE_DOC_EN } from '../../i18n/en/pages/table-doc';
import { TABLE_DOC_ES } from '../../i18n/es/pages/table-doc';

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
        <h1 class="text-3xl font-bold tracking-tight">{{ t().title }}</h1>
        <p class="text-muted-foreground mt-2">{{ t().description }}</p>
      </div>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.import }}</h2>
        <docs-code-block [code]="importCode" language="typescript" />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.usage }}</h2>
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
        <h2 class="text-xl font-semibold">{{ t().interactiveExample }}</h2>
        <p class="text-sm text-muted-foreground">{{ t().interactiveExampleDesc }}</p>
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
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.apiReference }}</h2>
        <h3 class="text-lg font-medium">{{ t().tableRoot }}</h3>
        <docs-props-table [props]="tableProps()" />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ t().directives }}</h2>
        <ul class="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
          @for (item of t().directivesList; track item) {
            <li [innerHTML]="item"></li>
          }
        </ul>
      </section>

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
export class TableDocComponent {
  readonly i18n = inject(I18nService);
  readonly t = computed(() => this.i18n.locale() === 'es' ? TABLE_DOC_ES : TABLE_DOC_EN);

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

  readonly tableProps = computed<PropDef[]>(() => [
    { name: 'variant', type: "'default' | 'striped' | 'bordered'", default: "'default'", description: this.t().propDescriptions.variant },
    { name: 'density', type: "'compact' | 'normal' | 'comfortable'", default: "'normal'", description: this.t().propDescriptions.density },
    { name: 'hoverable', type: 'boolean', default: 'false', description: this.t().propDescriptions.hoverable },
    { name: 'stickyHeader', type: 'boolean', default: 'false', description: this.t().propDescriptions.stickyHeader },
    { name: 'class', type: 'string', default: "''", description: this.t().propDescriptions.class },
  ]);
}
