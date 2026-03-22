import { Component, computed, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CodeBlockComponent } from '../../shared/code-block';
import { ComponentPreviewComponent } from '../../shared/component-preview';
import { PropsTableComponent, type PropDef } from '../../shared/props-table';
import { I18nService } from '../../i18n/i18n.service';
import { COMBOBOX_DOC_EN } from '../../i18n/en/pages/combobox-doc';
import { COMBOBOX_DOC_ES } from '../../i18n/es/pages/combobox-doc';
import { SnyComboboxComponent, type ComboboxOption } from 'core';

@Component({
  selector: 'docs-combobox-doc',
  standalone: true,
  imports: [CodeBlockComponent, ComponentPreviewComponent, PropsTableComponent, SnyComboboxComponent, ReactiveFormsModule],
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
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.examples }}</h2>
        <h3 class="text-lg font-medium">{{ t().countrySelector }}</h3>
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
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.reactiveForms }}</h2>
        <docs-component-preview [code]="reactiveFormsCode" language="typescript">
          <div class="w-56 space-y-2">
            <sny-combobox [options]="frameworks" [formControl]="comboboxCtrl" placeholder="Select framework..." searchPlaceholder="Search..." />
            <p class="text-sm text-muted-foreground">Value: {{ comboboxCtrl.value }}</p>
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
export class ComboboxDocComponent {
  readonly i18n = inject(I18nService);
  readonly t = computed(() => this.i18n.locale() === 'es' ? COMBOBOX_DOC_ES : COMBOBOX_DOC_EN);

  readonly comboboxCtrl = new FormControl('');
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

  reactiveFormsCode = `readonly comboboxCtrl = new FormControl('');

<sny-combobox [options]="frameworks" [formControl]="comboboxCtrl" />`;

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

  readonly props = computed<PropDef[]>(() => [
    { name: 'options', type: 'ComboboxOption[]', default: '[]', description: this.t().propDescriptions.options },
    { name: 'value', type: 'string', default: "''", description: this.t().propDescriptions.value },
    { name: 'placeholder', type: 'string', default: "'Select...'", description: this.t().propDescriptions.placeholder },
    { name: 'searchPlaceholder', type: 'string', default: "'Search...'", description: this.t().propDescriptions.searchPlaceholder },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: this.t().propDescriptions.size },
    { name: 'class', type: 'string', default: "''", description: this.t().propDescriptions.class },
  ]);
}
