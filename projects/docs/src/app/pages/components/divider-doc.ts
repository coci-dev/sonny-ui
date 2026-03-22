import { Component, computed, inject } from '@angular/core';
import { CodeBlockComponent } from '../../shared/code-block';
import { ComponentPreviewComponent } from '../../shared/component-preview';
import { PropsTableComponent, type PropDef } from '../../shared/props-table';
import { SnyDividerComponent } from 'core';
import { I18nService } from '../../i18n/i18n.service';
import { DIVIDER_DOC_EN } from '../../i18n/en/pages/divider-doc';
import { DIVIDER_DOC_ES } from '../../i18n/es/pages/divider-doc';

@Component({
  selector: 'docs-divider-doc',
  standalone: true,
  imports: [CodeBlockComponent, ComponentPreviewComponent, PropsTableComponent, SnyDividerComponent],
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
          <div class="w-full space-y-4">
            <p class="text-sm">Content above</p>
            <sny-divider />
            <p class="text-sm">Content below</p>
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.examples }}</h2>
        <docs-component-preview [code]="labelCode">
          <div class="w-full space-y-4">
            <p class="text-sm">Content above</p>
            <sny-divider label="OR" />
            <p class="text-sm">Content below</p>
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
export class DividerDocComponent {
  readonly i18n = inject(I18nService);
  readonly t = computed(() => this.i18n.locale() === 'es' ? DIVIDER_DOC_ES : DIVIDER_DOC_EN);

  importCode = `import { SnyDividerComponent } from '@sonny-ui/core';`;

  basicCode = `<sny-divider />`;

  labelCode = `<sny-divider label="OR" />`;

  readonly props = computed<PropDef[]>(() => [
    { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: this.t().propDescriptions.orientation },
    { name: 'variant', type: "'default' | 'dashed' | 'dotted'", default: "'default'", description: this.t().propDescriptions.variant },
    { name: 'label', type: 'string', default: "''", description: this.t().propDescriptions.label },
    { name: 'class', type: 'string', default: "''", description: this.t().propDescriptions.class },
  ]);
}
