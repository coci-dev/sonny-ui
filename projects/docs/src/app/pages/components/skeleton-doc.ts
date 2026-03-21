import { Component, computed, inject } from '@angular/core';
import { CodeBlockComponent } from '../../shared/code-block';
import { ComponentPreviewComponent } from '../../shared/component-preview';
import { PropsTableComponent, type PropDef } from '../../shared/props-table';
import { SnySkeletonDirective } from 'core';
import { I18nService } from '../../i18n/i18n.service';
import { SKELETON_DOC_EN } from '../../i18n/en/pages/skeleton-doc';
import { SKELETON_DOC_ES } from '../../i18n/es/pages/skeleton-doc';

@Component({
  selector: 'docs-skeleton-doc',
  standalone: true,
  imports: [CodeBlockComponent, ComponentPreviewComponent, PropsTableComponent, SnySkeletonDirective],
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
          <div class="space-y-2 w-full max-w-sm">
            <div snySkeleton size="sm" class="w-3/4"></div>
            <div snySkeleton size="md" class="w-full"></div>
            <div snySkeleton size="sm" class="w-1/2"></div>
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.variants }}</h2>
        <docs-component-preview [code]="variantsCode">
          <div class="flex items-center gap-6">
            <div snySkeleton variant="line" size="lg" class="w-48"></div>
            <div snySkeleton variant="circular" size="xl"></div>
            <div snySkeleton variant="rounded" size="lg" class="w-32"></div>
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.examples }}</h2>
        <h3 class="text-lg font-medium">{{ t().loadingCard }}</h3>
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
export class SkeletonDocComponent {
  readonly i18n = inject(I18nService);
  readonly t = computed(() => this.i18n.locale() === 'es' ? SKELETON_DOC_ES : SKELETON_DOC_EN);

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

  readonly props = computed<PropDef[]>(() => [
    { name: 'variant', type: "'line' | 'circular' | 'rounded'", default: "'line'", description: this.t().propDescriptions.variant },
    { name: 'size', type: "'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: this.t().propDescriptions.size },
    { name: 'class', type: 'string', default: "''", description: this.t().propDescriptions.class },
  ]);
}
