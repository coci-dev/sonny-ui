import { Component } from '@angular/core';
import { CodeBlockComponent } from '../../shared/code-block';
import { ComponentPreviewComponent } from '../../shared/component-preview';
import { PropsTableComponent, type PropDef } from '../../shared/props-table';
import { SnyLoaderComponent } from 'core';

@Component({
  selector: 'docs-loader-doc',
  standalone: true,
  imports: [CodeBlockComponent, ComponentPreviewComponent, PropsTableComponent, SnyLoaderComponent],
  template: `
    <div class="space-y-8">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Loader</h1>
        <p class="text-muted-foreground mt-2">Visual indicators for loading states.</p>
      </div>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Import</h2>
        <docs-code-block [code]="importCode" language="typescript" />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Variants</h2>
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
        <h2 class="text-xl font-semibold">Sizes</h2>
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
        <h2 class="text-xl font-semibold">Examples</h2>
        <h3 class="text-lg font-medium">Loading States</h3>
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
        <h2 class="text-xl font-semibold">API Reference</h2>
        <docs-props-table [props]="props" />
      </section>
    </div>
  `,
})
export class LoaderDocComponent {
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

  props: PropDef[] = [
    { name: 'variant', type: "'spinner' | 'dots' | 'bars'", default: "'spinner'", description: 'The style of the loader animation.' },
    { name: 'size', type: "'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: 'The size of the loader.' },
    { name: 'class', type: 'string', default: "''", description: 'Additional CSS classes to apply.' },
  ];
}
