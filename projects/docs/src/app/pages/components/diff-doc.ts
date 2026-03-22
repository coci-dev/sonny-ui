import { Component, computed, inject } from '@angular/core';
import { CodeBlockComponent } from '../../shared/code-block';
import { ComponentPreviewComponent } from '../../shared/component-preview';
import { PropsTableComponent, type PropDef } from '../../shared/props-table';
import { SnyDiffComponent } from 'core';
import { I18nService } from '../../i18n/i18n.service';
import { DIFF_DOC_EN } from '../../i18n/en/pages/diff-doc';
import { DIFF_DOC_ES } from '../../i18n/es/pages/diff-doc';

@Component({
  selector: 'docs-diff-doc',
  standalone: true,
  imports: [CodeBlockComponent, ComponentPreviewComponent, PropsTableComponent, SnyDiffComponent],
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
          <sny-diff class="max-w-lg aspect-video rounded-lg">
            <div class="flex items-center justify-center h-full bg-muted text-muted-foreground text-lg" snyDiffBefore>Before</div>
            <div class="flex items-center justify-center h-full bg-primary text-primary-foreground text-lg" snyDiffAfter>After</div>
          </sny-diff>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.examples }}</h2>
        <h3 class="text-lg font-medium">{{ t().imageComparison }}</h3>
        <docs-component-preview [code]="exampleCode">
          <sny-diff class="max-w-lg aspect-video rounded-lg">
            <div class="flex items-center justify-center h-full bg-destructive/20 text-destructive text-lg font-semibold" snyDiffBefore>Original</div>
            <div class="flex items-center justify-center h-full bg-success/20 text-success text-lg font-semibold" snyDiffAfter>Modified</div>
          </sny-diff>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.apiReference }}</h2>
        <docs-props-table [props]="props()" />
      </section>
    </div>
  `,
})
export class DiffDocComponent {
  readonly i18n = inject(I18nService);
  readonly t = computed(() => this.i18n.locale() === 'es' ? DIFF_DOC_ES : DIFF_DOC_EN);

  importCode = `import { SnyDiffComponent } from '@sonny-ui/core';`;

  basicCode = `<sny-diff>
  <div snyDiffBefore>Before</div>
  <div snyDiffAfter>After</div>
</sny-diff>`;

  exampleCode = `<sny-diff>
  <div snyDiffBefore>Original</div>
  <div snyDiffAfter>Modified</div>
</sny-diff>`;

  readonly props = computed<PropDef[]>(() => [
    { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: this.t().propDescriptions.orientation },
    { name: 'value', type: 'number (0-100)', default: '50', description: this.t().propDescriptions.initialPosition ?? 'Position of the divider slider' },
    { name: 'class', type: 'string', default: "''", description: this.t().propDescriptions.class },
  ]);
}
