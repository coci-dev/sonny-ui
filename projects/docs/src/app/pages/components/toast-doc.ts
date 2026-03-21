import { Component, computed, inject, signal } from '@angular/core';
import { CodeBlockComponent } from '../../shared/code-block';
import { ComponentPreviewComponent } from '../../shared/component-preview';
import { PropsTableComponent, type PropDef } from '../../shared/props-table';
import { SnyButtonDirective, SnyToastService, SnyToasterComponent } from 'core';
import { I18nService } from '../../i18n/i18n.service';
import { TOAST_DOC_EN } from '../../i18n/en/pages/toast-doc';
import { TOAST_DOC_ES } from '../../i18n/es/pages/toast-doc';

@Component({
  selector: 'docs-toast-doc',
  standalone: true,
  imports: [CodeBlockComponent, ComponentPreviewComponent, PropsTableComponent, SnyButtonDirective, SnyToasterComponent],
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
        <h2 class="text-xl font-semibold">{{ t().setup }}</h2>
        <p class="text-sm text-muted-foreground" [innerHTML]="t().setupDesc"></p>
        <docs-code-block [code]="setupCode" language="html" />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.variants }}</h2>
        <docs-component-preview [code]="variantsCode">
          <button snyBtn (click)="showDefault()">Default</button>
          <button snyBtn variant="secondary" (click)="showSuccess()">Success</button>
          <button snyBtn variant="outline" (click)="showWarning()">Warning</button>
          <button snyBtn variant="destructive" (click)="showError()">Error</button>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ t().withAction }}</h2>
        <docs-component-preview [code]="actionCode">
          <button snyBtn variant="outline" (click)="showWithAction()">Show with Action</button>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.examples }}</h2>
        <p class="text-sm text-muted-foreground">{{ t().examplesDesc }}</p>

        <h3 class="text-lg font-medium">{{ t().asyncOperationFeedback }}</h3>
        <docs-component-preview [code]="asyncFeedbackCode" language="typescript">
          <div class="flex flex-col gap-4 items-start">
            <div class="flex gap-3">
              <button snyBtn [loading]="saving()" (click)="saveToApi()">
                {{ saving() ? 'Saving...' : 'Save to API' }}
              </button>
              <button snyBtn variant="outline" (click)="deleteWithUndo()">Delete Item</button>
            </div>
            <p class="text-xs text-muted-foreground">
              Try clicking "Save to API" — it randomly succeeds or fails to show both toast types.
            </p>
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.apiReference }}</h2>
        <h3 class="text-lg font-medium">{{ t().serviceLabel }}</h3>
        <docs-props-table [props]="serviceProps()" />
        <h3 class="text-lg font-medium mt-4">{{ t().toasterLabel }}</h3>
        <docs-props-table [props]="toasterProps()" />
        <h3 class="text-lg font-medium mt-4">{{ t().configLabel }}</h3>
        <docs-props-table [props]="configProps()" />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.accessibility }}</h2>
        <ul class="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
          @for (item of t().accessibility; track item) {
            <li [innerHTML]="item"></li>
          }
        </ul>
      </section>

      <sny-toaster position="bottom-right" />
    </div>
  `,
})
export class ToastDocComponent {
  readonly i18n = inject(I18nService);
  readonly t = computed(() => this.i18n.locale() === 'es' ? TOAST_DOC_ES : TOAST_DOC_EN);

  private readonly toastService = inject(SnyToastService);

  importCode = `import { SnyToastService, SnyToasterComponent } from '@sonny-ui/core';`;

  setupCode = `<!-- In your root component template -->
<sny-toaster position="bottom-right" />`;

  variantsCode = `toastService.show({ title: 'Event created', description: '...' });
