import { Component, inject, signal } from '@angular/core';
import { CodeBlockComponent } from '../../shared/code-block';
import { ComponentPreviewComponent } from '../../shared/component-preview';
import { PropsTableComponent, type PropDef } from '../../shared/props-table';
import { SnyButtonDirective, SnyToastService, SnyToasterComponent } from 'core';

@Component({
  selector: 'docs-toast-doc',
  standalone: true,
  imports: [CodeBlockComponent, ComponentPreviewComponent, PropsTableComponent, SnyButtonDirective, SnyToasterComponent],
  template: `
    <div class="space-y-8">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Toast</h1>
        <p class="text-muted-foreground mt-2">A succinct message that is displayed temporarily.</p>
      </div>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Import</h2>
        <docs-code-block [code]="importCode" language="typescript" />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Setup</h2>
        <p class="text-sm text-muted-foreground">
          Add the <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">&lt;sny-toaster&gt;</code> component to your root template:
        </p>
        <docs-code-block [code]="setupCode" language="html" />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Variants</h2>
        <docs-component-preview [code]="variantsCode">
          <button snyBtn (click)="showDefault()">Default</button>
          <button snyBtn variant="secondary" (click)="showSuccess()">Success</button>
          <button snyBtn variant="outline" (click)="showWarning()">Warning</button>
          <button snyBtn variant="destructive" (click)="showError()">Error</button>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">With Action</h2>
        <docs-component-preview [code]="actionCode">
          <button snyBtn variant="outline" (click)="showWithAction()">Show with Action</button>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Examples</h2>
        <p class="text-sm text-muted-foreground">Real-world usage patterns with state management.</p>

        <h3 class="text-lg font-medium">Async Operation Feedback</h3>
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
        <h2 class="text-xl font-semibold">API Reference</h2>
        <h3 class="text-lg font-medium">SnyToastService</h3>
        <docs-props-table [props]="serviceProps" />
        <h3 class="text-lg font-medium mt-4">SnyToasterComponent</h3>
        <docs-props-table [props]="toasterProps" />
        <h3 class="text-lg font-medium mt-4">ToastConfig</h3>
        <docs-props-table [props]="configProps" />
      </section>

      <sny-toaster position="bottom-right" />
    </div>
  `,
})
export class ToastDocComponent {
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

  serviceProps: PropDef[] = [
    { name: 'show(config)', type: 'ToastConfig => string', default: '-', description: 'Show a toast and return its ID.' },
    { name: 'success(title, desc?)', type: 'string', default: '-', description: 'Show a success toast.' },
    { name: 'error(title, desc?)', type: 'string', default: '-', description: 'Show an error/destructive toast.' },
    { name: 'warning(title, desc?)', type: 'string', default: '-', description: 'Show a warning toast.' },
    { name: 'dismiss(id)', type: 'void', default: '-', description: 'Dismiss a specific toast.' },
    { name: 'dismissAll()', type: 'void', default: '-', description: 'Dismiss all toasts.' },
  ];

  toasterProps: PropDef[] = [
    { name: 'position', type: "'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center'", default: "'bottom-right'", description: 'Where toasts appear on screen.' },
    { name: 'maxToasts', type: 'number', default: '5', description: 'Maximum visible toasts at once.' },
  ];

  configProps: PropDef[] = [
    { name: 'title', type: 'string', default: '-', description: 'The toast title (required).' },
    { name: 'description', type: 'string', default: '-', description: 'Optional description text.' },
    { name: 'variant', type: "'default' | 'destructive' | 'success' | 'warning'", default: "'default'", description: 'The visual style.' },
    { name: 'duration', type: 'number', default: '5000', description: 'Auto-dismiss time in ms. 0 to disable.' },
    { name: 'action', type: '{ label: string; onClick: () => void }', default: '-', description: 'Optional action button.' },
  ];

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
