import { Component, computed, inject, signal } from '@angular/core';
import { CodeBlockComponent } from '../../shared/code-block';
import { ComponentPreviewComponent } from '../../shared/component-preview';
import { PropsTableComponent, type PropDef } from '../../shared/props-table';
import { SnyRadioDirective, SnyLabelDirective } from 'core';
import { I18nService } from '../../i18n/i18n.service';
import { RADIO_DOC_EN } from '../../i18n/en/pages/radio-doc';
import { RADIO_DOC_ES } from '../../i18n/es/pages/radio-doc';

@Component({
  selector: 'docs-radio-doc',
  standalone: true,
  imports: [CodeBlockComponent, ComponentPreviewComponent, PropsTableComponent, SnyRadioDirective, SnyLabelDirective],
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
          <div class="space-y-3">
            @for (opt of paymentOptions; track opt.value) {
              <div class="flex items-center gap-2">
                <input
                  type="radio"
                  snyRadio
                  name="payment"
                  [id]="'pay-' + opt.value"
                  [value]="opt.value"
                  [checked]="selectedPayment() === opt.value"
                  (change)="selectedPayment.set(opt.value)"
                />
                <label snyLabel [for]="'pay-' + opt.value">{{ opt.label }}</label>
              </div>
            }
            <p class="text-sm text-muted-foreground">Selected: {{ selectedPayment() }}</p>
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.sizes }}</h2>
        <docs-component-preview [code]="sizesCode">
          <div class="flex items-center gap-6">
            <div class="flex items-center gap-2">
              <input type="radio" snyRadio size="sm" name="size-demo" id="r-sm" checked />
              <label snyLabel for="r-sm">Small</label>
            </div>
            <div class="flex items-center gap-2">
              <input type="radio" snyRadio size="md" name="size-demo" id="r-md" />
              <label snyLabel for="r-md">Medium</label>
            </div>
            <div class="flex items-center gap-2">
              <input type="radio" snyRadio size="lg" name="size-demo" id="r-lg" />
              <label snyLabel for="r-lg">Large</label>
            </div>
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.apiReference }}</h2>
        <docs-props-table [props]="props()" />
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
export class RadioDocComponent {
  readonly i18n = inject(I18nService);
  readonly t = computed(() => this.i18n.locale() === 'es' ? RADIO_DOC_ES : RADIO_DOC_EN);

  readonly selectedPayment = signal('card');

  paymentOptions = [
    { value: 'card', label: 'Credit Card' },
    { value: 'paypal', label: 'PayPal' },
    { value: 'bank', label: 'Bank Transfer' },
  ];

  importCode = `import { SnyRadioDirective } from '@sonny-ui/core';`;
  basicCode = `<input type="radio" snyRadio name="payment" value="card"
       [checked]="selected() === 'card'"
       (change)="selected.set('card')" />`;
  sizesCode = `<input type="radio" snyRadio size="sm" />
<input type="radio" snyRadio size="md" />
<input type="radio" snyRadio size="lg" />`;

  readonly props = computed<PropDef[]>(() => [
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: this.t().propDescriptions.size },
    { name: 'class', type: 'string', default: "''", description: this.t().propDescriptions.class },
  ]);
}
