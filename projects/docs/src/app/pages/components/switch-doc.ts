import { Component, computed, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CodeBlockComponent } from '../../shared/code-block';
import { ComponentPreviewComponent } from '../../shared/component-preview';
import { PropsTableComponent, type PropDef } from '../../shared/props-table';
import { SnySwitchComponent, SnyLabelDirective } from 'core';
import { I18nService } from '../../i18n/i18n.service';
import { SWITCH_DOC_EN } from '../../i18n/en/pages/switch-doc';
import { SWITCH_DOC_ES } from '../../i18n/es/pages/switch-doc';

@Component({
  selector: 'docs-switch-doc',
  standalone: true,
  imports: [CodeBlockComponent, ComponentPreviewComponent, PropsTableComponent, SnySwitchComponent, SnyLabelDirective, ReactiveFormsModule],
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
          <div class="flex items-center gap-3">
            <sny-switch [(checked)]="darkMode" />
            <label snyLabel>Dark Mode: {{ darkMode() ? 'ON' : 'OFF' }}</label>
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.sizes }}</h2>
        <docs-component-preview [code]="sizesCode">
          <div class="flex items-center gap-6">
            <div class="flex items-center gap-2">
              <sny-switch size="sm" />
              <label snyLabel>Small</label>
            </div>
            <div class="flex items-center gap-2">
              <sny-switch size="md" />
              <label snyLabel>Medium</label>
            </div>
            <div class="flex items-center gap-2">
              <sny-switch size="lg" />
              <label snyLabel>Large</label>
            </div>
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.examples }}</h2>
        <h3 class="text-lg font-medium">{{ t().settingsPanel }}</h3>
        <docs-component-preview [code]="exampleCode" language="typescript">
          <div class="space-y-4 max-w-sm w-full">
            <div class="flex items-center justify-between">
              <label snyLabel>Notifications</label>
              <sny-switch [(checked)]="notifications" />
            </div>
            <div class="flex items-center justify-between">
              <label snyLabel>Marketing emails</label>
              <sny-switch [(checked)]="marketing" />
            </div>
            <div class="flex items-center justify-between">
              <label snyLabel>Auto-updates</label>
              <sny-switch [(checked)]="autoUpdates" />
            </div>
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.reactiveForms }}</h2>
        <docs-component-preview [code]="reactiveFormsCode" language="typescript">
          <div class="flex items-center gap-3">
            <sny-switch [formControl]="switchCtrl" />
            <label snyLabel>Value: {{ switchCtrl.value }}</label>
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
export class SwitchDocComponent {
  readonly i18n = inject(I18nService);
  readonly t = computed(() => this.i18n.locale() === 'es' ? SWITCH_DOC_ES : SWITCH_DOC_EN);

  readonly switchCtrl = new FormControl(false);
  readonly darkMode = signal(false);
  readonly notifications = signal(true);
  readonly marketing = signal(false);
  readonly autoUpdates = signal(true);

  reactiveFormsCode = `import { FormControl, ReactiveFormsModule } from '@angular/forms';

readonly switchCtrl = new FormControl(false);

<sny-switch [formControl]="switchCtrl" />`;

  importCode = `import { SnySwitchComponent } from '@sonny-ui/core';`;
  basicCode = `<sny-switch [(checked)]="darkMode" />`;
  sizesCode = `<sny-switch size="sm" />
<sny-switch size="md" />
<sny-switch size="lg" />`;
  exampleCode = `readonly notifications = signal(true);
readonly marketing = signal(false);

<div class="flex items-center justify-between">
  <label snyLabel>Notifications</label>
  <sny-switch [(checked)]="notifications" />
</div>`;

  readonly props = computed<PropDef[]>(() => [
    { name: 'checked', type: 'boolean', default: 'false', description: this.t().propDescriptions.checked },
    { name: 'disabled', type: 'boolean', default: 'false', description: this.t().propDescriptions.disabled },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: this.t().propDescriptions.size },
    { name: 'class', type: 'string', default: "''", description: this.t().propDescriptions.class },
  ]);
}
