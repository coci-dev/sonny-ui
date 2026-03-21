import { Component, computed, inject } from '@angular/core';
import { CodeBlockComponent } from '../../shared/code-block';
import { ComponentPreviewComponent } from '../../shared/component-preview';
import { PropsTableComponent, type PropDef } from '../../shared/props-table';
import { I18nService } from '../../i18n/i18n.service';
import { LOADER_DOC_EN } from '../../i18n/en/pages/loader-doc';
import { LOADER_DOC_ES } from '../../i18n/es/pages/loader-doc';
import { SnyLoaderComponent } from 'core';

@Component({
  selector: 'docs-loader-doc',
  standalone: true,
  imports: [CodeBlockComponent, ComponentPreviewComponent, PropsTableComponent, SnyLoaderComponent],
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
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.variants }}</h2>
        <docs-component-preview [code]="variantsCode">
          <div class="flex items-center gap-8">
            <div class="flex flex-col items-center gap-2">
              <sny-loader variant="spinner" size="lg" />
              <span class="text-xs text-muted-foreground">Spinner</span>
            </div>
            <div class="flex flex-col items-center gap-2">
              <sny-loader variant="dots" size="lg" />
              <span class="text-xs text-muted-foreground">Dots</span>
            </div>
            <div class="flex flex-col items-center gap-2">
              <sny-loader variant="bars" size="lg" />
              <span class="text-xs text-muted-foreground">Bars</span>
            </div>
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.sizes }}</h2>
        <docs-component-preview [code]="sizesCode">
          <div class="flex items-center gap-6">
            <sny-loader size="sm" />
            <sny-loader size="md" />
            <sny-loader size="lg" />
            <sny-loader size="xl" />
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.examples }}</h2>
        <h3 class="text-lg font-medium">{{ t().loadingStates }}</h3>
        <docs-component-preview [code]="exampleCode">
          <div class="grid grid-cols-3 gap-8">
            @for (v of ['spinner', 'dots', 'bars']; track v) {
              <div class="flex flex-col items-center gap-3">
                @for (s of ['sm', 'md', 'lg', 'xl']; track s) {
                  <sny-loader [variant]="$any(v)" [size]="$any(s)" />
                }
              </div>
            }
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
export class LoaderDocComponent {
  readonly i18n = inject(I18nService);
  readonly t = computed(() => this.i18n.locale() === 'es' ? LOADER_DOC_ES : LOADER_DOC_EN);

  importCode = `import { SnyLoaderComponent } from '@sonny-ui/core';`;
  variantsCode = `<sny-loader variant="spinner" />
<sny-loader variant="dots" />
<sny-loader variant="bars" />`;
  sizesCode = `<sny-loader size="sm" />
<sny-loader size="md" />
<sny-loader size="lg" />
<sny-loader size="xl" />`;
  exampleCode = `<!-- All variants and sizes -->
<sny-loader variant="spinner" size="lg" />
<sny-loader variant="dots" size="md" />
<sny-loader variant="bars" size="xl" />`;

  readonly props = computed<PropDef[]>(() => [
    { name: 'variant', type: "'spinner' | 'dots' | 'bars'", default: "'spinner'", description: this.t().propDescriptions.variant },
    { name: 'size', type: "'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: this.t().propDescriptions.size },
    { name: 'class', type: 'string', default: "''", description: this.t().propDescriptions.class },
  ]);
}
