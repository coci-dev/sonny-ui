import { Component, computed, inject } from '@angular/core';
import { CodeBlockComponent } from '../../shared/code-block';
import { ComponentPreviewComponent } from '../../shared/component-preview';
import { PropsTableComponent, type PropDef } from '../../shared/props-table';
import {
  SnyDrawerLayoutComponent,
  SnyDrawerContentDirective,
  SnyDrawerSideDirective,
} from 'core';
import { I18nService } from '../../i18n/i18n.service';
import { DRAWER_DOC_EN } from '../../i18n/en/pages/drawer-doc';
import { DRAWER_DOC_ES } from '../../i18n/es/pages/drawer-doc';

@Component({
  selector: 'docs-drawer-doc',
  standalone: true,
  imports: [
    CodeBlockComponent,
    ComponentPreviewComponent,
    PropsTableComponent,
    SnyDrawerLayoutComponent,
    SnyDrawerContentDirective,
    SnyDrawerSideDirective,
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
        <docs-component-preview [code]="basicCode" language="markup">
          <div snyDrawerLayout #drawer="snyDrawerLayout" class="h-48 w-full border border-border rounded-sm overflow-hidden">
            <div snyDrawerContent class="p-4">
              <button class="text-sm underline cursor-pointer" (click)="drawer.toggle()">Toggle Drawer</button>
            </div>
            <div snyDrawerSide>
              <nav class="p-4 w-60 bg-background">
                <ul class="space-y-2 text-sm">
                  <li>Menu Item 1</li>
                  <li>Menu Item 2</li>
                  <li>Menu Item 3</li>
                </ul>
              </nav>
            </div>
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.apiReference }}</h2>
        <h3 class="text-lg font-medium">{{ t().drawerLayout }}</h3>
        <docs-props-table [props]="layoutProps()" />
      </section>
    </div>
  `,
})
export class DrawerDocComponent {
  readonly i18n = inject(I18nService);
  readonly t = computed(() => this.i18n.locale() === 'es' ? DRAWER_DOC_ES : DRAWER_DOC_EN);

  importCode = `import {
  SnyDrawerLayoutComponent,
  SnyDrawerContentDirective,
  SnyDrawerSideDirective,
} from '@sonny-ui/core';`;

  basicCode = `<div snyDrawerLayout #drawer="snyDrawerLayout">
  <div snyDrawerContent>
    <button (click)="drawer.toggle()">Toggle Drawer</button>
  </div>
  <div snyDrawerSide>
    <nav class="p-4 w-60 bg-background">
      <ul>
        <li>Menu Item 1</li>
        <li>Menu Item 2</li>
      </ul>
    </nav>
  </div>
</div>`;

  readonly layoutProps = computed<PropDef[]>(() => [
    { name: 'overlay', type: 'boolean', default: 'true', description: this.t().propDescriptions.overlay },
    { name: 'class', type: 'string', default: "''", description: this.t().propDescriptions.class },
    { name: 'toggle()', type: 'method', default: '-', description: 'Toggle drawer open/close' },
    { name: 'open()', type: 'method', default: '-', description: 'Open the drawer' },
    { name: 'close()', type: 'method', default: '-', description: 'Close the drawer' },
  ]);
}
