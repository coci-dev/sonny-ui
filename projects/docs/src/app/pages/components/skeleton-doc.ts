import { Component } from '@angular/core';
import { CodeBlockComponent } from '../../shared/code-block';
import { ComponentPreviewComponent } from '../../shared/component-preview';
import { PropsTableComponent, type PropDef } from '../../shared/props-table';
import { SnySkeletonDirective } from 'core';

@Component({
  selector: 'docs-skeleton-doc',
  standalone: true,
  imports: [CodeBlockComponent, ComponentPreviewComponent, PropsTableComponent, SnySkeletonDirective],
  template: `
    <div class="space-y-8">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Skeleton</h1>
        <p class="text-muted-foreground mt-2">Used to show a placeholder while content is loading.</p>
      </div>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Import</h2>
        <docs-code-block [code]="importCode" language="typescript" />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Usage</h2>
        <docs-component-preview [code]="basicCode">
          <div class="space-y-2 w-full max-w-sm">
            <div snySkeleton size="sm" class="w-3/4"></div>
            <div snySkeleton size="md" class="w-full"></div>
            <div snySkeleton size="sm" class="w-1/2"></div>
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Variants</h2>
        <docs-component-preview [code]="variantsCode">
          <div class="flex items-center gap-6">
            <div snySkeleton variant="line" size="lg" class="w-48"></div>
            <div snySkeleton variant="circular" size="xl"></div>
            <div snySkeleton variant="rounded" size="lg" class="w-32"></div>
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Examples</h2>
        <h3 class="text-lg font-medium">Loading Card</h3>
        <docs-component-preview [code]="exampleCode">
          <div class="flex items-center gap-4 max-w-sm w-full">
            <div snySkeleton variant="circular" class="h-12 w-12"></div>
            <div class="space-y-2 flex-1">
              <div snySkeleton size="sm" class="w-3/4"></div>
              <div snySkeleton size="sm" class="w-1/2"></div>
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
export class SkeletonDocComponent {
  importCode = `import { SnySkeletonDirective } from '@sonny-ui/core';`;
  basicCode = `<div snySkeleton size="sm" class="w-3/4"></div>
<div snySkeleton size="md" class="w-full"></div>
<div snySkeleton size="sm" class="w-1/2"></div>`;
  variantsCode = `<div snySkeleton variant="line" size="lg" class="w-48"></div>
<div snySkeleton variant="circular" size="xl"></div>
<div snySkeleton variant="rounded" size="lg" class="w-32"></div>`;
  exampleCode = `<div class="flex items-center gap-4">
  <div snySkeleton variant="circular" class="h-12 w-12"></div>
  <div class="space-y-2 flex-1">
    <div snySkeleton size="sm" class="w-3/4"></div>
    <div snySkeleton size="sm" class="w-1/2"></div>
  </div>
</div>`;

  props: PropDef[] = [
    { name: 'variant', type: "'line' | 'circular' | 'rounded'", default: "'line'", description: 'Shape of the skeleton element.' },
    { name: 'size', type: "'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: 'Height of the skeleton.' },
    { name: 'class', type: 'string', default: "''", description: 'Additional CSS classes to apply.' },
  ];
}
