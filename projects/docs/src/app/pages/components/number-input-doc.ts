import { Component, computed, inject, signal } from '@angular/core';
import { CodeBlockComponent } from '../../shared/code-block';
import { ComponentPreviewComponent } from '../../shared/component-preview';
import { PropsTableComponent, type PropDef } from '../../shared/props-table';
import { SnyNumberInputComponent } from 'core';
import { I18nService } from '../../i18n/i18n.service';
import { NUMBER_INPUT_DOC_EN } from '../../i18n/en/pages/number-input-doc';
import { NUMBER_INPUT_DOC_ES } from '../../i18n/es/pages/number-input-doc';

@Component({
  selector: 'docs-number-input-doc',
  standalone: true,
  imports: [CodeBlockComponent, ComponentPreviewComponent, PropsTableComponent, SnyNumberInputComponent],
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
          <div class="space-y-2 text-center">
            <sny-number-input [(value)]="basicNum" />
            <p class="text-sm text-muted-foreground">Value: {{ basicNum() }}</p>
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Min / Max / Step</h2>
        <docs-component-preview [code]="constraintsCode" language="markup">
          <div class="space-y-2 text-center">
            <sny-number-input [(value)]="constrained" [min]="0" [max]="100" [step]="5" />
            <p class="text-sm text-muted-foreground">Value: {{ constrained() }} (0–100, step 5)</p>
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.sizes }}</h2>
        <docs-component-preview [code]="sizesCode" language="markup">
          <div class="flex items-end gap-4">
            <sny-number-input [(value)]="smNum" size="sm" />
            <sny-number-input [(value)]="mdNum" size="md" />
            <sny-number-input [(value)]="lgNum" size="lg" />
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
export class NumberInputDocComponent {
  readonly i18n = inject(I18nService);
  readonly t = computed(() => (this.i18n.locale() === 'es' ? NUMBER_INPUT_DOC_ES : NUMBER_INPUT_DOC_EN));

  readonly basicNum = signal(0);
  readonly constrained = signal(50);
  readonly smNum = signal(0);
  readonly mdNum = signal(0);
  readonly lgNum = signal(0);

  importCode = `import { SnyNumberInputComponent } from '@sonny-ui/core';`;
  basicCode = `<sny-number-input [(value)]="count" />`;
  constraintsCode = `<sny-number-input [(value)]="count" [min]="0" [max]="100" [step]="5" />`;
  sizesCode = `<sny-number-input size="sm" />
<sny-number-input size="md" />
<sny-number-input size="lg" />`;

  readonly props = computed<PropDef[]>(() => [
    { name: 'value', type: 'number', default: '0', description: this.t().propDescriptions.value },
    { name: 'min', type: 'number | null', default: 'null', description: this.t().propDescriptions.min },
    { name: 'max', type: 'number | null', default: 'null', description: this.t().propDescriptions.max },
    { name: 'step', type: 'number', default: '1', description: this.t().propDescriptions.step },
    { name: 'disabled', type: 'boolean', default: 'false', description: this.t().propDescriptions.disabled },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: this.t().propDescriptions.size },
    { name: 'placeholder', type: 'string', default: "''", description: this.t().propDescriptions.placeholder },
  ]);
}
