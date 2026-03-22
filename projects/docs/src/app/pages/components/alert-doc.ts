import { Component, computed, inject, signal } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { CodeBlockComponent } from '../../shared/code-block';
import { ComponentPreviewComponent } from '../../shared/component-preview';
import { PropsTableComponent, type PropDef } from '../../shared/props-table';
import {
  SnyAlertDirective,
  SnyAlertTitleDirective,
  SnyAlertDescriptionDirective,
  type AlertVariant,
} from 'core';
import { I18nService } from '../../i18n/i18n.service';
import { ALERT_DOC_EN } from '../../i18n/en/pages/alert-doc';
import { ALERT_DOC_ES } from '../../i18n/es/pages/alert-doc';

@Component({
  selector: 'docs-alert-doc',
  standalone: true,
  imports: [
    CodeBlockComponent,
    ComponentPreviewComponent,
    PropsTableComponent,
    SnyAlertDirective,
    SnyAlertTitleDirective,
    SnyAlertDescriptionDirective,
    TitleCasePipe,
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
          <div snyAlert>
            <h5 snyAlertTitle>Heads up!</h5>
            <p snyAlertDescription>You can use alerts to show important messages.</p>
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.variants }}</h2>
        <docs-component-preview [code]="variantsCode">
          <div class="space-y-4 w-full">
            @for (v of variants; track v) {
              <div snyAlert [variant]="v">
                <h5 snyAlertTitle>{{ v | titlecase }}</h5>
                <p snyAlertDescription>This is a {{ v }} alert message.</p>
              </div>
            }
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.examples }}</h2>
        <h3 class="text-lg font-medium">{{ t().dismissibleAlerts }}</h3>
        <docs-component-preview [code]="dismissCode">
          <div class="w-full">
            @if (showAlert()) {
              <div snyAlert variant="warning" #alertRef="snyAlert">
                <h5 snyAlertTitle>Warning</h5>
                <p snyAlertDescription>This alert can be dismissed.</p>
                <button
                  class="absolute right-2 top-2 rounded-md p-1 opacity-70 hover:opacity-100"
                  (click)="alertRef.dismiss(); showAlert.set(false)"
                >
                  ✕
                </button>
              </div>
            }
            @if (!showAlert()) {
              <button
                class="text-sm text-muted-foreground hover:text-foreground underline"
                (click)="showAlert.set(true)"
              >
                Show alert again
              </button>
            }
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
export class AlertDocComponent {
  readonly i18n = inject(I18nService);
  readonly t = computed(() => (this.i18n.locale() === 'es' ? ALERT_DOC_ES : ALERT_DOC_EN));

  variants: AlertVariant[] = ['default', 'destructive', 'success', 'warning', 'info'];
  readonly showAlert = signal(true);

  importCode = `import { SnyAlertDirective, SnyAlertTitleDirective, SnyAlertDescriptionDirective } from '@sonny-ui/core';`;

  basicCode = `<div snyAlert>
  <h5 snyAlertTitle>Heads up!</h5>
  <p snyAlertDescription>You can use alerts to show important messages.</p>
</div>`;

  variantsCode = `<div snyAlert variant="destructive">
  <h5 snyAlertTitle>Error</h5>
  <p snyAlertDescription>Something went wrong.</p>
</div>

<div snyAlert variant="success">
  <h5 snyAlertTitle>Success</h5>
  <p snyAlertDescription>Operation completed.</p>
</div>`;

  dismissCode = `<div snyAlert variant="warning" #alertRef="snyAlert">
  <h5 snyAlertTitle>Warning</h5>
  <p snyAlertDescription>This alert can be dismissed.</p>
  <button (click)="alertRef.dismiss()">✕</button>
</div>`;

  readonly props = computed<PropDef[]>(() => [
    {
      name: 'variant',
      type: "'default' | 'destructive' | 'success' | 'warning' | 'info'",
      default: "'default'",
      description: this.t().propDescriptions.variant,
    },
    {
      name: 'dismissible',
      type: 'boolean',
      default: 'false',
      description: this.t().propDescriptions.dismissible,
    },
    {
      name: 'class',
      type: 'string',
      default: "''",
      description: this.t().propDescriptions.class,
    },
  ]);
}
