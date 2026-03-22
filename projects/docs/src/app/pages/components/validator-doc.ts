import { Component, computed, inject } from '@angular/core';
import { CodeBlockComponent } from '../../shared/code-block';
import { ComponentPreviewComponent } from '../../shared/component-preview';
import { PropsTableComponent, type PropDef } from '../../shared/props-table';
import { SnyValidatorDirective, SnyValidatorHintDirective } from 'core';
import { I18nService } from '../../i18n/i18n.service';
import { VALIDATOR_DOC_EN } from '../../i18n/en/pages/validator-doc';
import { VALIDATOR_DOC_ES } from '../../i18n/es/pages/validator-doc';

@Component({
  selector: 'docs-validator-doc',
  standalone: true,
  imports: [
    CodeBlockComponent,
    ComponentPreviewComponent,
    PropsTableComponent,
    SnyValidatorDirective,
    SnyValidatorHintDirective,
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
        <docs-component-preview [code]="basicCode">
          <div snyValidator state="error" class="max-w-sm">
            <span snyValidatorHint type="error">This field is required.</span>
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.examples }}</h2>
        <h3 class="text-lg font-medium">{{ t().withFormField }}</h3>
        <docs-component-preview [code]="exampleCode">
          <div class="space-y-4 max-w-sm">
            <div snyValidator state="error">
              <span snyValidatorHint type="error">Please enter a valid email address.</span>
            </div>
            <div snyValidator state="success">
              <span snyValidatorHint type="success">Email is available!</span>
            </div>
            <div snyValidator state="warning">
              <span snyValidatorHint type="warning">Password strength is weak.</span>
            </div>
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.apiReference }}</h2>
        <h3 class="text-lg font-medium">{{ t().validator }}</h3>
        <docs-props-table [props]="validatorProps()" />
        <h3 class="text-lg font-medium mt-4">{{ t().validatorHint }}</h3>
        <docs-props-table [props]="hintProps()" />
      </section>
    </div>
  `,
})
export class ValidatorDocComponent {
  readonly i18n = inject(I18nService);
  readonly t = computed(() => this.i18n.locale() === 'es' ? VALIDATOR_DOC_ES : VALIDATOR_DOC_EN);

  importCode = `import {
  SnyValidatorDirective,
  SnyValidatorHintDirective,
} from '@sonny-ui/core';`;

  basicCode = `<div snyValidator state="error">
  <span snyValidatorHint type="error">This field is required.</span>
</div>`;

  exampleCode = `<div snyValidator state="error">
  <span snyValidatorHint type="error">Please enter a valid email address.</span>
</div>

<div snyValidator state="success">
  <span snyValidatorHint type="success">Email is available!</span>
</div>

<div snyValidator state="warning">
  <span snyValidatorHint type="warning">Password strength is weak.</span>
</div>`;

  readonly validatorProps = computed<PropDef[]>(() => [
    { name: 'state', type: "'default' | 'error' | 'success' | 'warning'", default: "'default'", description: this.t().propDescriptions.state },
    { name: 'class', type: 'string', default: "''", description: this.t().propDescriptions.class },
  ]);

  readonly hintProps = computed<PropDef[]>(() => [
    { name: 'type', type: "'error' | 'success' | 'warning' | 'info'", default: "'error'", description: this.t().hintPropDescriptions.type },
    { name: 'class', type: 'string', default: "''", description: this.t().hintPropDescriptions.class },
  ]);
}
