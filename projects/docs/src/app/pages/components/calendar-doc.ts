import { Component, computed, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CodeBlockComponent } from '../../shared/code-block';
import { ComponentPreviewComponent } from '../../shared/component-preview';
import { PropsTableComponent, type PropDef } from '../../shared/props-table';
import { SnyCalendarComponent } from 'core';
import { I18nService } from '../../i18n/i18n.service';
import { CALENDAR_DOC_EN } from '../../i18n/en/pages/calendar-doc';
import { CALENDAR_DOC_ES } from '../../i18n/es/pages/calendar-doc';

@Component({
  selector: 'docs-calendar-doc',
  standalone: true,
  imports: [CodeBlockComponent, ComponentPreviewComponent, PropsTableComponent, SnyCalendarComponent, ReactiveFormsModule],
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
          <sny-calendar />
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.examples }}</h2>
        <h3 class="text-lg font-medium">{{ t().interactiveExample }}</h3>
        <docs-component-preview [code]="interactiveCode" language="typescript">
          <div class="space-y-2">
            <sny-calendar [(value)]="selectedDate" />
            <p class="text-sm text-muted-foreground">Selected: {{ selectedDate() ? selectedDate()!.toLocaleDateString() : 'None' }}</p>
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.reactiveForms }}</h2>
        <docs-component-preview [code]="reactiveFormsCode" language="typescript">
          <div class="space-y-2">
            <sny-calendar [formControl]="calendarCtrl" />
            <p class="text-sm text-muted-foreground">Value: {{ calendarCtrl.value ? calendarCtrl.value.toLocaleDateString() : 'None' }}</p>
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.apiReference }}</h2>
        <docs-props-table [props]="props()" />
      </section>
    </div>
  `,
})
export class CalendarDocComponent {
  readonly i18n = inject(I18nService);
  readonly t = computed(() => this.i18n.locale() === 'es' ? CALENDAR_DOC_ES : CALENDAR_DOC_EN);

  readonly calendarCtrl = new FormControl<Date | null>(null);
  readonly selectedDate = signal<Date | null>(null);

  reactiveFormsCode = `readonly calendarCtrl = new FormControl<Date | null>(null);

<sny-calendar [formControl]="calendarCtrl" />`;

  importCode = `import { SnyCalendarComponent } from '@sonny-ui/core';`;
  basicCode = `<sny-calendar />`;
  interactiveCode = `readonly selectedDate = signal<Date | null>(null);

<sny-calendar [(value)]="selectedDate" />`;

  readonly props = computed<PropDef[]>(() => [
    { name: 'value', type: 'Date | null', default: 'null', description: this.t().propDescriptions.value },
    { name: 'min', type: 'Date | null', default: 'null', description: this.t().propDescriptions.min },
    { name: 'max', type: 'Date | null', default: 'null', description: this.t().propDescriptions.max },
    { name: 'disabled', type: 'boolean', default: 'false', description: this.t().propDescriptions.disabled },
    { name: 'locale', type: 'string', default: "'en-US'", description: this.t().propDescriptions.locale },
    { name: 'class', type: 'string', default: "''", description: this.t().propDescriptions.class },
  ]);
}
