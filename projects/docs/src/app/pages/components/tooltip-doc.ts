import { Component, computed, inject } from '@angular/core';
import { CodeBlockComponent } from '../../shared/code-block';
import { ComponentPreviewComponent } from '../../shared/component-preview';
import { PropsTableComponent, type PropDef } from '../../shared/props-table';
import { SnyTooltipDirective } from 'core';
import { I18nService } from '../../i18n/i18n.service';
import { TOOLTIP_DOC_EN } from '../../i18n/en/pages/tooltip-doc';
import { TOOLTIP_DOC_ES } from '../../i18n/es/pages/tooltip-doc';

@Component({
  selector: 'docs-tooltip-doc',
  standalone: true,
  imports: [CodeBlockComponent, ComponentPreviewComponent, PropsTableComponent, SnyTooltipDirective],
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
          <button class="rounded-md border px-4 py-2 text-sm" [snyTooltip]="'Add to library'">
            Hover me
          </button>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ t().positionExample }}</h2>
        <docs-component-preview [code]="positionsCode">
          <div class="flex gap-4">
            <button class="rounded-md border px-4 py-2 text-sm" snyTooltip="Top" tooltipPosition="top">Top</button>
            <button class="rounded-md border px-4 py-2 text-sm" snyTooltip="Bottom" tooltipPosition="bottom">Bottom</button>
            <button class="rounded-md border px-4 py-2 text-sm" snyTooltip="Left" tooltipPosition="left">Left</button>
            <button class="rounded-md border px-4 py-2 text-sm" snyTooltip="Right" tooltipPosition="right">Right</button>
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
export class TooltipDocComponent {
  readonly i18n = inject(I18nService);
  readonly t = computed(() => (this.i18n.locale() === 'es' ? TOOLTIP_DOC_ES : TOOLTIP_DOC_EN));

  importCode = `import { SnyTooltipDirective } from '@sonny-ui/core';`;
  basicCode = `<button [snyTooltip]="'Add to library'">Hover me</button>`;
  positionsCode = `<button snyTooltip="Top" tooltipPosition="top">Top</button>
<button snyTooltip="Bottom" tooltipPosition="bottom">Bottom</button>
<button snyTooltip="Left" tooltipPosition="left">Left</button>
<button snyTooltip="Right" tooltipPosition="right">Right</button>`;

  readonly props = computed<PropDef[]>(() => [
    { name: 'snyTooltip', type: 'string', default: "''", description: this.t().propDescriptions.snyTooltip },
    { name: 'tooltipPosition', type: "'top' | 'bottom' | 'left' | 'right'", default: "'top'", description: this.t().propDescriptions.tooltipPosition },
    { name: 'tooltipDelay', type: 'number', default: '300', description: this.t().propDescriptions.tooltipDelay },
    { name: 'tooltipDisabled', type: 'boolean', default: 'false', description: this.t().propDescriptions.tooltipDisabled },
    { name: 'class', type: 'string', default: "''", description: this.t().propDescriptions.class },
  ]);
}
