import { Component, signal } from '@angular/core';
import { CodeBlockComponent } from '../../shared/code-block';
import { ComponentPreviewComponent } from '../../shared/component-preview';
import { PropsTableComponent, type PropDef } from '../../shared/props-table';
import {
  SnyAccordionDirective,
  SnyAccordionItemDirective,
  SnyAccordionTriggerDirective,
  SnyAccordionContentDirective,
} from 'core';

@Component({
  selector: 'docs-accordion-doc',
  standalone: true,
  imports: [
    CodeBlockComponent,
    ComponentPreviewComponent,
    PropsTableComponent,
    SnyAccordionDirective,
    SnyAccordionItemDirective,
    SnyAccordionTriggerDirective,
    SnyAccordionContentDirective,
  ],
  template: `
    <div class="space-y-8">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Accordion</h1>
        <p class="text-muted-foreground mt-2">A vertically stacked set of interactive headings that each reveal content.</p>
      </div>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Import</h2>
        <docs-code-block [code]="importCode" language="typescript" />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Usage</h2>
        <docs-component-preview [code]="basicCode" language="markup">
          <div snyAccordion class="max-w-lg">
            <div snyAccordionItem value="item-1">
              <button snyAccordionTrigger>
                Is it accessible?
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </button>
              <div snyAccordionContent>
                <div>Yes. It adheres to the WAI-ARIA design pattern.</div>
              </div>
            </div>
            <div snyAccordionItem value="item-2">
              <button snyAccordionTrigger>
                Is it styled?
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </button>
              <div snyAccordionContent>
                <div>Yes. It comes with default styles using Tailwind CSS.</div>
              </div>
            </div>
            <div snyAccordionItem value="item-3">
              <button snyAccordionTrigger>
                Is it animated?
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </button>
              <div snyAccordionContent>
                <div>Yes. It uses CSS grid-rows animation for smooth transitions.</div>
              </div>
            </div>
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Examples</h2>
        <h3 class="text-lg font-medium">FAQ with Multi Mode</h3>
        <docs-component-preview [code]="exampleCode" language="typescript">
          <div class="space-y-4 max-w-lg">
            <div class="flex items-center gap-2">
              <button
                class="text-xs px-2 py-1 rounded-sm"
                [class]="multiMode() ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'"
                (click)="multiMode.set(!multiMode())"
              >
                Multi: {{ multiMode() ? 'ON' : 'OFF' }}
              </button>
            </div>
            <div snyAccordion [multi]="multiMode()">
              @for (faq of faqs; track faq.q) {
                <div snyAccordionItem [value]="faq.q">
                  <button snyAccordionTrigger>
                    {{ faq.q }}
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                  </button>
                  <div snyAccordionContent>
                    <div>{{ faq.a }}</div>
                  </div>
                </div>
              }
            </div>
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">API Reference</h2>
        <h3 class="text-lg font-medium">Accordion</h3>
        <docs-props-table [props]="accordionProps" />
        <h3 class="text-lg font-medium mt-4">AccordionItem</h3>
        <docs-props-table [props]="itemProps" />
      </section>
    </div>
  `,
})
export class AccordionDocComponent {
  readonly multiMode = signal(false);

  faqs = [
    { q: 'What is SonnyUI?', a: 'SonnyUI is a collection of beautiful, accessible Angular components built with Tailwind CSS v4 and Signals.' },
    { q: 'Is it free?', a: 'Yes, SonnyUI is open source and free to use under the MIT license.' },
    { q: 'Does it support dark mode?', a: 'Yes, SonnyUI includes light, dark, and corporate themes out of the box.' },
  ];

  importCode = `import {
  SnyAccordionDirective,
  SnyAccordionItemDirective,
  SnyAccordionTriggerDirective,
  SnyAccordionContentDirective,
} from '@sonny-ui/core';`;

  basicCode = `<div snyAccordion>
  <div snyAccordionItem value="item-1">
    <button snyAccordionTrigger>Is it accessible?</button>
    <div snyAccordionContent>
      <div>Yes. It adheres to WAI-ARIA.</div>
    </div>
  </div>
</div>`;

  exampleCode = `readonly multiMode = signal(false);

<div snyAccordion [multi]="multiMode()">
  @for (faq of faqs; track faq.q) {
    <div snyAccordionItem [value]="faq.q">
      <button snyAccordionTrigger>{{ faq.q }}</button>
      <div snyAccordionContent>
        <div>{{ faq.a }}</div>
      </div>
    </div>
  }
</div>`;

  accordionProps: PropDef[] = [
    { name: 'multi', type: 'boolean', default: 'false', description: 'Allow multiple items to be open at once.' },
    { name: 'class', type: 'string', default: "''", description: 'Additional CSS classes to apply.' },
  ];

  itemProps: PropDef[] = [
    { name: 'value', type: 'string', default: '(required)', description: 'Unique identifier for the accordion item.' },
    { name: 'class', type: 'string', default: "''", description: 'Additional CSS classes to apply.' },
  ];
}
