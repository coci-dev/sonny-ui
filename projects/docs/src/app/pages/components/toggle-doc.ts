import { Component, computed, inject, signal } from '@angular/core';
import { CodeBlockComponent } from '../../shared/code-block';
import { ComponentPreviewComponent } from '../../shared/component-preview';
import { PropsTableComponent, type PropDef } from '../../shared/props-table';
import { SnyToggleDirective } from 'core';
import { I18nService } from '../../i18n/i18n.service';
import { TOGGLE_DOC_EN } from '../../i18n/en/pages/toggle-doc';
import { TOGGLE_DOC_ES } from '../../i18n/es/pages/toggle-doc';

@Component({
  selector: 'docs-toggle-doc',
  standalone: true,
  imports: [CodeBlockComponent, ComponentPreviewComponent, PropsTableComponent, SnyToggleDirective],
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
          <button snyToggle [(pressed)]="bold">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 12a4 4 0 0 0 0-8H6v8"/><path d="M15 20a4 4 0 0 0 0-8H6v8"/></svg>
          </button>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.variants }}</h2>
        <docs-component-preview [code]="variantsCode">
          <div class="flex items-center gap-2">
            <button snyToggle variant="default">Default</button>
            <button snyToggle variant="outline">Outline</button>
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.examples }}</h2>
        <h3 class="text-lg font-medium">{{ t().textFormatting }}</h3>
        <docs-component-preview [code]="exampleCode" language="typescript">
          <div class="flex items-center gap-1">
            <button snyToggle [(pressed)]="bold" size="sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 12a4 4 0 0 0 0-8H6v8"/><path d="M15 20a4 4 0 0 0 0-8H6v8"/></svg>
            </button>
            <button snyToggle [(pressed)]="italic" size="sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" x2="10" y1="4" y2="4"/><line x1="14" x2="5" y1="20" y2="20"/><line x1="15" x2="9" y1="4" y2="20"/></svg>
            </button>
            <button snyToggle [(pressed)]="underline" size="sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4v6a6 6 0 0 0 12 0V4"/><line x1="4" x2="20" y1="20" y2="20"/></svg>
            </button>
          </div>
          <p class="mt-3 text-sm" [class.font-bold]="bold()" [class.italic]="italic()" [class.underline]="underline()">
            Preview text with formatting
          </p>
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
export class ToggleDocComponent {
  readonly i18n = inject(I18nService);
  readonly t = computed(() => this.i18n.locale() === 'es' ? TOGGLE_DOC_ES : TOGGLE_DOC_EN);

  readonly bold = signal(false);
  readonly italic = signal(false);
  readonly underline = signal(false);

  importCode = `import { SnyToggleDirective } from '@sonny-ui/core';`;
  basicCode = `<button snyToggle [(pressed)]="bold">B</button>`;
  variantsCode = `<button snyToggle variant="default">Default</button>
<button snyToggle variant="outline">Outline</button>`;
  exampleCode = `readonly bold = signal(false);
readonly italic = signal(false);

<button snyToggle [(pressed)]="bold" size="sm">B</button>
<button snyToggle [(pressed)]="italic" size="sm">I</button>`;

  readonly props = computed<PropDef[]>(() => [
    { name: 'variant', type: "'default' | 'outline'", default: "'default'", description: this.t().propDescriptions.variant },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: this.t().propDescriptions.size },
    { name: 'pressed', type: 'boolean', default: 'false', description: this.t().propDescriptions.pressed },
    { name: 'class', type: 'string', default: "''", description: this.t().propDescriptions.class },
  ]);
}
