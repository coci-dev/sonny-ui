import { Component, computed, inject, signal } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';
import { CodeBlockComponent } from '../../shared/code-block';
import { ComponentPreviewComponent } from '../../shared/component-preview';
import { PropsTableComponent, type PropDef } from '../../shared/props-table';
import {
  SnyButtonDirective,
  SnySheetService,
  SNY_SHEET_DATA,
  SnySheetHeaderDirective,
  SnySheetTitleDirective,
  SnySheetDescriptionDirective,
  SnySheetContentDirective,
  SnySheetCloseDirective,
} from 'core';
import { I18nService } from '../../i18n/i18n.service';
import { SHEET_DOC_EN } from '../../i18n/en/pages/sheet-doc';
import { SHEET_DOC_ES } from '../../i18n/es/pages/sheet-doc';

interface CartItem {
  name: string;
  price: string;
  qty: number;
}

@Component({
  selector: 'docs-sheet-doc',
  standalone: true,
  imports: [CodeBlockComponent, ComponentPreviewComponent, PropsTableComponent, SnyButtonDirective],
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
        <docs-component-preview [code]="basicCode">
          <div class="flex gap-2 flex-wrap">
            <button snyBtn (click)="openSheet('right')">Open Right</button>
            <button snyBtn variant="outline" (click)="openSheet('left')">Open Left</button>
            <button snyBtn variant="outline" (click)="openSheet('top')">Open Top</button>
            <button snyBtn variant="outline" (click)="openSheet('bottom')">Open Bottom</button>
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.examples }}</h2>
        <h3 class="text-lg font-medium">{{ t().cartSheet }}</h3>
        <docs-component-preview [code]="cartCode" language="typescript">
          <button snyBtn (click)="openCart()">
            View Cart ({{ cartItems.length }})
          </button>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.apiReference }}</h2>
        <h3 class="text-lg font-medium">{{ t().snySheetService }}</h3>
        <docs-props-table [props]="serviceProps()" />
        <h3 class="text-lg font-medium mt-4">{{ t().snySheetConfig }}</h3>
        <docs-props-table [props]="configProps()" />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ t().contentDirectives }}</h2>
        <ul class="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
          @for (item of t().contentDirectivesList; track item) {
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
export class SheetDocComponent {
  readonly i18n = inject(I18nService);
  readonly t = computed(() => this.i18n.locale() === 'es' ? SHEET_DOC_ES : SHEET_DOC_EN);

  private readonly sheetService = inject(SnySheetService);

  cartItems: CartItem[] = [
    { name: 'Wireless Headphones', price: '$79.99', qty: 1 },
    { name: 'USB-C Cable', price: '$12.99', qty: 2 },
    { name: 'Laptop Stand', price: '$45.00', qty: 1 },
  ];

  importCode = `import {
  SnySheetService,
  SnySheetHeaderDirective,
  SnySheetTitleDirective,
  SnySheetDescriptionDirective,
  SnySheetContentDirective,
  SnySheetCloseDirective,
} from '@sonny-ui/core';`;

  basicCode = `const sheetService = inject(SnySheetService);

sheetService.open(MySheetComponent, { side: 'right' });`;

  cartCode = `openCart() {
  this.sheetService.open(CartSheetComponent, {
    side: 'right',
    data: this.cartItems,
  });
}`;

  readonly serviceProps = computed<PropDef[]>(() => [
    { name: 'open(component, config?)', type: 'SnySheetRef<R>', default: '-', description: this.t().servicePropDescriptions.open },
    { name: 'closeAll()', type: 'void', default: '-', description: this.t().servicePropDescriptions.closeAll },
  ]);

  readonly configProps = computed<PropDef[]>(() => [
    { name: 'side', type: "'left' | 'right' | 'top' | 'bottom'", default: "'right'", description: this.t().configPropDescriptions.side },
    { name: 'closeOnBackdrop', type: 'boolean', default: 'true', description: this.t().configPropDescriptions.closeOnBackdrop },
    { name: 'closeOnEsc', type: 'boolean', default: 'true', description: this.t().configPropDescriptions.closeOnEsc },
    { name: 'data', type: 'unknown', default: '-', description: this.t().configPropDescriptions.data },
  ]);

  openSheet(side: 'left' | 'right' | 'top' | 'bottom') {
    this.sheetService.open(DemoSheetComponent, { side, data: { side } });
  }

  openCart() {
    this.sheetService.open(CartSheetComponent, { side: 'right', data: this.cartItems });
  }
}

@Component({
  standalone: true,
  imports: [
    SnySheetHeaderDirective,
    SnySheetTitleDirective,
    SnySheetDescriptionDirective,
    SnySheetCloseDirective,
    SnyButtonDirective,
  ],
  template: `
    <div class="relative">
      <button snySheetClose class="absolute right-0 top-0">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
      </button>
      <div snySheetHeader>
        <h2 snySheetTitle>Sheet from {{ data.side }}</h2>
        <p snySheetDescription>This sheet slides from the {{ data.side }} side.</p>
      </div>
      <div class="py-6">
        <p class="text-sm text-muted-foreground">Content goes here.</p>
      </div>
      <button snyBtn (click)="dialogRef.close()">Close</button>
    </div>
  `,
})
class DemoSheetComponent {
  readonly dialogRef = inject(DialogRef);
  readonly data = inject<{ side: string }>(SNY_SHEET_DATA);
}

@Component({
  standalone: true,
  imports: [
    SnySheetHeaderDirective,
    SnySheetTitleDirective,
    SnySheetDescriptionDirective,
    SnySheetContentDirective,
    SnySheetCloseDirective,
    SnyButtonDirective,
  ],
  template: `
    <div class="relative">
      <button snySheetClose class="absolute right-0 top-0">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
      </button>
      <div snySheetHeader>
        <h2 snySheetTitle>Shopping Cart</h2>
        <p snySheetDescription>{{ items.length }} items in your cart</p>
      </div>
      <div snySheetContent>
        <div class="space-y-4">
          @for (item of items; track item.name) {
            <div class="flex items-center justify-between border-b border-border pb-3">
              <div>
                <p class="text-sm font-medium">{{ item.name }}</p>
                <p class="text-xs text-muted-foreground">Qty: {{ item.qty }}</p>
              </div>
              <p class="text-sm font-medium">{{ item.price }}</p>
            </div>
          }
        </div>
      </div>
      <div class="flex justify-end gap-2 pt-4">
        <button snyBtn variant="outline" (click)="dialogRef.close()">Continue Shopping</button>
        <button snyBtn (click)="dialogRef.close('checkout')">Checkout</button>
      </div>
    </div>
  `,
})
class CartSheetComponent {
  readonly dialogRef = inject(DialogRef);
  readonly items = inject<CartItem[]>(SNY_SHEET_DATA);
}
