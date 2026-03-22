import { Component, computed, inject } from '@angular/core';
import { CodeBlockComponent } from '../../shared/code-block';
import { ComponentPreviewComponent } from '../../shared/component-preview';
import { PropsTableComponent, type PropDef } from '../../shared/props-table';
import { SnyDockDirective, SnyDockItemDirective } from 'core';
import { I18nService } from '../../i18n/i18n.service';
import { DOCK_DOC_EN } from '../../i18n/en/pages/dock-doc';
import { DOCK_DOC_ES } from '../../i18n/es/pages/dock-doc';

@Component({
  selector: 'docs-dock-doc',
  standalone: true,
  imports: [
    CodeBlockComponent,
    ComponentPreviewComponent,
    PropsTableComponent,
    SnyDockDirective,
    SnyDockItemDirective,
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
          <div snyDock class="relative">
            @for (item of dockItems; track item) {
              <button snyDockItem [attr.aria-label]="item">
                <span class="text-2xl">{{ item }}</span>
              </button>
            }
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.apiReference }}</h2>
        <h3 class="text-lg font-medium">{{ t().dock }}</h3>
        <docs-props-table [props]="dockProps()" />
        <h3 class="text-lg font-medium mt-4">{{ t().dockItem }}</h3>
        <docs-props-table [props]="itemProps()" />
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
export class DockDocComponent {
  readonly i18n = inject(I18nService);
  readonly t = computed(() => this.i18n.locale() === 'es' ? DOCK_DOC_ES : DOCK_DOC_EN);

  dockItems = ['Home', 'Search', 'Mail', 'Photos', 'Settings'];

  importCode = `import { SnyDockDirective, SnyDockItemDirective } from '@sonny-ui/core';`;

  basicCode = `<div snyDock>
  <button snyDockItem aria-label="Home">Home</button>
  <button snyDockItem aria-label="Search">Search</button>
  <button snyDockItem aria-label="Mail">Mail</button>
</div>`;

  readonly dockProps = computed<PropDef[]>(() => [
    { name: 'position', type: "'bottom' | 'top'", default: "'bottom'", description: this.t().propDescriptions.position },
    { name: 'class', type: 'string', default: "''", description: this.t().propDescriptions.class },
  ]);

  readonly itemProps = computed<PropDef[]>(() => [
    { name: 'active', type: 'boolean', default: 'false', description: 'Whether the dock item is active' },
    { name: 'class', type: 'string', default: "''", description: this.t().itemPropDescriptions?.class ?? 'Additional CSS classes' },
  ]);
}
