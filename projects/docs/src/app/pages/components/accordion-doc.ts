import { Component, signal, computed, inject } from '@angular/core';
import { CodeBlockComponent } from '../../shared/code-block';
import { ComponentPreviewComponent } from '../../shared/component-preview';
import { PropsTableComponent, type PropDef } from '../../shared/props-table';
import {
  SnyAccordionDirective,
  SnyAccordionItemDirective,
  SnyAccordionTriggerDirective,
  SnyAccordionContentDirective,
} from 'core';
import { I18nService } from '../../i18n/i18n.service';
import { ACCORDION_DOC_EN } from '../../i18n/en/pages/accordion-doc';
import { ACCORDION_DOC_ES } from '../../i18n/es/pages/accordion-doc';

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
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.examples }}</h2>
        <h3 class="text-lg font-medium">{{ t().faqWithMultiMode }}</h3>
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
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.apiReference }}</h2>
        <h3 class="text-lg font-medium">{{ t().accordion }}</h3>
        <docs-props-table [props]="accordionProps()" />
        <h3 class="text-lg font-medium mt-4">{{ t().accordionItem }}</h3>
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
export class AccordionDocComponent {
  readonly i18n = inject(I18nService);
  readonly t = computed(() => this.i18n.locale() === 'es' ? ACCORDION_DOC_ES : ACCORDION_DOC_EN);

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

  readonly accordionProps = computed<PropDef[]>(() => [
    { name: 'multi', type: 'boolean', default: 'false', description: this.t().propDescriptions.multi },
    { name: 'class', type: 'string', default: "''", description: this.t().propDescriptions.class },
  ]);

  readonly itemProps = computed<PropDef[]>(() => [
    { name: 'value', type: 'string', default: '(required)', description: this.t().itemPropDescriptions.value },
    { name: 'class', type: 'string', default: "''", description: this.t().itemPropDescriptions.class },
  ]);
}
