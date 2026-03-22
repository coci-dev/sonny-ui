import { Component, computed, inject, signal } from '@angular/core';
import { CodeBlockComponent } from '../../shared/code-block';
import { ComponentPreviewComponent } from '../../shared/component-preview';
import { PropsTableComponent, type PropDef } from '../../shared/props-table';
import { SnyRadialProgressComponent } from 'core';
import { I18nService } from '../../i18n/i18n.service';
import { RADIAL_PROGRESS_DOC_EN } from '../../i18n/en/pages/radial-progress-doc';
import { RADIAL_PROGRESS_DOC_ES } from '../../i18n/es/pages/radial-progress-doc';

@Component({
  selector: 'docs-radial-progress-doc',
  standalone: true,
  imports: [CodeBlockComponent, ComponentPreviewComponent, PropsTableComponent, SnyRadialProgressComponent],
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
          <sny-radial-progress [value]="70" />
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.sizes }}</h2>
        <docs-component-preview [code]="sizesCode">
          <div class="flex items-center gap-6">
            <sny-radial-progress [value]="60" size="sm" />
            <sny-radial-progress [value]="60" size="md" />
            <sny-radial-progress [value]="60" size="lg" />
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.examples }}</h2>
        <h3 class="text-lg font-medium">{{ t().interactiveExample }}</h3>
        <docs-component-preview [code]="interactiveCode" language="typescript">
          <div class="flex flex-col items-center gap-4">
            <sny-radial-progress [value]="progressValue()" size="lg">{{ progressValue() }}%</sny-radial-progress>
            <div class="flex gap-2">
              <button class="text-sm underline text-muted-foreground hover:text-foreground" (click)="decrementProgress()">-10</button>
              <span class="text-sm text-muted-foreground">{{ progressValue() }}%</span>
              <button class="text-sm underline text-muted-foreground hover:text-foreground" (click)="incrementProgress()">+10</button>
            </div>
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
export class RadialProgressDocComponent {
  readonly i18n = inject(I18nService);
  readonly t = computed(() => this.i18n.locale() === 'es' ? RADIAL_PROGRESS_DOC_ES : RADIAL_PROGRESS_DOC_EN);

  readonly progressValue = signal(60);

  incrementProgress(): void {
    this.progressValue.update((v) => Math.min(100, v + 10));
  }

  decrementProgress(): void {
    this.progressValue.update((v) => Math.max(0, v - 10));
  }

  importCode = `import { SnyRadialProgressComponent } from '@sonny-ui/core';`;
  basicCode = `<sny-radial-progress [value]="70" />`;
  sizesCode = `<sny-radial-progress [value]="60" size="sm" />
<sny-radial-progress [value]="60" size="md" />
<sny-radial-progress [value]="60" size="lg" />`;
  interactiveCode = `readonly progressValue = signal(60);

<sny-radial-progress [value]="progressValue()" size="lg">
  {{ progressValue() }}%
</sny-radial-progress>`;

  readonly props = computed<PropDef[]>(() => [
    { name: 'value', type: 'number', default: '0', description: this.t().propDescriptions.value },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: this.t().propDescriptions.size },
    { name: 'thickness', type: 'number', default: '4', description: this.t().propDescriptions.thickness },
    { name: 'variant', type: "'default' | 'success' | 'warning' | 'error' | 'info'", default: "'default'", description: this.t().propDescriptions.variant ?? 'Visual variant' },
    { name: 'class', type: 'string', default: "''", description: this.t().propDescriptions.class },
  ]);
}
