import { Component, computed, inject, signal } from '@angular/core';
import { CodeBlockComponent } from '../../shared/code-block';
import { ComponentPreviewComponent } from '../../shared/component-preview';
import { PropsTableComponent, type PropDef } from '../../shared/props-table';
import {
  SnyPopoverDirective,
  SnyPopoverTriggerDirective,
  SnyPopoverContentDirective,
  SnyButtonDirective,
  SnyInputDirective,
} from 'core';
import { I18nService } from '../../i18n/i18n.service';
import { POPOVER_DOC_EN } from '../../i18n/en/pages/popover-doc';
import { POPOVER_DOC_ES } from '../../i18n/es/pages/popover-doc';

@Component({
  selector: 'docs-popover-doc',
  standalone: true,
  imports: [
    CodeBlockComponent, ComponentPreviewComponent, PropsTableComponent,
    SnyPopoverDirective, SnyPopoverTriggerDirective, SnyPopoverContentDirective,
    SnyButtonDirective, SnyInputDirective,
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
          <div snyPopover>
            <button snyBtn snyPopoverTrigger>Open Popover</button>
            <div snyPopoverContent class="p-4 w-64">
              <p class="text-sm font-medium">Hello!</p>
              <p class="text-sm text-muted-foreground mt-1">This is a popover with any content.</p>
            </div>
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ t().formContent }}</h2>
        <p class="text-sm text-muted-foreground">{{ t().formContentDesc }}</p>
        <docs-component-preview [code]="formCode" language="markup">
          <div snyPopover>
            <button snyBtn variant="outline" snyPopoverTrigger>Edit Name</button>
            <div snyPopoverContent class="p-4 w-72 space-y-3">
              <p class="text-sm font-medium">Update your name</p>
              <input snyInput placeholder="Enter name..." />
              <button snyBtn size="sm" class="w-full">Save</button>
            </div>
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ t().matchWidth }}</h2>
        <p class="text-sm text-muted-foreground">{{ t().matchWidthDesc }}</p>
        <docs-component-preview [code]="matchCode" language="markup">
          <div snyPopover [matchWidth]="true">
            <button snyBtn variant="outline" snyPopoverTrigger class="w-48">Select Option</button>
            <div snyPopoverContent class="p-2">
              <button class="w-full text-left px-3 py-2 text-sm rounded-sm hover:bg-accent transition-colors">Option A</button>
              <button class="w-full text-left px-3 py-2 text-sm rounded-sm hover:bg-accent transition-colors">Option B</button>
              <button class="w-full text-left px-3 py-2 text-sm rounded-sm hover:bg-accent transition-colors">Option C</button>
            </div>
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ t().programmatic }}</h2>
        <p class="text-sm text-muted-foreground">{{ t().programmaticDesc }}</p>
        <docs-component-preview [code]="progCode" language="markup">
          <div snyPopover #pop="snyPopover">
            <button snyBtn snyPopoverTrigger>Toggle</button>
            <div snyPopoverContent class="p-4 w-64 space-y-2">
              <p class="text-sm">Controlled popover</p>
              <button snyBtn size="sm" variant="outline" (click)="pop.close()">Close from inside</button>
            </div>
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.apiReference }}</h2>
        <docs-props-table [props]="props()" />
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
export class PopoverDocComponent {
  readonly i18n = inject(I18nService);
  readonly t = computed(() => (this.i18n.locale() === 'es' ? POPOVER_DOC_ES : POPOVER_DOC_EN));

  importCode = `import {
  SnyPopoverDirective,
  SnyPopoverTriggerDirective,
  SnyPopoverContentDirective,
} from '@sonny-ui/core';`;

  basicCode = `<div snyPopover>
  <button snyBtn snyPopoverTrigger>Open Popover</button>
  <div snyPopoverContent class="p-4 w-64">
    <p>Any content here!</p>
  </div>
</div>`;

  formCode = `<div snyPopover>
  <button snyBtn variant="outline" snyPopoverTrigger>Edit</button>
  <div snyPopoverContent class="p-4 w-72 space-y-3">
    <input snyInput placeholder="Enter name..." />
    <button snyBtn size="sm">Save</button>
  </div>
</div>`;

  matchCode = `<div snyPopover [matchWidth]="true">
  <button snyBtn snyPopoverTrigger class="w-48">Select</button>
  <div snyPopoverContent class="p-2">
    <button class="w-full ...">Option A</button>
    <button class="w-full ...">Option B</button>
  </div>
</div>`;

  progCode = `<div snyPopover #pop="snyPopover">
  <button snyBtn snyPopoverTrigger>Toggle</button>
  <div snyPopoverContent class="p-4">
    <button (click)="pop.close()">Close</button>
  </div>
</div>`;

  readonly props = computed<PropDef[]>(() => [
    { name: 'matchWidth', type: 'boolean', default: 'false', description: this.t().propDescriptions.matchWidth },
    { name: 'offset', type: 'number', default: '4', description: this.t().propDescriptions.offset },
    { name: 'closeOnOutside', type: 'boolean', default: 'true', description: this.t().propDescriptions.closeOnOutside },
    { name: 'closeOnEscape', type: 'boolean', default: 'true', description: this.t().propDescriptions.closeOnEscape },
    { name: 'isOpen', type: 'signal<boolean>', default: 'false', description: this.t().propDescriptions.isOpen },
  ]);
}
