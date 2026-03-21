import { Component, signal } from '@angular/core';
import { CodeBlockComponent } from '../../shared/code-block';
import { ComponentPreviewComponent } from '../../shared/component-preview';
import { PropsTableComponent, type PropDef } from '../../shared/props-table';
import { SnyComboboxComponent, type ComboboxOption } from 'core';

@Component({
  selector: 'docs-combobox-doc',
  standalone: true,
  imports: [CodeBlockComponent, ComponentPreviewComponent, PropsTableComponent, SnyComboboxComponent],
  template: `
    <div class="space-y-8">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Combobox</h1>
        <p class="text-muted-foreground mt-2">A select-like component with a searchable dropdown list.</p>
      </div>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Import</h2>
        <docs-code-block [code]="importCode" language="typescript" />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Usage</h2>
        <docs-component-preview [code]="basicCode">
          <div class="w-56">
            <sny-combobox
              [options]="frameworks"
              placeholder="Select framework..."
              searchPlaceholder="Search framework..."
            />
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Examples</h2>
        <h3 class="text-lg font-medium">Country Selector</h3>
        <docs-component-preview [code]="exampleCode" language="typescript">
          <div class="space-y-4 w-56">
            <sny-combobox
              [options]="countries"
              [(value)]="selectedCountry"
              placeholder="Select country..."
              searchPlaceholder="Search countries..."
            />
            <p class="text-sm text-muted-foreground">
              Selected: {{ selectedCountry() || 'None' }}
            </p>
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">API Reference</h2>
        <docs-props-table [props]="props" />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Accessibility</h2>
        <ul class="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
          <li>Trigger button uses <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">role="combobox"</code> with <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">aria-expanded</code></li>
          <li>Dropdown uses <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">role="listbox"</code> with <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">role="option"</code></li>
          <li>Selected option indicated with a checkmark icon</li>
          <li>Keyboard navigation: Arrow keys, Enter to select, Escape to close</li>
        </ul>
      </section>
    </div>
  `,
})
export class ComboboxDocComponent {
  readonly selectedCountry = signal('');

  frameworks: ComboboxOption[] = [
    { value: 'angular', label: 'Angular' },
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue.js' },
    { value: 'svelte', label: 'Svelte' },
    { value: 'ember', label: 'Ember.js' },
    { value: 'next', label: 'Next.js' },
  ];

  countries: ComboboxOption[] = [
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'ca', label: 'Canada' },
    { value: 'de', label: 'Germany' },
    { value: 'fr', label: 'France' },
    { value: 'jp', label: 'Japan' },
    { value: 'au', label: 'Australia' },
    { value: 'br', label: 'Brazil' },
    { value: 'mx', label: 'Mexico' },
    { value: 'ar', label: 'Argentina' },
  ];

  importCode = `import { SnyComboboxComponent, type ComboboxOption } from '@sonny-ui/core';`;

  basicCode = `<sny-combobox
  [options]="frameworks"
  placeholder="Select framework..."
  searchPlaceholder="Search framework..."
/>`;

  exampleCode = `readonly selectedCountry = signal('');

countries: ComboboxOption[] = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  // ...
];

<sny-combobox
  [options]="countries"
  [(value)]="selectedCountry"
  placeholder="Select country..."
  searchPlaceholder="Search countries..."
/>
<p>Selected: {{ selectedCountry() }}</p>`;

  props: PropDef[] = [
    { name: 'options', type: 'ComboboxOption[]', default: '[]', description: 'Array of { value, label } objects.' },
    { name: 'value', type: 'string', default: "''", description: 'Two-way bound selected value.' },
    { name: 'placeholder', type: 'string', default: "'Select...'", description: 'Placeholder text for the trigger button.' },
    { name: 'searchPlaceholder', type: 'string', default: "'Search...'", description: 'Placeholder text for the search input inside the dropdown.' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'The size of the trigger button.' },
    { name: 'class', type: 'string', default: "''", description: 'Additional CSS classes to apply to the trigger.' },
  ];
}
