import { Component, computed, inject } from '@angular/core';
import { CodeBlockComponent } from '../../shared/code-block';
import { ComponentPreviewComponent } from '../../shared/component-preview';
import { PropsTableComponent, type PropDef } from '../../shared/props-table';
import { SnyKbdDirective } from 'core';
import { I18nService } from '../../i18n/i18n.service';
import { KBD_DOC_EN } from '../../i18n/en/pages/kbd-doc';
import { KBD_DOC_ES } from '../../i18n/es/pages/kbd-doc';

@Component({
  selector: 'docs-kbd-doc',
  standalone: true,
  imports: [CodeBlockComponent, ComponentPreviewComponent, PropsTableComponent, SnyKbdDirective],
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
          <div class="flex items-center gap-2">
            <kbd snyKbd>Ctrl</kbd>
            <span class="text-muted-foreground">+</span>
            <kbd snyKbd>C</kbd>
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.sizes }}</h2>
        <docs-component-preview [code]="sizesCode">
          <div class="flex items-center gap-4">
            <kbd snyKbd size="sm">Shift</kbd>
            <kbd snyKbd size="md">Shift</kbd>
            <kbd snyKbd size="lg">Shift</kbd>
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
export class KbdDocComponent {
  readonly i18n = inject(I18nService);
  readonly t = computed(() => this.i18n.locale() === 'es' ? KBD_DOC_ES : KBD_DOC_EN);

  importCode = `import { SnyKbdDirective } from '@sonny-ui/core';`;

  basicCode = `<kbd snyKbd>Ctrl</kbd>
<span>+</span>
<kbd snyKbd>C</kbd>`;

  sizesCode = `<kbd snyKbd size="sm">Shift</kbd>
<kbd snyKbd size="md">Shift</kbd>
<kbd snyKbd size="lg">Shift</kbd>`;

  readonly props = computed<PropDef[]>(() => [
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: this.t().propDescriptions.size },
    { name: 'class', type: 'string', default: "''", description: this.t().propDescriptions.class },
  ]);
}
