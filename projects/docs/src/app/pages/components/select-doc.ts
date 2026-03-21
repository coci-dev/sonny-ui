import { Component, signal } from '@angular/core';
import { CodeBlockComponent } from '../../shared/code-block';
import { ComponentPreviewComponent } from '../../shared/component-preview';
import { PropsTableComponent, type PropDef } from '../../shared/props-table';
import { SnySelectComponent, SnyLabelDirective } from 'core';

@Component({
  selector: 'docs-select-doc',
  standalone: true,
  imports: [CodeBlockComponent, ComponentPreviewComponent, PropsTableComponent, SnySelectComponent, SnyLabelDirective],
  template: `
    <div class="space-y-8">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Select</h1>
        <p class="text-muted-foreground mt-2">Displays a list of options for the user to pick from.</p>
      </div>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Import</h2>
        <docs-code-block [code]="importCode" language="typescript" />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Usage</h2>
        <docs-component-preview [code]="basicCode">
          <div class="w-full max-w-xs space-y-2">
            <label snyLabel>Timezone</label>
            <sny-select [options]="timezones" [(value)]="selectedTimezone" placeholder="Select timezone..." />
            <p class="text-sm text-muted-foreground">Selected: {{ selectedTimezone() || 'None' }}</p>
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Examples</h2>
        <h3 class="text-lg font-medium">User Profile Form</h3>
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
        <h2 class="text-xl font-semibold">API Reference</h2>
        <docs-props-table [props]="props" />
      </section>
    </div>
  `,
})
export class SelectDocComponent {
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

  props: PropDef[] = [
    { name: 'options', type: 'SelectOption[]', default: '[]', description: 'Array of { value, label } objects.' },
    { name: 'value', type: 'string', default: "''", description: 'Selected value. Supports two-way binding.' },
    { name: 'placeholder', type: 'string', default: "'Select...'", description: 'Placeholder text.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the select is disabled.' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'The size of the select trigger.' },
  ];
}
