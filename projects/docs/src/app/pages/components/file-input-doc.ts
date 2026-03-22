import { Component, computed, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CodeBlockComponent } from '../../shared/code-block';
import { ComponentPreviewComponent } from '../../shared/component-preview';
import { PropsTableComponent, type PropDef } from '../../shared/props-table';
import { SnyFileInputComponent } from 'core';
import { I18nService } from '../../i18n/i18n.service';
import { FILE_INPUT_DOC_EN } from '../../i18n/en/pages/file-input-doc';
import { FILE_INPUT_DOC_ES } from '../../i18n/es/pages/file-input-doc';

@Component({
  selector: 'docs-file-input-doc',
  standalone: true,
  imports: [CodeBlockComponent, ComponentPreviewComponent, PropsTableComponent, SnyFileInputComponent, ReactiveFormsModule],
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
          <div class="w-full max-w-sm">
            <sny-file-input placeholder="Choose file..." />
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.variants }}</h2>
        <docs-component-preview [code]="variantsCode">
          <div class="space-y-3 w-full max-w-sm">
            <sny-file-input placeholder="Default" />
            <sny-file-input variant="error" placeholder="Error state" />
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.sizes }}</h2>
        <docs-component-preview [code]="sizesCode">
          <div class="space-y-3 w-full max-w-sm">
            <sny-file-input size="sm" placeholder="Small" />
            <sny-file-input size="md" placeholder="Medium" />
            <sny-file-input size="lg" placeholder="Large" />
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ t().disabled }}</h2>
        <docs-component-preview [code]="disabledCode">
          <div class="w-full max-w-sm">
            <sny-file-input [disabled]="true" placeholder="Disabled" />
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.examples }}</h2>
        <h3 class="text-lg font-medium">{{ t().dragAndDrop }}</h3>
        <docs-component-preview [code]="exampleCode" language="typescript">
          <div class="w-full max-w-sm">
            <sny-file-input accept="image/*" [multiple]="true" placeholder="Drop images here or click to browse..." />
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.reactiveForms }}</h2>
        <docs-component-preview [code]="reactiveFormsCode" language="typescript">
          <div class="w-full max-w-sm">
            <sny-file-input [formControl]="fileCtrl" placeholder="Choose file..." />
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
export class FileInputDocComponent {
  readonly i18n = inject(I18nService);
  readonly t = computed(() => this.i18n.locale() === 'es' ? FILE_INPUT_DOC_ES : FILE_INPUT_DOC_EN);

  readonly fileCtrl = new FormControl<FileList | null>(null);

  reactiveFormsCode = `readonly fileCtrl = new FormControl<FileList | null>(null);

<sny-file-input [formControl]="fileCtrl" />`;

  importCode = `import { SnyFileInputComponent } from '@sonny-ui/core';`;
  basicCode = `<sny-file-input placeholder="Choose file..." />`;
  variantsCode = `<sny-file-input placeholder="Default" />
<sny-file-input variant="error" placeholder="Error state" />`;
  sizesCode = `<sny-file-input size="sm" placeholder="Small" />
<sny-file-input size="md" placeholder="Medium" />
<sny-file-input size="lg" placeholder="Large" />`;
  disabledCode = `<sny-file-input [disabled]="true" placeholder="Disabled" />`;
  exampleCode = `<sny-file-input
  accept="image/*"
  [multiple]="true"
  placeholder="Drop images here or click to browse..."
/>`;

  readonly props = computed<PropDef[]>(() => [
    { name: 'accept', type: 'string', default: "''", description: this.t().propDescriptions.accept },
    { name: 'multiple', type: 'boolean', default: 'false', description: this.t().propDescriptions.multiple },
    { name: 'disabled', type: 'boolean', default: 'false', description: this.t().propDescriptions.disabled },
    { name: 'placeholder', type: 'string', default: "'Choose file...'", description: this.t().propDescriptions.placeholder },
    { name: 'variant', type: "'default' | 'error'", default: "'default'", description: this.t().propDescriptions.variant },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: this.t().propDescriptions.size },
    { name: 'maxSize', type: 'number', default: '0', description: this.t().propDescriptions.maxSize },
    { name: 'class', type: 'string', default: "''", description: this.t().propDescriptions.class },
    { name: 'value', type: 'FileList | null', default: 'null', description: this.t().propDescriptions.value },
    { name: 'fileChange', type: 'OutputEmitter<FileList>', default: '-', description: this.t().propDescriptions.fileChange },
    { name: 'error', type: 'OutputEmitter<string>', default: '-', description: this.t().propDescriptions.error },
  ]);
}
