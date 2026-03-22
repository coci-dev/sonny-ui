import { Component, computed, inject, signal } from '@angular/core';
import { CodeBlockComponent } from '../../shared/code-block';
import { ComponentPreviewComponent } from '../../shared/component-preview';
import { PropsTableComponent, type PropDef } from '../../shared/props-table';
import { SnyProgressComponent, type ProgressVariant } from 'core';
import { I18nService } from '../../i18n/i18n.service';
import { PROGRESS_DOC_EN } from '../../i18n/en/pages/progress-doc';
import { PROGRESS_DOC_ES } from '../../i18n/es/pages/progress-doc';

@Component({
  selector: 'docs-progress-doc',
  standalone: true,
  imports: [CodeBlockComponent, ComponentPreviewComponent, PropsTableComponent, SnyProgressComponent],
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
          <sny-progress [value]="60" />
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.variants }}</h2>
        <docs-component-preview [code]="variantsCode">
          <div class="space-y-4 w-full">
            @for (v of variants; track v) {
              <sny-progress [value]="65" [variant]="v" [label]="v" />
            }
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.sizes }}</h2>
        <docs-component-preview [code]="sizesCode">
          <div class="space-y-4 w-full">
            <sny-progress [value]="50" size="sm" label="Small" />
            <sny-progress [value]="50" size="md" label="Medium" />
            <sny-progress [value]="50" size="lg" label="Large" />
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.examples }}</h2>
        <h3 class="text-lg font-medium">{{ t().indeterminateExample }}</h3>
        <docs-component-preview [code]="indeterminateCode">
          <sny-progress [indeterminate]="true" label="Loading..." />
        </docs-component-preview>

        <h3 class="text-lg font-medium">{{ t().interactiveExample }}</h3>
        <docs-component-preview [code]="interactiveCode">
          <div class="space-y-4 w-full">
            <sny-progress [value]="progressValue()" variant="success" label="Upload progress" />
            <div class="flex gap-2">
              <button class="text-sm underline text-muted-foreground hover:text-foreground" (click)="decrementProgress()">-10</button>
              <span class="text-sm text-muted-foreground">{{ progressValue() }}%</span>
              <button class="text-sm underline text-muted-foreground hover:text-foreground" (click)="incrementProgress()">+10</button>
            </div>
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.apiReference }}</h2>
        <docs-props-table [props]="props()" />
      </section>
    </div>
  `,
})
export class ProgressDocComponent {
  readonly i18n = inject(I18nService);
  readonly t = computed(() => (this.i18n.locale() === 'es' ? PROGRESS_DOC_ES : PROGRESS_DOC_EN));

  variants: ProgressVariant[] = ['default', 'success', 'warning', 'error', 'info'];
  readonly progressValue = signal(40);

  incrementProgress(): void {
    this.progressValue.update((v) => Math.min(100, v + 10));
  }

  decrementProgress(): void {
    this.progressValue.update((v) => Math.max(0, v - 10));
  }

  importCode = `import { SnyProgressComponent } from '@sonny-ui/core';`;
  basicCode = `<sny-progress [value]="60" />`;
  variantsCode = `<sny-progress [value]="65" variant="success" />
<sny-progress [value]="65" variant="warning" />
<sny-progress [value]="65" variant="error" />`;
  sizesCode = `<sny-progress [value]="50" size="sm" />
<sny-progress [value]="50" size="md" />
<sny-progress [value]="50" size="lg" />`;
  indeterminateCode = `<sny-progress [indeterminate]="true" label="Loading..." />`;
  interactiveCode = `readonly progressValue = signal(40);

<sny-progress [value]="progressValue()" variant="success" />`;

  readonly props = computed<PropDef[]>(() => [
    { name: 'value', type: 'number', default: '0', description: this.t().propDescriptions.value },
    { name: 'max', type: 'number', default: '100', description: this.t().propDescriptions.max },
    { name: 'variant', type: "'default' | 'success' | 'warning' | 'error' | 'info'", default: "'default'", description: this.t().propDescriptions.variant },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: this.t().propDescriptions.size },
    { name: 'indeterminate', type: 'boolean', default: 'false', description: this.t().propDescriptions.indeterminate },
    { name: 'label', type: 'string', default: "'Progress'", description: this.t().propDescriptions.label },
    { name: 'class', type: 'string', default: "''", description: this.t().propDescriptions.class },
  ]);
}
