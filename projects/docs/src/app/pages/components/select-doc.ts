import { Component, computed, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CodeBlockComponent } from '../../shared/code-block';
import { ComponentPreviewComponent } from '../../shared/component-preview';
import { PropsTableComponent, type PropDef } from '../../shared/props-table';
import { SnySelectComponent, SnyLabelDirective } from 'core';
import { I18nService } from '../../i18n/i18n.service';
import { SELECT_DOC_EN } from '../../i18n/en/pages/select-doc';
import { SELECT_DOC_ES } from '../../i18n/es/pages/select-doc';

@Component({
  selector: 'docs-select-doc',
  standalone: true,
  imports: [CodeBlockComponent, ComponentPreviewComponent, PropsTableComponent, SnySelectComponent, SnyLabelDirective, ReactiveFormsModule],
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
          <div class="w-full max-w-xs space-y-2">
            <label snyLabel>Timezone</label>
            <sny-select [options]="timezones" [(value)]="selectedTimezone" placeholder="Select timezone..." />
            <p class="text-sm text-muted-foreground">Selected: {{ selectedTimezone() || 'None' }}</p>
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.examples }}</h2>
        <h3 class="text-lg font-medium">{{ t().userProfileForm }}</h3>
        <docs-component-preview [code]="exampleCode" language="typescript">
          <div class="w-full max-w-xs space-y-4">
            <div class="space-y-2">
              <label snyLabel>Language</label>
              <sny-select [options]="languages" [(value)]="selectedLanguage" placeholder="Select language..." />
            </div>
            <div class="space-y-2">
              <label snyLabel>Theme</label>
              <sny-select [options]="themes" [(value)]="selectedTheme" placeholder="Select theme..." />
            </div>
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.reactiveForms }}</h2>
        <docs-component-preview [code]="reactiveFormsCode" language="typescript">
          <div class="w-full max-w-xs space-y-2">
            <label snyLabel>Theme</label>
            <sny-select [options]="themes" [formControl]="selectCtrl" placeholder="Select theme..." />
            <p class="text-sm text-muted-foreground">Value: {{ selectCtrl.value }}</p>
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
export class SelectDocComponent {
  readonly i18n = inject(I18nService);
  readonly t = computed(() => this.i18n.locale() === 'es' ? SELECT_DOC_ES : SELECT_DOC_EN);

  readonly selectCtrl = new FormControl('');
  readonly selectedTimezone = signal('');
  readonly selectedLanguage = signal('');
  readonly selectedTheme = signal('');

  timezones = [
    { value: 'utc', label: 'UTC' },
    { value: 'est', label: 'Eastern Time (EST)' },
    { value: 'pst', label: 'Pacific Time (PST)' },
    { value: 'cet', label: 'Central European (CET)' },
    { value: 'jst', label: 'Japan Standard (JST)' },
  ];

  languages = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
    { value: 'de', label: 'German' },
    { value: 'ja', label: 'Japanese' },
  ];

  themes = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
    { value: 'system', label: 'System' },
  ];

  reactiveFormsCode = `readonly selectCtrl = new FormControl('');

<sny-select [options]="themes" [formControl]="selectCtrl" />`;

  importCode = `import { SnySelectComponent } from '@sonny-ui/core';`;
  basicCode = `<sny-select
  [options]="timezones"
  [(value)]="selectedTimezone"
  placeholder="Select timezone..." />`;
  exampleCode = `readonly selectedLanguage = signal('');

languages = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Spanish' },
];

<sny-select [options]="languages" [(value)]="selectedLanguage" />`;

  readonly props = computed<PropDef[]>(() => [
    { name: 'options', type: 'SelectOption[]', default: '[]', description: this.t().propDescriptions.options },
    { name: 'value', type: 'string', default: "''", description: this.t().propDescriptions.value },
    { name: 'placeholder', type: 'string', default: "'Select...'", description: this.t().propDescriptions.placeholder },
    { name: 'disabled', type: 'boolean', default: 'false', description: this.t().propDescriptions.disabled },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: this.t().propDescriptions.size },
  ]);
}
