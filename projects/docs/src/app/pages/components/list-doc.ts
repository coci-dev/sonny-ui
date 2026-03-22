import { Component, computed, inject } from '@angular/core';
import { CodeBlockComponent } from '../../shared/code-block';
import { ComponentPreviewComponent } from '../../shared/component-preview';
import { PropsTableComponent, type PropDef } from '../../shared/props-table';
import {
  SnyListDirective,
  SnyListItemDirective,
  SnyListItemContentDirective,
} from 'core';
import { I18nService } from '../../i18n/i18n.service';
import { LIST_DOC_EN } from '../../i18n/en/pages/list-doc';
import { LIST_DOC_ES } from '../../i18n/es/pages/list-doc';

@Component({
  selector: 'docs-list-doc',
  standalone: true,
  imports: [
    CodeBlockComponent,
    ComponentPreviewComponent,
    PropsTableComponent,
    SnyListDirective,
    SnyListItemDirective,
    SnyListItemContentDirective,
  ],
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
          <div snyList class="max-w-sm w-full">
            <div snyListItem>
              <div snyListItemContent>First item</div>
            </div>
            <div snyListItem>
              <div snyListItemContent>Second item</div>
            </div>
            <div snyListItem>
              <div snyListItemContent>Third item</div>
            </div>
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.variants }}</h2>
        <docs-component-preview [code]="variantsCode" language="markup">
          <div class="flex gap-8">
            <div snyList variant="bordered" class="max-w-xs w-full">
              <div snyListItem>
                <div snyListItemContent>Bordered item 1</div>
              </div>
              <div snyListItem>
                <div snyListItemContent>Bordered item 2</div>
              </div>
              <div snyListItem>
                <div snyListItemContent>Bordered item 3</div>
              </div>
            </div>
            <div snyList variant="hover" class="max-w-xs w-full">
              <div snyListItem>
                <div snyListItemContent>Hover item 1</div>
              </div>
              <div snyListItem>
                <div snyListItemContent>Hover item 2</div>
              </div>
              <div snyListItem>
                <div snyListItemContent>Hover item 3</div>
              </div>
            </div>
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.apiReference }}</h2>
        <h3 class="text-lg font-medium">SnyListDirective</h3>
        <docs-props-table [props]="listProps()" />
        <h3 class="text-lg font-medium mt-4">SnyListItemDirective</h3>
        <docs-props-table [props]="itemProps()" />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ t().subDirectivesTitle }}</h2>
        <ul class="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
          @for (item of t().subDirectives; track item) {
            <li [innerHTML]="item"></li>
          }
        </ul>
      </section>
    </div>
  `,
})
export class ListDocComponent {
  readonly i18n = inject(I18nService);
  readonly t = computed(() => this.i18n.locale() === 'es' ? LIST_DOC_ES : LIST_DOC_EN);

  importCode = `import {
  SnyListDirective,
  SnyListItemDirective,
  SnyListItemContentDirective,
} from '@sonny-ui/core';`;

  basicCode = `<div snyList>
  <div snyListItem>
    <div snyListItemContent>First item</div>
  </div>
  <div snyListItem>
    <div snyListItemContent>Second item</div>
  </div>
  <div snyListItem>
    <div snyListItemContent>Third item</div>
  </div>
</div>`;

  variantsCode = `<div snyList variant="bordered">
  <div snyListItem>
    <div snyListItemContent>Bordered item</div>
  </div>
</div>

<div snyList variant="hover">
  <div snyListItem>
    <div snyListItemContent>Hover item</div>
  </div>
</div>`;

  readonly listProps = computed<PropDef[]>(() => [
    { name: 'variant', type: "'default' | 'bordered' | 'hover'", default: "'default'", description: this.t().propDescriptions.variant },
    { name: 'class', type: 'string', default: "''", description: this.t().propDescriptions.class },
  ]);

  readonly itemProps = computed<PropDef[]>(() => [
    { name: 'active', type: 'boolean', default: 'false', description: this.t().itemPropDescriptions.active },
    { name: 'disabled', type: 'boolean', default: 'false', description: this.t().itemPropDescriptions.disabled },
    { name: 'class', type: 'string', default: "''", description: this.t().itemPropDescriptions.class },
  ]);
}
