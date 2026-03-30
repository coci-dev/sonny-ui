import { Component, computed, inject, signal } from '@angular/core';
import { CodeBlockComponent } from '../../shared/code-block';
import { ComponentPreviewComponent } from '../../shared/component-preview';
import { PropsTableComponent, type PropDef } from '../../shared/props-table';
import { SnyTagInputComponent } from 'core';
import { I18nService } from '../../i18n/i18n.service';
import { TAG_INPUT_DOC_EN } from '../../i18n/en/pages/tag-input-doc';
import { TAG_INPUT_DOC_ES } from '../../i18n/es/pages/tag-input-doc';

@Component({
  selector: 'docs-tag-input-doc',
  standalone: true,
  imports: [CodeBlockComponent, ComponentPreviewComponent, PropsTableComponent, SnyTagInputComponent],
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
          <div class="w-full max-w-md space-y-2">
            <sny-tag-input [(value)]="basicTags" />
            <p class="text-sm text-muted-foreground">Tags: {{ basicTags().join(', ') || '(none)' }}</p>
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Max Tags</h2>
        <docs-component-preview [code]="maxCode" language="markup">
          <div class="w-full max-w-md">
            <sny-tag-input [(value)]="maxTags" [maxTags]="3" placeholder="Max 3 tags..." />
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Validation</h2>
        <docs-component-preview [code]="validateCode" language="markup">
          <div class="w-full max-w-md space-y-2">
            <sny-tag-input [(value)]="validatedTags" [validate]="minLengthValidator" placeholder="Min 3 characters..." />
            <p class="text-xs text-muted-foreground">Only tags with 3+ characters are accepted.</p>
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Pre-filled</h2>
        <docs-component-preview [code]="prefilledCode" language="markup">
          <div class="w-full max-w-md">
            <sny-tag-input [(value)]="prefilledTags" />
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
            <li>{{ item }}</li>
          }
        </ul>
      </section>
    </div>
  `,
})
export class TagInputDocComponent {
  readonly i18n = inject(I18nService);
  readonly t = computed(() => (this.i18n.locale() === 'es' ? TAG_INPUT_DOC_ES : TAG_INPUT_DOC_EN));

  readonly basicTags = signal<string[]>([]);
  readonly maxTags = signal<string[]>([]);
  readonly validatedTags = signal<string[]>([]);
  readonly prefilledTags = signal(['Angular', 'Tailwind', 'Signals']);

  minLengthValidator = (tag: string) => tag.length >= 3;

  importCode = `import { SnyTagInputComponent } from '@sonny-ui/core';`;
  basicCode = `<sny-tag-input [(value)]="tags" />`;
  maxCode = `<sny-tag-input [(value)]="tags" [maxTags]="3" />`;
  validateCode = `validator = (tag: string) => tag.length >= 3;

<sny-tag-input [(value)]="tags" [validate]="validator" />`;
  prefilledCode = `tags = signal(['Angular', 'Tailwind', 'Signals']);

<sny-tag-input [(value)]="tags" />`;

  readonly props = computed<PropDef[]>(() => [
    { name: 'value', type: 'string[]', default: '[]', description: this.t().propDescriptions.value },
    { name: 'placeholder', type: 'string', default: "'Add tag...'", description: this.t().propDescriptions.placeholder },
    { name: 'maxTags', type: 'number | null', default: 'null', description: this.t().propDescriptions.maxTags },
    { name: 'allowDuplicates', type: 'boolean', default: 'false', description: this.t().propDescriptions.allowDuplicates },
    { name: 'removable', type: 'boolean', default: 'true', description: this.t().propDescriptions.removable },
    { name: 'addOnBlur', type: 'boolean', default: 'true', description: this.t().propDescriptions.addOnBlur },
    { name: 'separators', type: 'string[]', default: "['Enter', ',']", description: this.t().propDescriptions.separators },
    { name: 'validate', type: '(tag: string) => boolean', default: 'null', description: this.t().propDescriptions.validate },
    { name: 'disabled', type: 'boolean', default: 'false', description: this.t().propDescriptions.disabled },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: this.t().propDescriptions.size },
    { name: 'tagAdded', type: 'output<string>', default: '—', description: this.t().propDescriptions.tagAdded },
    { name: 'tagRemoved', type: 'output<string>', default: '—', description: this.t().propDescriptions.tagRemoved },
  ]);
}
