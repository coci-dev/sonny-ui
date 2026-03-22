import { Component, computed, inject } from '@angular/core';
import { CodeBlockComponent } from '../../shared/code-block';
import { ComponentPreviewComponent } from '../../shared/component-preview';
import { PropsTableComponent, type PropDef } from '../../shared/props-table';
import {
  SnyIndicatorDirective,
  SnyIndicatorBadgeDirective,
} from 'core';
import { I18nService } from '../../i18n/i18n.service';
import { INDICATOR_DOC_EN } from '../../i18n/en/pages/indicator-doc';
import { INDICATOR_DOC_ES } from '../../i18n/es/pages/indicator-doc';

@Component({
  selector: 'docs-indicator-doc',
  standalone: true,
  imports: [
    CodeBlockComponent,
    ComponentPreviewComponent,
    PropsTableComponent,
    SnyIndicatorDirective,
    SnyIndicatorBadgeDirective,
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
          <div class="flex items-center gap-8">
            <div snyIndicator>
              <span snyIndicatorBadge>3</span>
              <div class="w-12 h-12 bg-muted rounded-md flex items-center justify-center text-sm">Box</div>
            </div>
            <div snyIndicator>
              <span snyIndicatorBadge variant="error">99+</span>
              <div class="w-12 h-12 bg-muted rounded-md flex items-center justify-center text-sm">Mail</div>
            </div>
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.variants }}</h2>
        <docs-component-preview [code]="variantsCode" language="markup">
          <div class="flex items-center gap-8">
            <div snyIndicator>
              <span snyIndicatorBadge variant="primary">1</span>
              <div class="w-12 h-12 bg-muted rounded-md"></div>
            </div>
            <div snyIndicator>
              <span snyIndicatorBadge variant="success">2</span>
              <div class="w-12 h-12 bg-muted rounded-md"></div>
            </div>
            <div snyIndicator>
              <span snyIndicatorBadge variant="warning">3</span>
              <div class="w-12 h-12 bg-muted rounded-md"></div>
            </div>
            <div snyIndicator>
              <span snyIndicatorBadge variant="error">4</span>
              <div class="w-12 h-12 bg-muted rounded-md"></div>
            </div>
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.apiReference }}</h2>
        <h3 class="text-lg font-medium">SnyIndicatorDirective</h3>
        <docs-props-table [props]="indicatorProps()" />
        <h3 class="text-lg font-medium mt-4">SnyIndicatorBadgeDirective</h3>
        <docs-props-table [props]="badgeProps()" />
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
export class IndicatorDocComponent {
  readonly i18n = inject(I18nService);
  readonly t = computed(() => this.i18n.locale() === 'es' ? INDICATOR_DOC_ES : INDICATOR_DOC_EN);

  importCode = `import {
  SnyIndicatorDirective,
  SnyIndicatorBadgeDirective,
} from '@sonny-ui/core';`;

  basicCode = `<div snyIndicator>
  <span snyIndicatorBadge>3</span>
  <div class="w-12 h-12 bg-muted rounded-md">Box</div>
</div>`;

  variantsCode = `<div snyIndicator>
  <span snyIndicatorBadge variant="primary">1</span>
  <div>...</div>
</div>
<div snyIndicator>
  <span snyIndicatorBadge variant="success">2</span>
  <div>...</div>
</div>
<div snyIndicator>
  <span snyIndicatorBadge variant="warning">3</span>
  <div>...</div>
</div>
<div snyIndicator>
  <span snyIndicatorBadge variant="error">4</span>
  <div>...</div>
</div>`;

  readonly indicatorProps = computed<PropDef[]>(() => [
    { name: 'class', type: 'string', default: "''", description: this.t().propDescriptions.class },
  ]);

  readonly badgeProps = computed<PropDef[]>(() => [
    { name: 'position', type: "'top-start' | 'top-center' | 'top-end' | 'middle-start' | 'middle-end' | 'bottom-start' | 'bottom-center' | 'bottom-end'", default: "'top-end'", description: this.t().badgePropDescriptions.position },
    { name: 'variant', type: "'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error'", default: "'default'", description: this.t().badgePropDescriptions.variant },
    { name: 'ariaLabel', type: 'string', default: "''", description: this.t().badgePropDescriptions.ariaLabel },
    { name: 'class', type: 'string', default: "''", description: this.t().badgePropDescriptions.class },
  ]);
}
