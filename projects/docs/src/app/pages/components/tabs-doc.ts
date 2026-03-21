import { Component, signal } from '@angular/core';
import { CodeBlockComponent } from '../../shared/code-block';
import { ComponentPreviewComponent } from '../../shared/component-preview';
import { PropsTableComponent, type PropDef } from '../../shared/props-table';
import {
  SnyTabsDirective,
  SnyTabsListDirective,
  SnyTabsTriggerDirective,
  SnyTabsContentDirective,
  SnyInputDirective,
  SnyLabelDirective,
  SnyButtonDirective,
} from 'core';

@Component({
  selector: 'docs-tabs-doc',
  standalone: true,
  imports: [
    CodeBlockComponent, ComponentPreviewComponent, PropsTableComponent,
    SnyTabsDirective, SnyTabsListDirective, SnyTabsTriggerDirective, SnyTabsContentDirective,
    SnyInputDirective, SnyLabelDirective, SnyButtonDirective,
  ],
  template: `
    <div class="space-y-8">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Tabs</h1>
        <p class="text-muted-foreground mt-2">A set of layered sections of content displayed one at a time.</p>
      </div>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Import</h2>
        <docs-code-block [code]="importCode" language="typescript" />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Usage</h2>
        <docs-component-preview [code]="basicCode" language="markup">
          <div snyTabs [(value)]="activeTab" class="w-full max-w-md">
            <div snyTabsList>
              <button snyTabsTrigger value="account">Account</button>
              <button snyTabsTrigger value="password">Password</button>
              <button snyTabsTrigger value="notifications">Notifications</button>
            </div>
            <div snyTabsContent value="account" class="space-y-4">
              <div class="space-y-2">
                <label snyLabel>Name</label>
                <input snyInput placeholder="Your name" />
              </div>
              <div class="space-y-2">
                <label snyLabel>Email</label>
                <input snyInput type="email" placeholder="you&#64;example.com" />
              </div>
              <button snyBtn>Save changes</button>
            </div>
            <div snyTabsContent value="password" class="space-y-4">
              <div class="space-y-2">
                <label snyLabel>Current password</label>
                <input snyInput type="password" />
              </div>
              <div class="space-y-2">
                <label snyLabel>New password</label>
                <input snyInput type="password" />
              </div>
              <button snyBtn>Update password</button>
            </div>
            <div snyTabsContent value="notifications" class="space-y-2">
              <p class="text-sm text-muted-foreground">Manage your notification preferences.</p>
              <button snyBtn variant="outline">Configure</button>
            </div>
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">API Reference</h2>
        <h3 class="text-lg font-medium">Tabs</h3>
        <docs-props-table [props]="tabsProps" />
        <h3 class="text-lg font-medium mt-4">TabsTrigger</h3>
        <docs-props-table [props]="triggerProps" />
        <h3 class="text-lg font-medium mt-4">TabsContent</h3>
        <docs-props-table [props]="contentProps" />
      </section>
    </div>
  `,
})
export class TabsDocComponent {
  readonly activeTab = signal('account');

  importCode = `import {
  SnyTabsDirective,
  SnyTabsListDirective,
  SnyTabsTriggerDirective,
  SnyTabsContentDirective,
} from '@sonny-ui/core';`;

  basicCode = `<div snyTabs [(value)]="activeTab">
  <div snyTabsList>
    <button snyTabsTrigger value="account">Account</button>
    <button snyTabsTrigger value="password">Password</button>
  </div>
  <div snyTabsContent value="account">Account content</div>
  <div snyTabsContent value="password">Password content</div>
</div>`;

  tabsProps: PropDef[] = [
    { name: 'value', type: 'string', default: "''", description: 'The active tab value. Supports two-way binding.' },
    { name: 'class', type: 'string', default: "''", description: 'Additional CSS classes to apply.' },
  ];

  triggerProps: PropDef[] = [
    { name: 'value', type: 'string', default: '(required)', description: 'The value identifying this tab trigger.' },
    { name: 'class', type: 'string', default: "''", description: 'Additional CSS classes to apply.' },
  ];

  contentProps: PropDef[] = [
    { name: 'value', type: 'string', default: '(required)', description: 'The value identifying this tab content panel.' },
    { name: 'class', type: 'string', default: "''", description: 'Additional CSS classes to apply.' },
  ];
}
