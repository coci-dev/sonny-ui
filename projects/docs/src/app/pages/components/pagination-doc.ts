import { Component, computed, inject, signal } from '@angular/core';
import { CodeBlockComponent } from '../../shared/code-block';
import { ComponentPreviewComponent } from '../../shared/component-preview';
import { PropsTableComponent, type PropDef } from '../../shared/props-table';
import { SnyPaginationComponent } from 'core';
import { I18nService } from '../../i18n/i18n.service';
import { PAGINATION_DOC_EN } from '../../i18n/en/pages/pagination-doc';
import { PAGINATION_DOC_ES } from '../../i18n/es/pages/pagination-doc';

@Component({
  selector: 'docs-pagination-doc',
  standalone: true,
  imports: [CodeBlockComponent, ComponentPreviewComponent, PropsTableComponent, SnyPaginationComponent],
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
          <sny-pagination [(currentPage)]="currentPage" [totalPages]="10" />
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.apiReference }}</h2>
        <docs-props-table [props]="props()" />
      </section>
    </div>
  `,
})
export class PaginationDocComponent {
  readonly i18n = inject(I18nService);
  readonly t = computed(() => this.i18n.locale() === 'es' ? PAGINATION_DOC_ES : PAGINATION_DOC_EN);

  readonly currentPage = signal(1);

  importCode = `import { SnyPaginationComponent } from '@sonny-ui/core';`;

  basicCode = `readonly currentPage = signal(1);

<sny-pagination [(currentPage)]="currentPage" [totalPages]="10" />`;

  readonly props = computed<PropDef[]>(() => [
    { name: 'currentPage', type: 'number', default: '1', description: this.t().propDescriptions.currentPage },
    { name: 'totalPages', type: 'number', default: '1', description: this.t().propDescriptions.totalPages },
    { name: 'siblingCount', type: 'number', default: '1', description: this.t().propDescriptions.siblingCount },
    { name: 'boundaryCount', type: 'number', default: '1', description: this.t().propDescriptions.boundaryCount },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: this.t().propDescriptions.size },
    { name: 'variant', type: "'default' | 'outline'", default: "'default'", description: this.t().propDescriptions.variant },
    { name: 'class', type: 'string', default: "''", description: this.t().propDescriptions.class },
  ]);
}
