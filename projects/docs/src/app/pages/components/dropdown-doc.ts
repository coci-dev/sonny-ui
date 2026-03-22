import { Component, computed, inject } from '@angular/core';
import { CodeBlockComponent } from '../../shared/code-block';
import { ComponentPreviewComponent } from '../../shared/component-preview';
import { PropsTableComponent, type PropDef } from '../../shared/props-table';
import {
  SnyDropdownDirective,
  SnyDropdownTriggerDirective,
  SnyDropdownContentDirective,
  SnyMenuItemDirective,
  SnyMenuSeparatorDirective,
  SnyMenuLabelDirective,
} from 'core';
import { I18nService } from '../../i18n/i18n.service';
import { DROPDOWN_DOC_EN } from '../../i18n/en/pages/dropdown-doc';
import { DROPDOWN_DOC_ES } from '../../i18n/es/pages/dropdown-doc';

@Component({
  selector: 'docs-dropdown-doc',
  standalone: true,
  imports: [
    CodeBlockComponent,
    ComponentPreviewComponent,
    PropsTableComponent,
    SnyDropdownDirective,
    SnyDropdownTriggerDirective,
    SnyDropdownContentDirective,
    SnyMenuItemDirective,
    SnyMenuSeparatorDirective,
    SnyMenuLabelDirective,
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
          <div snyDropdown>
            <button
              snyDropdownTrigger
              class="rounded-md border px-4 py-2 text-sm"
            >
              Open Menu
            </button>
            <div snyDropdownContent>
              <div snyMenuLabel>Actions</div>
              <div snyMenuItem>Edit</div>
              <div snyMenuItem>Duplicate</div>
              <div snyMenuSeparator></div>
              <div snyMenuItem variant="destructive">Delete</div>
            </div>
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
export class DropdownDocComponent {
  readonly i18n = inject(I18nService);
  readonly t = computed(() => (this.i18n.locale() === 'es' ? DROPDOWN_DOC_ES : DROPDOWN_DOC_EN));

  importCode = `import {
  SnyDropdownDirective,
  SnyDropdownTriggerDirective,
  SnyDropdownContentDirective,
  SnyMenuItemDirective,
  SnyMenuSeparatorDirective,
  SnyMenuLabelDirective,
} from '@sonny-ui/core';`;

  basicCode = `<div snyDropdown>
  <button snyDropdownTrigger>Open Menu</button>
  <div snyDropdownContent>
    <div snyMenuLabel>Actions</div>
    <div snyMenuItem>Edit</div>
    <div snyMenuItem>Duplicate</div>
    <div snyMenuSeparator></div>
    <div snyMenuItem variant="destructive">Delete</div>
  </div>
</div>`;

  readonly props = computed<PropDef[]>(() => [
    { name: 'variant', type: "'default' | 'destructive'", default: "'default'", description: this.t().propDescriptions.variant },
    { name: 'class', type: 'string', default: "''", description: this.t().propDescriptions.class },
  ]);
}
