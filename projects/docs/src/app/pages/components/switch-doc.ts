import { Component, signal } from '@angular/core';
import { CodeBlockComponent } from '../../shared/code-block';
import { ComponentPreviewComponent } from '../../shared/component-preview';
import { PropsTableComponent, type PropDef } from '../../shared/props-table';
import { SnySwitchComponent, SnyLabelDirective } from 'core';

@Component({
  selector: 'docs-switch-doc',
  standalone: true,
  imports: [CodeBlockComponent, ComponentPreviewComponent, PropsTableComponent, SnySwitchComponent, SnyLabelDirective],
  template: `
    <div class="space-y-8">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Switch</h1>
        <p class="text-muted-foreground mt-2">A toggle switch for turning settings on or off.</p>
      </div>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Import</h2>
        <docs-code-block [code]="importCode" language="typescript" />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Usage</h2>
        <docs-component-preview [code]="basicCode">
          <div class="flex items-center gap-3">
            <sny-switch [(checked)]="darkMode" />
            <label snyLabel>Dark Mode: {{ darkMode() ? 'ON' : 'OFF' }}</label>
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Sizes</h2>
        <docs-component-preview [code]="sizesCode">
          <div class="flex items-center gap-6">
            <div class="flex items-center gap-2">
              <sny-switch size="sm" />
              <label snyLabel>Small</label>
            </div>
            <div class="flex items-center gap-2">
              <sny-switch size="md" />
              <label snyLabel>Medium</label>
            </div>
            <div class="flex items-center gap-2">
              <sny-switch size="lg" />
              <label snyLabel>Large</label>
            </div>
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Examples</h2>
        <h3 class="text-lg font-medium">Settings Panel</h3>
        <docs-component-preview [code]="exampleCode" language="typescript">
          <div class="space-y-4 max-w-sm w-full">
            <div class="flex items-center justify-between">
              <label snyLabel>Notifications</label>
              <sny-switch [(checked)]="notifications" />
            </div>
            <div class="flex items-center justify-between">
              <label snyLabel>Marketing emails</label>
              <sny-switch [(checked)]="marketing" />
            </div>
            <div class="flex items-center justify-between">
              <label snyLabel>Auto-updates</label>
              <sny-switch [(checked)]="autoUpdates" />
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
export class SwitchDocComponent {
  readonly darkMode = signal(false);
  readonly notifications = signal(true);
  readonly marketing = signal(false);
  readonly autoUpdates = signal(true);

  importCode = `import { SnySwitchComponent } from '@sonny-ui/core';`;
  basicCode = `<sny-switch [(checked)]="darkMode" />`;
  sizesCode = `<sny-switch size="sm" />
<sny-switch size="md" />
<sny-switch size="lg" />`;
  exampleCode = `readonly notifications = signal(true);
readonly marketing = signal(false);

<div class="flex items-center justify-between">
  <label snyLabel>Notifications</label>
  <sny-switch [(checked)]="notifications" />
</div>`;

  props: PropDef[] = [
    { name: 'checked', type: 'boolean', default: 'false', description: 'Whether the switch is on. Supports two-way binding.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the switch is disabled.' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'The size of the switch.' },
    { name: 'class', type: 'string', default: "''", description: 'Additional CSS classes to apply.' },
  ];
}
