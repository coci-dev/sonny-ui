import { Component, computed, inject, signal } from '@angular/core';
import { CodeBlockComponent } from '../../shared/code-block';
import { ComponentPreviewComponent } from '../../shared/component-preview';
import { PropsTableComponent, type PropDef } from '../../shared/props-table';
import { SnyColorPickerComponent, type ColorPickerPreset } from 'core';
import { I18nService } from '../../i18n/i18n.service';
import { COLOR_PICKER_DOC_EN } from '../../i18n/en/pages/color-picker-doc';
import { COLOR_PICKER_DOC_ES } from '../../i18n/es/pages/color-picker-doc';

@Component({
  selector: 'docs-color-picker-doc',
  standalone: true,
  imports: [CodeBlockComponent, ComponentPreviewComponent, PropsTableComponent, SnyColorPickerComponent],
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
          <sny-color-picker [(value)]="basicColor" />
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ t().inlineMode }}</h2>
        <p class="text-sm text-muted-foreground">{{ t().inlineModeDesc }}</p>
        <docs-component-preview [code]="inlineCode" language="markup">
          <sny-color-picker [(value)]="inlineColor" [inline]="true" />
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ t().formats }}</h2>
        <p class="text-sm text-muted-foreground">{{ t().formatsDesc }}</p>
        <docs-component-preview [code]="formatCode" language="markup">
          <sny-color-picker [(value)]="formatColor" format="rgb" [inline]="true" />
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ t().presetsSection }}</h2>
        <p class="text-sm text-muted-foreground">{{ t().presetsDesc }}</p>
        <docs-component-preview [code]="presetsCode" language="markup">
          <sny-color-picker [(value)]="presetColor" [presets]="presets" [inline]="true" />
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ t().favoritesSection }}</h2>
        <p class="text-sm text-muted-foreground">{{ t().favoritesDesc }}</p>
        <docs-component-preview [code]="favoritesCode" language="markup">
          <sny-color-picker [(value)]="favColor" [showFavorites]="true" [inline]="true" />
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ t().fullExample }}</h2>
        <p class="text-sm text-muted-foreground">{{ t().fullExampleDesc }}</p>
        <docs-component-preview [code]="fullCode" language="typescript">
          <div class="space-y-3">
            <sny-color-picker
              [(value)]="fullColor"
              [showFavorites]="true"
              [presets]="presets"
              (colorChange)="lastColorChange = $event"
            />
            <div class="flex items-center gap-2 text-sm">
              <div class="h-6 w-6 rounded-sm border border-border" [style.backgroundColor]="fullColor()"></div>
              <code class="text-xs font-mono bg-muted px-2 py-1 rounded">{{ fullColor() }}</code>
              @if (lastColorChange) {
                <span class="text-xs text-muted-foreground">Last change: {{ lastColorChange }}</span>
              }
            </div>
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
            <li>{{ item }}</li>
          }
        </ul>
      </section>
    </div>
  `,
})
export class ColorPickerDocComponent {
  readonly i18n = inject(I18nService);
  readonly t = computed(() => (this.i18n.locale() === 'es' ? COLOR_PICKER_DOC_ES : COLOR_PICKER_DOC_EN));

  readonly basicColor = signal('#3b82f6');
  readonly inlineColor = signal('#ef4444');
  readonly formatColor = signal('#10b981');
  readonly presetColor = signal('#f59e0b');
  readonly favColor = signal('#ec4899');
  readonly fullColor = signal('#6366f1');
  lastColorChange = '';

  presets: ColorPickerPreset[] = [
    {
      label: 'Tailwind',
      colors: ['#ef4444', '#f97316', '#f59e0b', '#22c55e', '#3b82f6', '#8b5cf6', '#ec4899', '#6b7280'],
    },
    {
      label: 'Neutral',
      colors: ['#000000', '#374151', '#6b7280', '#9ca3af', '#d1d5db', '#f3f4f6', '#ffffff'],
    },
  ];

  importCode = `import { SnyColorPickerComponent, type ColorPickerPreset } from '@sonny-ui/core';`;
  basicCode = `<sny-color-picker [(value)]="color" />`;
  inlineCode = `<sny-color-picker [(value)]="color" [inline]="true" />`;
  formatCode = `<sny-color-picker [(value)]="color" format="rgb" />`;
  presetsCode = `presets: ColorPickerPreset[] = [
  { label: 'Tailwind', colors: ['#ef4444', '#f97316', '#22c55e', '#3b82f6'] },
];

<sny-color-picker [(value)]="color" [presets]="presets" />`;

  favoritesCode = `<sny-color-picker [(value)]="color" [showFavorites]="true" />`;

  fullCode = `import { Component, signal } from '@angular/core';
import { SnyColorPickerComponent, type ColorPickerPreset } from '@sonny-ui/core';

@Component({
  selector: 'app-color-demo',
  standalone: true,
  imports: [SnyColorPickerComponent],
  template: \\\`
    <sny-color-picker
      [(value)]="color"
      [showFavorites]="true"
      [presets]="presets"
      (colorChange)="onColorChange($event)"
    />
    <p>Selected: {{ color() }}</p>
  \\\`,
})
export class ColorDemoComponent {
  readonly color = signal('#6366f1');

  presets: ColorPickerPreset[] = [
    {
      label: 'Brand',
      colors: ['#ef4444', '#f97316', '#22c55e', '#3b82f6', '#8b5cf6'],
    },
  ];

  onColorChange(color: string) {
    console.log('Color changed:', color);
  }
}`;

  readonly props = computed<PropDef[]>(() => [
    { name: 'value', type: 'string', default: "'#000000'", description: this.t().propDescriptions.value },
    { name: 'format', type: "'hex' | 'rgb' | 'hsl'", default: "'hex'", description: this.t().propDescriptions.format },
    { name: 'presets', type: 'ColorPickerPreset[]', default: '[]', description: this.t().propDescriptions.presets },
    { name: 'showInput', type: 'boolean', default: 'true', description: this.t().propDescriptions.showInput },
    { name: 'showEyeDropper', type: 'boolean', default: 'true', description: this.t().propDescriptions.showEyeDropper },
    { name: 'showFavorites', type: 'boolean', default: 'false', description: this.t().propDescriptions.showFavorites },
    { name: 'inline', type: 'boolean', default: 'false', description: this.t().propDescriptions.inline },
    { name: 'disabled', type: 'boolean', default: 'false', description: this.t().propDescriptions.disabled },
    { name: 'placeholder', type: 'string', default: "'Pick a color...'", description: this.t().propDescriptions.placeholder },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: this.t().propDescriptions.size },
    { name: 'colorChange', type: 'output<string>', default: '—', description: this.t().propDescriptions.colorChange },
    { name: 'formatChange', type: 'output<ColorFormat>', default: '—', description: this.t().propDescriptions.formatChange },
  ]);
}