toastService.success('Saved!', 'Your changes have been saved.');
toastService.warning('Warning', 'This action cannot be undone.');
toastService.error('Error', 'Something went wrong.');`;

  actionCode = `toastService.show({
  title: 'Message sent',
  description: 'Your message has been delivered.',
  action: {
    label: 'Undo',
    onClick: () => console.log('Undo clicked'),
  },
});`;

  readonly serviceProps = computed<PropDef[]>(() => [
    { name: 'show(config)', type: 'ToastConfig => string', default: '-', description: this.t().propDescriptions.show },
    { name: 'success(title, desc?)', type: 'string', default: '-', description: this.t().propDescriptions.success },
    { name: 'error(title, desc?)', type: 'string', default: '-', description: this.t().propDescriptions.error },
    { name: 'warning(title, desc?)', type: 'string', default: '-', description: this.t().propDescriptions.warning },
    { name: 'dismiss(id)', type: 'void', default: '-', description: this.t().propDescriptions.dismiss },
    { name: 'dismissAll()', type: 'void', default: '-', description: this.t().propDescriptions.dismissAll },
  ]);

  readonly toasterProps = computed<PropDef[]>(() => [
    { name: 'position', type: "'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center'", default: "'bottom-right'", description: this.t().propDescriptions.position },
    { name: 'maxToasts', type: 'number', default: '5', description: this.t().propDescriptions.maxToasts },
  ]);

  readonly configProps = computed<PropDef[]>(() => [
    { name: 'title', type: 'string', default: '-', description: this.t().propDescriptions.configTitle },
    { name: 'description', type: 'string', default: '-', description: this.t().propDescriptions.configDescription },
    { name: 'variant', type: "'default' | 'destructive' | 'success' | 'warning'", default: "'default'", description: this.t().propDescriptions.configVariant },
    { name: 'duration', type: 'number', default: '5000', description: this.t().propDescriptions.configDuration },
    { name: 'action', type: '{ label: string; onClick: () => void }', default: '-', description: this.t().propDescriptions.configAction },
  ]);

  // Examples state
  readonly saving = signal(false);

  async saveToApi() {
    this.saving.set(true);
    await new Promise(r => setTimeout(r, 1500));
    this.saving.set(false);

    if (Math.random() > 0.5) {
      this.toastService.success('Saved!', 'Your changes have been saved to the database.');
    } else {
      this.toastService.error('Save failed', 'Could not reach the server. Please try again.');
    }
  }

  deleteWithUndo() {
    this.toastService.show({
      title: 'Item deleted',
      description: 'The item has been removed.',
      variant: 'default',
      duration: 8000,
      action: {
        label: 'Undo',
        onClick: () => this.toastService.success('Restored!', 'The item has been restored.'),
      },
    });
  }

  asyncFeedbackCode = `@Component({
  imports: [SnyButtonDirective, SnyToasterComponent],
  template: \`
    <div class="flex flex-col gap-4 items-start">
      <div class="flex gap-3">
        <button snyBtn [loading]="saving()" (click)="saveToApi()">
          {{ saving() ? 'Saving...' : 'Save to API' }}
        </button>
        <button snyBtn variant="outline" (click)="deleteWithUndo()">Delete Item</button>
      </div>
    </div>
    <sny-toaster position="bottom-right" />
  \`,
})
export class AsyncFeedbackExample {
  private readonly toastService = inject(SnyToastService);
  readonly saving = signal(false);

  async saveToApi() {
    this.saving.set(true);
    await new Promise(r => setTimeout(r, 1500));
    this.saving.set(false);

    if (Math.random() > 0.5) {
      this.toastService.success('Saved!', 'Your changes have been saved to the database.');
    } else {
      this.toastService.error('Save failed', 'Could not reach the server. Please try again.');
    }
  }

  deleteWithUndo() {
    this.toastService.show({
      title: 'Item deleted',
      description: 'The item has been removed.',
      variant: 'default',
      duration: 8000,
      action: {
        label: 'Undo',
        onClick: () => this.toastService.success('Restored!', 'The item has been restored.'),
      },
    });
  }
}`;

  showDefault() {
    this.toastService.show({ title: 'Event created', description: 'Your event has been created successfully.' });
  }

  showSuccess() {
    this.toastService.success('Saved!', 'Your changes have been saved.');
  }

  showWarning() {
    this.toastService.warning('Warning', 'This action cannot be undone.');
  }

  showError() {
    this.toastService.error('Something went wrong', 'There was a problem with your request.');
  }

  showWithAction() {
    this.toastService.show({
      title: 'Message sent',
      description: 'Your message has been delivered.',
      action: { label: 'Undo', onClick: () => this.toastService.success('Undone!', 'Message recalled.') },
    });
  }
}
