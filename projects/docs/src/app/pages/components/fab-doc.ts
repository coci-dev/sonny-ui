import { Component, computed, inject } from '@angular/core';
import { CodeBlockComponent } from '../../shared/code-block';
import { ComponentPreviewComponent } from '../../shared/component-preview';
import { PropsTableComponent, type PropDef } from '../../shared/props-table';
import { SnyFabDirective, SnyFabTriggerDirective, SnyFabActionDirective } from 'core';
import { I18nService } from '../../i18n/i18n.service';
import { FAB_DOC_EN } from '../../i18n/en/pages/fab-doc';
import { FAB_DOC_ES } from '../../i18n/es/pages/fab-doc';

@Component({
  selector: 'docs-fab-doc',
  standalone: true,
  imports: [
    CodeBlockComponent,
    ComponentPreviewComponent,
    PropsTableComponent,
    SnyFabDirective,
    SnyFabTriggerDirective,
    SnyFabActionDirective,
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
          <div class="relative h-48 w-full border rounded-lg">
            <div snyFab position="bottom-right">
              <button snyFabTrigger>+</button>
              <button snyFabAction label="Edit">E</button>
              <button snyFabAction label="Share">S</button>
              <button snyFabAction label="Delete">D</button>
            </div>
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.apiReference }}</h2>
        <h3 class="text-lg font-medium">{{ t().fab }}</h3>
        <docs-props-table [props]="fabProps()" />
        <h3 class="text-lg font-medium mt-4">{{ t().fabTrigger }}</h3>
        <docs-props-table [props]="triggerProps()" />
        <h3 class="text-lg font-medium mt-4">{{ t().fabAction }}</h3>
        <docs-props-table [props]="actionProps()" />
      </section>
    </div>
  `,
})
export class FabDocComponent {
  readonly i18n = inject(I18nService);
  readonly t = computed(() => this.i18n.locale() === 'es' ? FAB_DOC_ES : FAB_DOC_EN);

  importCode = `import {
  SnyFabDirective,
  SnyFabTriggerDirective,
  SnyFabActionDirective,
} from '@sonny-ui/core';`;

  basicCode = `<div snyFab position="bottom-right">
  <button snyFabTrigger>+</button>
  <button snyFabAction label="Edit">E</button>
  <button snyFabAction label="Share">S</button>
  <button snyFabAction label="Delete">D</button>
</div>`;

  readonly fabProps = computed<PropDef[]>(() => [
    { name: 'position', type: "'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'", default: "'bottom-right'", description: this.t().propDescriptions.position },
    { name: 'direction', type: "'up' | 'down' | 'left' | 'right'", default: "'up'", description: this.t().propDescriptions.direction },
    { name: 'class', type: 'string', default: "''", description: this.t().propDescriptions.class },
  ]);

  readonly triggerProps = computed<PropDef[]>(() => [
    { name: 'class', type: 'string', default: "''", description: this.t().triggerPropDescriptions.class },
  ]);

  readonly actionProps = computed<PropDef[]>(() => [
    { name: 'ariaLabel', type: 'string', default: "''", description: this.t().actionPropDescriptions.ariaLabel },
    { name: 'class', type: 'string', default: "''", description: this.t().actionPropDescriptions.class },
  ]);
}
