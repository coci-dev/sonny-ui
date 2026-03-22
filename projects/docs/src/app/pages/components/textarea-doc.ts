import { Component, computed, inject } from '@angular/core';
import { CodeBlockComponent } from '../../shared/code-block';
import { ComponentPreviewComponent } from '../../shared/component-preview';
import { PropsTableComponent, type PropDef } from '../../shared/props-table';
import { SnyTextareaDirective } from 'core';
import { I18nService } from '../../i18n/i18n.service';
import { TEXTAREA_DOC_EN } from '../../i18n/en/pages/textarea-doc';
import { TEXTAREA_DOC_ES } from '../../i18n/es/pages/textarea-doc';

@Component({
  selector: 'docs-textarea-doc',
  standalone: true,
  imports: [CodeBlockComponent, ComponentPreviewComponent, PropsTableComponent, SnyTextareaDirective],
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
          <textarea snyTextarea placeholder="Type your message here."></textarea>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.variants }}</h2>
        <docs-component-preview [code]="variantsCode">
          <div class="space-y-4 w-full">
            <textarea snyTextarea placeholder="Default textarea"></textarea>
            <textarea snyTextarea variant="error" placeholder="Error textarea"></textarea>
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.sizes }}</h2>
        <docs-component-preview [code]="sizesCode">
          <div class="space-y-4 w-full">
            <textarea snyTextarea textareaSize="sm" placeholder="Small"></textarea>
            <textarea snyTextarea textareaSize="md" placeholder="Medium"></textarea>
            <textarea snyTextarea textareaSize="lg" placeholder="Large"></textarea>
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.examples }}</h2>
        <h3 class="text-lg font-medium">{{ t().autoResizeExample }}</h3>
        <docs-component-preview [code]="autoResizeCode">
          <textarea snyTextarea [autoResize]="true" placeholder="Type here — I will grow!"></textarea>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.apiReference }}</h2>
        <docs-props-table [props]="props()" />
      </section>
    </div>
  `,
})
export class TextareaDocComponent {
  readonly i18n = inject(I18nService);
  readonly t = computed(() => (this.i18n.locale() === 'es' ? TEXTAREA_DOC_ES : TEXTAREA_DOC_EN));

  importCode = `import { SnyTextareaDirective } from '@sonny-ui/core';`;

  basicCode = `<textarea snyTextarea placeholder="Type your message here."></textarea>`;

  variantsCode = `<textarea snyTextarea placeholder="Default textarea"></textarea>
<textarea snyTextarea variant="error" placeholder="Error textarea"></textarea>`;

  sizesCode = `<textarea snyTextarea textareaSize="sm" placeholder="Small"></textarea>
<textarea snyTextarea textareaSize="md" placeholder="Medium"></textarea>
<textarea snyTextarea textareaSize="lg" placeholder="Large"></textarea>`;

  autoResizeCode = `<textarea snyTextarea [autoResize]="true" placeholder="Type here — I will grow!"></textarea>`;

  readonly props = computed<PropDef[]>(() => [
    { name: 'variant', type: "'default' | 'error'", default: "'default'", description: this.t().propDescriptions.variant },
    { name: 'textareaSize', type: "'sm' | 'md' | 'lg'", default: "'md'", description: this.t().propDescriptions.textareaSize },
    { name: 'resize', type: "'none' | 'vertical' | 'horizontal' | 'both'", default: "'vertical'", description: this.t().propDescriptions.resize },
    { name: 'autoResize', type: 'boolean', default: 'false', description: this.t().propDescriptions.autoResize },
    { name: 'class', type: 'string', default: "''", description: this.t().propDescriptions.class },
  ]);
}
