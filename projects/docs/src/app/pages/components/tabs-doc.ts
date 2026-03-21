import { Component, computed, inject, signal } from '@angular/core';
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
import { I18nService } from '../../i18n/i18n.service';
import { TABS_DOC_EN } from '../../i18n/en/pages/tabs-doc';
import { TABS_DOC_ES } from '../../i18n/es/pages/tabs-doc';

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
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.apiReference }}</h2>
        <h3 class="text-lg font-medium">{{ t().tabsLabel }}</h3>
        <docs-props-table [props]="tabsProps()" />
        <h3 class="text-lg font-medium mt-4">{{ t().tabsTriggerLabel }}</h3>
        <docs-props-table [props]="triggerProps()" />
        <h3 class="text-lg font-medium mt-4">{{ t().tabsContentLabel }}</h3>
        <docs-props-table [props]="contentProps()" />
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
export class TabsDocComponent {
  readonly i18n = inject(I18nService);
  readonly t = computed(() => this.i18n.locale() === 'es' ? TABS_DOC_ES : TABS_DOC_EN);

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

  readonly tabsProps = computed<PropDef[]>(() => [
    { name: 'value', type: 'string', default: "''", description: this.t().propDescriptions.tabsValue },
    { name: 'class', type: 'string', default: "''", description: this.t().propDescriptions.tabsClass },
  ]);

  readonly triggerProps = computed<PropDef[]>(() => [
    { name: 'value', type: 'string', default: '(required)', description: this.t().propDescriptions.triggerValue },
    { name: 'class', type: 'string', default: "''", description: this.t().propDescriptions.triggerClass },
  ]);

  readonly contentProps = computed<PropDef[]>(() => [
    { name: 'value', type: 'string', default: '(required)', description: this.t().propDescriptions.contentValue },
    { name: 'class', type: 'string', default: "''", description: this.t().propDescriptions.contentClass },
  ]);
}
