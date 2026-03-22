import { Component, computed, inject } from '@angular/core';
import { CodeBlockComponent } from '../../shared/code-block';
import { ComponentPreviewComponent } from '../../shared/component-preview';
import { PropsTableComponent, type PropDef } from '../../shared/props-table';
import { SnyFieldsetDirective, SnyFieldsetLegendDirective, SnyFieldsetContentDirective, SnyInputDirective, SnyLabelDirective } from 'core';
import { I18nService } from '../../i18n/i18n.service';
import { FIELDSET_DOC_EN } from '../../i18n/en/pages/fieldset-doc';
import { FIELDSET_DOC_ES } from '../../i18n/es/pages/fieldset-doc';

@Component({
  selector: 'docs-fieldset-doc',
  standalone: true,
  imports: [CodeBlockComponent, ComponentPreviewComponent, PropsTableComponent, SnyFieldsetDirective, SnyFieldsetLegendDirective, SnyFieldsetContentDirective, SnyInputDirective, SnyLabelDirective],
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
          <fieldset snyFieldset class="w-full max-w-sm">
            <legend snyFieldsetLegend>Personal Information</legend>
            <div snyFieldsetContent>
              <div class="space-y-2">
                <label snyLabel>Name</label>
                <input snyInput placeholder="Enter your name" />
              </div>
              <div class="space-y-2">
                <label snyLabel>Email</label>
                <input snyInput type="email" placeholder="you&#64;example.com" />
              </div>
            </div>
          </fieldset>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.variants }}</h2>
        <docs-component-preview [code]="variantsCode">
          <div class="space-y-4 w-full max-w-sm">
            <fieldset snyFieldset>
              <legend snyFieldsetLegend>Default</legend>
              <div snyFieldsetContent>
                <input snyInput placeholder="Default fieldset" />
              </div>
            </fieldset>
            <fieldset snyFieldset variant="bordered">
              <legend snyFieldsetLegend>Bordered</legend>
              <div snyFieldsetContent>
                <input snyInput placeholder="Bordered fieldset" />
              </div>
            </fieldset>
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.apiReference }}</h2>
        <h3 class="text-lg font-medium">{{ t().snyFieldsetDirective }}</h3>
        <docs-props-table [props]="fieldsetProps()" />
        <h3 class="text-lg font-medium mt-4">{{ t().snyFieldsetLegendDirective }}</h3>
        <docs-props-table [props]="legendProps()" />
        <h3 class="text-lg font-medium mt-4">{{ t().snyFieldsetContentDirective }}</h3>
        <docs-props-table [props]="contentProps()" />
      </section>
    </div>
  `,
})
export class FieldsetDocComponent {
  readonly i18n = inject(I18nService);
  readonly t = computed(() => this.i18n.locale() === 'es' ? FIELDSET_DOC_ES : FIELDSET_DOC_EN);

  importCode = `import {
  SnyFieldsetDirective,
  SnyFieldsetLegendDirective,
  SnyFieldsetContentDirective,
} from '@sonny-ui/core';`;

  basicCode = `<fieldset snyFieldset>
  <legend snyFieldsetLegend>Personal Information</legend>
  <div snyFieldsetContent>
    <div class="space-y-2">
      <label snyLabel>Name</label>
      <input snyInput placeholder="Enter your name" />
    </div>
    <div class="space-y-2">
      <label snyLabel>Email</label>
      <input snyInput type="email" placeholder="you@example.com" />
    </div>
  </div>
</fieldset>`;

  variantsCode = `<fieldset snyFieldset>
  <legend snyFieldsetLegend>Default</legend>
  <div snyFieldsetContent>
    <input snyInput placeholder="Default fieldset" />
  </div>
</fieldset>

<fieldset snyFieldset variant="bordered">
  <legend snyFieldsetLegend>Bordered</legend>
  <div snyFieldsetContent>
    <input snyInput placeholder="Bordered fieldset" />
  </div>
</fieldset>`;

  readonly fieldsetProps = computed<PropDef[]>(() => [
    { name: 'variant', type: "'default' | 'bordered'", default: "'default'", description: this.t().propDescriptions.variant },
    { name: 'disabled', type: 'boolean', default: 'false', description: this.t().propDescriptions.disabled },
    { name: 'class', type: 'string', default: "''", description: this.t().propDescriptions.class },
  ]);

  readonly legendProps = computed<PropDef[]>(() => [
    { name: 'class', type: 'string', default: "''", description: this.t().legendPropDescriptions.class },
  ]);

  readonly contentProps = computed<PropDef[]>(() => [
    { name: 'class', type: 'string', default: "''", description: this.t().contentPropDescriptions.class },
  ]);
}
