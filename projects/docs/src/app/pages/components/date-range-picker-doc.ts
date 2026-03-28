import { Component, computed, inject, signal } from '@angular/core';
import { CodeBlockComponent } from '../../shared/code-block';
import { ComponentPreviewComponent } from '../../shared/component-preview';
import { PropsTableComponent, type PropDef } from '../../shared/props-table';
import { SnyDateRangePickerComponent, type DateRange, type DatePickerPreset } from 'core';
import { I18nService } from '../../i18n/i18n.service';
import { DATE_RANGE_PICKER_DOC_EN } from '../../i18n/en/pages/date-range-picker-doc';
import { DATE_RANGE_PICKER_DOC_ES } from '../../i18n/es/pages/date-range-picker-doc';

@Component({
  selector: 'docs-date-range-picker-doc',
  standalone: true,
  imports: [CodeBlockComponent, ComponentPreviewComponent, PropsTableComponent, SnyDateRangePickerComponent],
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
        <h2 class="text-xl font-semibold">{{ t().singleCalendar }}</h2>
        <p class="text-sm text-muted-foreground">{{ t().singleCalendarDesc }}</p>
        <docs-component-preview [code]="singleCode" language="markup">
          <div class="w-full max-w-sm">
            <sny-date-range-picker [(value)]="singleRange" />
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ t().dualCalendar }}</h2>
        <p class="text-sm text-muted-foreground">{{ t().dualCalendarDesc }}</p>
        <docs-component-preview [code]="dualCode" language="markup">
          <div class="w-full max-w-md">
            <sny-date-range-picker [(value)]="dualRange" [dualCalendar]="true" />
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ t().presets }}</h2>
        <p class="text-sm text-muted-foreground">{{ t().presetsDesc }}</p>
        <docs-component-preview [code]="presetsCode" language="markup">
          <div class="w-full max-w-md">
            <sny-date-range-picker [(value)]="presetRange" [presets]="presets" />
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ t().fullExample }}</h2>
        <p class="text-sm text-muted-foreground">{{ t().fullExampleDesc }}</p>
        <docs-component-preview [code]="fullCode" language="markup">
          <div class="w-full max-w-lg">
            <sny-date-range-picker
              [(value)]="fullRange"
              [dualCalendar]="true"
              [presets]="presets"
              [clearable]="true"
              placeholder="Select dates..."
            />
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
export class DateRangePickerDocComponent {
  readonly i18n = inject(I18nService);
  readonly t = computed(() => (this.i18n.locale() === 'es' ? DATE_RANGE_PICKER_DOC_ES : DATE_RANGE_PICKER_DOC_EN));

  readonly singleRange = signal<DateRange | null>(null);
  readonly dualRange = signal<DateRange | null>(null);
  readonly presetRange = signal<DateRange | null>(null);
  readonly fullRange = signal<DateRange | null>(null);

  presets: DatePickerPreset[] = [
    { label: 'Today', range: { start: new Date(), end: new Date() } },
    {
      label: 'Last 7 days',
      range: { start: new Date(Date.now() - 7 * 86400000), end: new Date() },
    },
    {
      label: 'Last 30 days',
      range: { start: new Date(Date.now() - 30 * 86400000), end: new Date() },
    },
    {
      label: 'This month',
      range: {
        start: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        end: new Date(),
      },
    },
  ];

  importCode = `import { SnyDateRangePickerComponent, type DateRange, type DatePickerPreset } from '@sonny-ui/core';`;

  singleCode = `<sny-date-range-picker [(value)]="range" />`;

  dualCode = `<sny-date-range-picker [(value)]="range" [dualCalendar]="true" />`;

  presetsCode = `presets: DatePickerPreset[] = [
  { label: 'Today', range: { start: new Date(), end: new Date() } },
  { label: 'Last 7 days', range: { start: ..., end: new Date() } },
  { label: 'Last 30 days', range: { start: ..., end: new Date() } },
];

<sny-date-range-picker [(value)]="range" [presets]="presets" />`;

  fullCode = `<sny-date-range-picker
  [(value)]="range"
  [dualCalendar]="true"
  [presets]="presets"
  [clearable]="true"
  placeholder="Select dates..."
/>`;

  readonly props = computed<PropDef[]>(() => [
    { name: 'value', type: 'DateRange | null', default: 'null', description: this.t().propDescriptions.value },
    { name: 'placeholder', type: 'string', default: "'Pick a date range...'", description: this.t().propDescriptions.placeholder },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: this.t().propDescriptions.size },
    { name: 'locale', type: 'string', default: "'en-US'", description: this.t().propDescriptions.locale },
    { name: 'dateFormat', type: 'Intl.DateTimeFormatOptions', default: "{ month: 'short', ... }", description: this.t().propDescriptions.dateFormat },
    { name: 'separator', type: 'string', default: "' — '", description: this.t().propDescriptions.separator },
    { name: 'dualCalendar', type: 'boolean', default: 'false', description: this.t().propDescriptions.dualCalendar },
    { name: 'presets', type: 'DatePickerPreset[]', default: '[]', description: this.t().propDescriptions.presets },
    { name: 'min', type: 'Date | undefined', default: 'undefined', description: this.t().propDescriptions.min },
    { name: 'max', type: 'Date | undefined', default: 'undefined', description: this.t().propDescriptions.max },
    { name: 'clearable', type: 'boolean', default: 'true', description: this.t().propDescriptions.clearable },
    { name: 'disabled', type: 'boolean', default: 'false', description: this.t().propDescriptions.disabled },
  ]);
}
