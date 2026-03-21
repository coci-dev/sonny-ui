import { Component, signal } from '@angular/core';
import { CodeBlockComponent } from '../../shared/code-block';
import { ComponentPreviewComponent } from '../../shared/component-preview';
import { PropsTableComponent, type PropDef } from '../../shared/props-table';
import { SnyRadioDirective, SnyLabelDirective } from 'core';

@Component({
  selector: 'docs-radio-doc',
  standalone: true,
  imports: [CodeBlockComponent, ComponentPreviewComponent, PropsTableComponent, SnyRadioDirective, SnyLabelDirective],
  template: `
    <div class="space-y-8">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Radio</h1>
        <p class="text-muted-foreground mt-2">A control that allows the user to select one option from a set.</p>
      </div>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Import</h2>
        <docs-code-block [code]="importCode" language="typescript" />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Usage</h2>
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
        <h2 class="text-xl font-semibold">Sizes</h2>
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
        <h2 class="text-xl font-semibold">API Reference</h2>
        <docs-props-table [props]="props" />
      </section>
    </div>
  `,
})
export class RadioDocComponent {
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

  props: PropDef[] = [
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'The size of the radio button.' },
    { name: 'class', type: 'string', default: "''", description: 'Additional CSS classes to apply.' },
  ];
}
