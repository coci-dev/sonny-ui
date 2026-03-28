import { Component, computed, inject, signal } from '@angular/core';
import { CodeBlockComponent } from '../../shared/code-block';
import { ComponentPreviewComponent } from '../../shared/component-preview';
import { PropsTableComponent, type PropDef } from '../../shared/props-table';
import { SnyDatePickerComponent } from 'core';
import { I18nService } from '../../i18n/i18n.service';
import { DATE_PICKER_DOC_EN } from '../../i18n/en/pages/date-picker-doc';
import { DATE_PICKER_DOC_ES } from '../../i18n/es/pages/date-picker-doc';

@Component({
  selector: 'docs-date-picker-doc',
  standalone: true,
  imports: [CodeBlockComponent, ComponentPreviewComponent, PropsTableComponent, SnyDatePickerComponent],
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
          <div class="w-full max-w-sm">
            <sny-date-picker [(value)]="selectedDate" />
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ t().clearable }}</h2>
        <p class="text-sm text-muted-foreground">{{ t().clearableDesc }}</p>
        <docs-component-preview [code]="clearableCode" language="markup">
          <div class="w-full max-w-sm">
            <sny-date-picker [(value)]="clearableDate" [clearable]="true" />
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ t().constraints }}</h2>
        <p class="text-sm text-muted-foreground">{{ t().constraintsDesc }}</p>
        <docs-component-preview [code]="constraintsCode" language="markup">
          <div class="w-full max-w-sm">
            <sny-date-picker [(value)]="constrainedDate" [min]="minDate" [max]="maxDate" placeholder="Within next 30 days..." />
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
export class DatePickerDocComponent {
  readonly i18n = inject(I18nService);
  readonly t = computed(() => (this.i18n.locale() === 'es' ? DATE_PICKER_DOC_ES : DATE_PICKER_DOC_EN));

  readonly selectedDate = signal<Date | null>(null);
  readonly clearableDate = signal<Date | null>(new Date());
  readonly constrainedDate = signal<Date | null>(null);

  readonly minDate = new Date();
  readonly maxDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

  importCode = `import { SnyDatePickerComponent } from '@sonny-ui/core';`;

  basicCode = `<sny-date-picker [(value)]="selectedDate" />`;

  clearableCode = `<sny-date-picker [(value)]="date" [clearable]="true" />`;

  constraintsCode = `<sny-date-picker
  [(value)]="date"
  [min]="minDate"
  [max]="maxDate"
  placeholder="Within next 30 days..."
/>`;

  readonly props = computed<PropDef[]>(() => [
    { name: 'value', type: 'Date | null', default: 'null', description: this.t().propDescriptions.value },
    { name: 'placeholder', type: 'string', default: "'Pick a date...'", description: this.t().propDescriptions.placeholder },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: this.t().propDescriptions.size },
    { name: 'locale', type: 'string', default: "'en-US'", description: this.t().propDescriptions.locale },
    { name: 'dateFormat', type: 'Intl.DateTimeFormatOptions', default: "{ month: 'short', ... }", description: this.t().propDescriptions.dateFormat },
    { name: 'min', type: 'Date | undefined', default: 'undefined', description: this.t().propDescriptions.min },
    { name: 'max', type: 'Date | undefined', default: 'undefined', description: this.t().propDescriptions.max },
    { name: 'clearable', type: 'boolean', default: 'true', description: this.t().propDescriptions.clearable },
    { name: 'disabled', type: 'boolean', default: 'false', description: this.t().propDescriptions.disabled },
  ]);
}
