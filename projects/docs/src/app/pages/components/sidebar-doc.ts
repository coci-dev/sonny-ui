import { Component, computed, inject } from '@angular/core';
import { CodeBlockComponent } from '../../shared/code-block';
import { ComponentPreviewComponent } from '../../shared/component-preview';
import { PropsTableComponent, type PropDef } from '../../shared/props-table';
import {
  SnySidebarLayoutComponent,
  SnySidebarDirective,
  SnySidebarHeaderDirective,
  SnySidebarBodyDirective,
  SnySidebarFooterDirective,
  SnySidebarGroupComponent,
  SnySidebarItemDirective,
  SnySidebarSubMenuDirective,
  SnySidebarSubItemDirective,
  SnySidebarContentDirective,
} from 'core';
import { I18nService } from '../../i18n/i18n.service';
import { SIDEBAR_DOC_EN } from '../../i18n/en/pages/sidebar-doc';
import { SIDEBAR_DOC_ES } from '../../i18n/es/pages/sidebar-doc';

@Component({
  selector: 'docs-sidebar-doc',
  standalone: true,
  imports: [
    CodeBlockComponent,
    ComponentPreviewComponent,
    PropsTableComponent,
    SnySidebarLayoutComponent,
    SnySidebarDirective,
    SnySidebarHeaderDirective,
    SnySidebarBodyDirective,
    SnySidebarFooterDirective,
    SnySidebarGroupComponent,
    SnySidebarItemDirective,
    SnySidebarSubMenuDirective,
    SnySidebarSubItemDirective,
    SnySidebarContentDirective,
  ],
  template: `
    <div class="space-y-8">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">{{ t().title }}</h1>
        <p class="text-muted-foreground mt-2">{{ t().description }}</p>
      </div>

      <!-- Import -->
      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.import }}</h2>
        <docs-code-block [code]="importCode" language="typescript" />
      </section>

      <!-- Basic Usage -->
      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.usage }}</h2>
        <docs-component-preview [code]="basicCode" language="markup">
          <div snySidebarLayout class="h-72 w-full border border-border rounded-sm overflow-hidden">
            <nav snySidebar>
              <div snySidebarHeader>
                <span class="text-lg font-bold">App</span>
              </div>
              <div snySidebarBody>
                <sny-sidebar-group label="Menu">
                  <a snySidebarItem [active]="true">Dashboard</a>
                  <a snySidebarItem>Users</a>
                  <a snySidebarItem>Settings</a>
                </sny-sidebar-group>
              </div>
              <div snySidebarFooter>
                <a snySidebarItem>Sign Out</a>
              </div>
            </nav>
            <div snySidebarContent class="p-4">
              <p class="text-sm text-muted-foreground">Main content area</p>
            </div>
          </div>
        </docs-component-preview>
      </section>

      <!-- Collapsible -->
      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ t().examples.collapsible }}</h2>
        <docs-component-preview [code]="collapsibleCode" language="markup">
          <div snySidebarLayout #collapsible="snySidebarLayout" class="h-72 w-full border border-border rounded-sm overflow-hidden">
            <nav snySidebar [collapsible]="true">
              <div snySidebarHeader>
                <span class="text-lg font-bold">App</span>
              </div>
              <div snySidebarBody>
                <sny-sidebar-group label="Menu">
                  <a snySidebarItem [active]="true">Dashboard</a>
                  <a snySidebarItem>Users</a>
                  <a snySidebarItem>Settings</a>
                </sny-sidebar-group>
              </div>
              <div snySidebarFooter>
                <button class="text-xs underline cursor-pointer" (click)="collapsible.toggleCollapse()">
                  {{ collapsible.isCollapsed() ? 'Expand' : 'Collapse' }}
                </button>
              </div>
            </nav>
            <div snySidebarContent class="p-4">
              <p class="text-sm text-muted-foreground">Click the button in the footer to collapse/expand.</p>
            </div>
          </div>
        </docs-component-preview>
      </section>

      <!-- With Sub-Menus -->
      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ t().examples.withSubMenus }}</h2>
        <docs-component-preview [code]="subMenuCode" language="markup">
          <div snySidebarLayout class="h-80 w-full border border-border rounded-sm overflow-hidden">
            <nav snySidebar>
              <div snySidebarHeader>
                <span class="text-lg font-bold">Admin</span>
              </div>
              <div snySidebarBody>
                <sny-sidebar-group label="Navigation">
                  <a snySidebarItem [active]="true">Dashboard</a>
                  <a snySidebarItem>Analytics</a>
                  <div snySidebarItem [expandable]="true">
                    Settings
                    <div snySidebarSubMenu>
                      <a snySidebarSubItem [active]="true">General</a>
                      <a snySidebarSubItem>Security</a>
                      <a snySidebarSubItem>Billing</a>
                    </div>
                  </div>
                  <a snySidebarItem [disabled]="true">Reports</a>
                </sny-sidebar-group>
                <sny-sidebar-group label="Support">
                  <a snySidebarItem>Help Center</a>
                  <a snySidebarItem>Contact</a>
                </sny-sidebar-group>
              </div>
              <div snySidebarFooter>
                <a snySidebarItem>Sign Out</a>
              </div>
            </nav>
            <div snySidebarContent class="p-4">
              <p class="text-sm text-muted-foreground">Click "Settings" to expand the sub-menu.</p>
            </div>
          </div>
        </docs-component-preview>
      </section>

      <!-- API Reference -->
      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.apiReference }}</h2>

        <h3 class="text-lg font-medium">{{ t().sidebarLayout }}</h3>
        <docs-props-table [props]="layoutProps()" />

        <h3 class="text-lg font-medium">{{ t().sidebar }}</h3>
        <docs-props-table [props]="sidebarProps()" />

        <h3 class="text-lg font-medium">{{ t().sidebarGroup }}</h3>
        <docs-props-table [props]="groupProps()" />

        <h3 class="text-lg font-medium">{{ t().sidebarItem }}</h3>
        <docs-props-table [props]="itemProps()" />

        <h3 class="text-lg font-medium">{{ t().sidebarSubItem }}</h3>
        <docs-props-table [props]="subItemProps()" />
      </section>

      <!-- Accessibility -->
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
export class SidebarDocComponent {
  readonly i18n = inject(I18nService);
  readonly t = computed(() => this.i18n.locale() === 'es' ? SIDEBAR_DOC_ES : SIDEBAR_DOC_EN);

  importCode = `import {
  SnySidebarLayoutComponent,
  SnySidebarDirective,
  SnySidebarHeaderDirective,
  SnySidebarBodyDirective,
  SnySidebarFooterDirective,
  SnySidebarGroupComponent,
  SnySidebarItemDirective,
  SnySidebarSubMenuDirective,
  SnySidebarSubItemDirective,
  SnySidebarContentDirective,
} from '@sonny-ui/core';`;

  basicCode = `<div snySidebarLayout>
  <nav snySidebar>
    <div snySidebarHeader>
      <span class="text-lg font-bold">App</span>
    </div>
    <div snySidebarBody>
      <sny-sidebar-group label="Menu">
        <a snySidebarItem [active]="true">Dashboard</a>
        <a snySidebarItem>Users</a>
        <a snySidebarItem>Settings</a>
      </sny-sidebar-group>
    </div>
    <div snySidebarFooter>
      <a snySidebarItem>Sign Out</a>
    </div>
  </nav>
  <div snySidebarContent>
    <!-- main content -->
  </div>
</div>`;

  collapsibleCode = `<div snySidebarLayout #sidebar="snySidebarLayout">
  <nav snySidebar [collapsible]="true">
    <div snySidebarHeader>
      <span>App</span>
    </div>
    <div snySidebarBody>
      <sny-sidebar-group label="Menu">
        <a snySidebarItem [active]="true">Dashboard</a>
        <a snySidebarItem>Users</a>
      </sny-sidebar-group>
    </div>
    <div snySidebarFooter>
      <button (click)="sidebar.toggleCollapse()">Toggle</button>
    </div>
  </nav>
  <div snySidebarContent>Content</div>
</div>`;

  subMenuCode = `<div snySidebarLayout>
  <nav snySidebar>
    <div snySidebarBody>
      <sny-sidebar-group label="Navigation">
        <a snySidebarItem [active]="true">Dashboard</a>
        <div snySidebarItem [expandable]="true">
          Settings
          <div snySidebarSubMenu>
            <a snySidebarSubItem>General</a>
            <a snySidebarSubItem>Security</a>
          </div>
        </div>
        <a snySidebarItem [disabled]="true">Reports</a>
      </sny-sidebar-group>
    </div>
  </nav>
  <div snySidebarContent>Content</div>
</div>`;

  readonly layoutProps = computed<PropDef[]>(() => [
    { name: 'class', type: 'string', default: "''", description: this.t().propDescriptions.class },
    { name: 'toggleCollapse()', type: 'method', default: '-', description: 'Toggle collapsed state' },
    { name: 'collapse()', type: 'method', default: '-', description: 'Collapse the sidebar' },
    { name: 'expand()', type: 'method', default: '-', description: 'Expand the sidebar' },
    { name: 'toggleMobile()', type: 'method', default: '-', description: 'Toggle mobile sidebar' },
    { name: 'openMobile()', type: 'method', default: '-', description: 'Open mobile sidebar' },
    { name: 'closeMobile()', type: 'method', default: '-', description: 'Close mobile sidebar' },
    { name: 'isCollapsed', type: 'Signal<boolean>', default: 'false', description: 'Current collapsed state' },
    { name: 'isMobile', type: 'Signal<boolean>', default: 'false', description: 'Whether viewport is mobile' },
    { name: 'isMobileOpen', type: 'Signal<boolean>', default: 'false', description: 'Whether mobile sidebar is open' },
  ]);

  readonly sidebarProps = computed<PropDef[]>(() => [
    { name: 'collapsible', type: 'boolean', default: 'false', description: this.t().propDescriptions.collapsible },
    { name: 'side', type: "'left' | 'right'", default: "'left'", description: this.t().propDescriptions.side },
    { name: 'collapsedWidth', type: 'string', default: "'w-16'", description: this.t().propDescriptions.collapsedWidth },
    { name: 'expandedWidth', type: 'string', default: "'w-64'", description: this.t().propDescriptions.expandedWidth },
    { name: 'ariaLabel', type: 'string', default: "'Sidebar navigation'", description: this.t().propDescriptions.ariaLabel },
    { name: 'class', type: 'string', default: "''", description: this.t().propDescriptions.class },
  ]);

  readonly groupProps = computed<PropDef[]>(() => [
    { name: 'label', type: 'string', default: "''", description: this.t().propDescriptions.label },
    { name: 'class', type: 'string', default: "''", description: this.t().propDescriptions.class },
  ]);

  readonly itemProps = computed<PropDef[]>(() => [
    { name: 'active', type: 'boolean', default: 'false', description: this.t().propDescriptions.active },
    { name: 'disabled', type: 'boolean', default: 'false', description: this.t().propDescriptions.disabled },
    { name: 'expandable', type: 'boolean', default: 'false', description: this.t().propDescriptions.expandable },
    { name: 'class', type: 'string', default: "''", description: this.t().propDescriptions.class },
  ]);

  readonly subItemProps = computed<PropDef[]>(() => [
    { name: 'active', type: 'boolean', default: 'false', description: this.t().propDescriptions.active },
    { name: 'class', type: 'string', default: "''", description: this.t().propDescriptions.class },
  ]);
}
