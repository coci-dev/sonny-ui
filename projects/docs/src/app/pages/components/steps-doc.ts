import { Component, computed, inject } from '@angular/core';
import { CodeBlockComponent } from '../../shared/code-block';
import { ComponentPreviewComponent } from '../../shared/component-preview';
import { PropsTableComponent, type PropDef } from '../../shared/props-table';
import { SnyStepsDirective, SnyStepDirective } from 'core';
import { I18nService } from '../../i18n/i18n.service';
import { STEPS_DOC_EN } from '../../i18n/en/pages/steps-doc';
import { STEPS_DOC_ES } from '../../i18n/es/pages/steps-doc';

@Component({
  selector: 'docs-steps-doc',
  standalone: true,
  imports: [
    CodeBlockComponent,
    ComponentPreviewComponent,
    PropsTableComponent,
    SnyStepsDirective,
    SnyStepDirective,
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
          <div snySteps class="w-full">
            <div snyStep status="completed">Create account</div>
            <div snyStep status="active">Configure settings</div>
            <div snyStep>Deploy</div>
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.examples }}</h2>
        <h3 class="text-lg font-medium">Vertical</h3>
        <docs-component-preview [code]="verticalCode" language="markup">
          <div snySteps orientation="vertical" class="w-full">
            <div snyStep status="completed">Create account</div>
            <div snyStep status="active">Configure settings</div>
            <div snyStep status="error">Review errors</div>
            <div snyStep>Deploy</div>
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.apiReference }}</h2>
        <h3 class="text-lg font-medium">{{ t().steps }}</h3>
        <docs-props-table [props]="stepsProps()" />
        <h3 class="text-lg font-medium mt-4">{{ t().step }}</h3>
        <docs-props-table [props]="stepProps()" />
      </section>
    </div>
  `,
})
export class StepsDocComponent {
  readonly i18n = inject(I18nService);
  readonly t = computed(() => this.i18n.locale() === 'es' ? STEPS_DOC_ES : STEPS_DOC_EN);

  importCode = `import {
  SnyStepsDirective,
  SnyStepDirective,
} from '@sonny-ui/core';`;

  basicCode = `<div snySteps>
  <div snyStep status="completed">Create account</div>
  <div snyStep status="active">Configure settings</div>
  <div snyStep>Deploy</div>
</div>`;

  verticalCode = `<div snySteps orientation="vertical">
  <div snyStep status="completed">Create account</div>
  <div snyStep status="active">Configure settings</div>
  <div snyStep status="error">Review errors</div>
  <div snyStep>Deploy</div>
</div>`;

  readonly stepsProps = computed<PropDef[]>(() => [
    { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: this.t().propDescriptions.orientation },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: this.t().propDescriptions.size },
    { name: 'class', type: 'string', default: "''", description: this.t().propDescriptions.class },
  ]);

  readonly stepProps = computed<PropDef[]>(() => [
    { name: 'status', type: "'default' | 'active' | 'completed' | 'error'", default: "'default'", description: this.t().stepPropDescriptions.status },
    { name: 'icon', type: 'string', default: "''", description: this.t().stepPropDescriptions.icon },
    { name: 'class', type: 'string', default: "''", description: this.t().stepPropDescriptions.class },
  ]);
}
