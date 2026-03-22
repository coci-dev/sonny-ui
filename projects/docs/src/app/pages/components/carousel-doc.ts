import { Component, computed, inject } from '@angular/core';
import { CodeBlockComponent } from '../../shared/code-block';
import { ComponentPreviewComponent } from '../../shared/component-preview';
import { PropsTableComponent, type PropDef } from '../../shared/props-table';
import {
  SnyCarouselDirective,
  SnyCarouselContentDirective,
  SnyCarouselItemDirective,
  SnyCarouselPrevDirective,
  SnyCarouselNextDirective,
} from 'core';
import { I18nService } from '../../i18n/i18n.service';
import { CAROUSEL_DOC_EN } from '../../i18n/en/pages/carousel-doc';
import { CAROUSEL_DOC_ES } from '../../i18n/es/pages/carousel-doc';

@Component({
  selector: 'docs-carousel-doc',
  standalone: true,
  imports: [
    CodeBlockComponent,
    ComponentPreviewComponent,
    PropsTableComponent,
    SnyCarouselDirective,
    SnyCarouselContentDirective,
    SnyCarouselItemDirective,
    SnyCarouselPrevDirective,
    SnyCarouselNextDirective,
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
          <div snyCarousel class="w-full max-w-sm">
            <div snyCarouselContent>
              @for (item of items; track item) {
                <div snyCarouselItem>
                  <div class="flex aspect-square items-center justify-center rounded-lg border bg-muted p-6">
                    <span class="text-4xl font-semibold">{{ item }}</span>
                  </div>
                </div>
              }
            </div>
            <button snyCarouselPrev class="inline-flex items-center justify-center rounded-full border bg-background w-8 h-8 shadow-sm hover:bg-accent">‹</button>
            <button snyCarouselNext class="inline-flex items-center justify-center rounded-full border bg-background w-8 h-8 shadow-sm hover:bg-accent">›</button>
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.examples }}</h2>
        <h3 class="text-lg font-medium">{{ t().withControls }}</h3>
        <docs-component-preview [code]="exampleCode">
          <div snyCarousel [loop]="true" class="w-full max-w-sm">
            <div snyCarouselContent>
              @for (item of items; track item) {
                <div snyCarouselItem>
                  <div class="flex aspect-square items-center justify-center rounded-lg border bg-muted p-6">
                    <span class="text-4xl font-semibold">{{ item }}</span>
                  </div>
                </div>
              }
            </div>
            <button snyCarouselPrev class="inline-flex items-center justify-center rounded-full border bg-background w-8 h-8 shadow-sm hover:bg-accent">‹</button>
            <button snyCarouselNext class="inline-flex items-center justify-center rounded-full border bg-background w-8 h-8 shadow-sm hover:bg-accent">›</button>
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.apiReference }}</h2>
        <h3 class="text-lg font-medium">{{ t().carousel }}</h3>
        <docs-props-table [props]="carouselProps()" />
        <h3 class="text-lg font-medium mt-4">{{ t().carouselItem }}</h3>
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
export class CarouselDocComponent {
  readonly i18n = inject(I18nService);
  readonly t = computed(() => this.i18n.locale() === 'es' ? CAROUSEL_DOC_ES : CAROUSEL_DOC_EN);

  items = [1, 2, 3, 4, 5];

  importCode = `import {
  SnyCarouselDirective,
  SnyCarouselContentDirective,
  SnyCarouselItemDirective,
  SnyCarouselPrevDirective,
  SnyCarouselNextDirective,
} from '@sonny-ui/core';`;

  basicCode = `<div snyCarousel>
  <div snyCarouselContent>
    <div snyCarouselItem>Slide 1</div>
    <div snyCarouselItem>Slide 2</div>
    <div snyCarouselItem>Slide 3</div>
  </div>
  <button snyCarouselPrev>‹</button>
  <button snyCarouselNext>›</button>
</div>`;

  exampleCode = `<div snyCarousel [loop]="true">
  <div snyCarouselContent>
    <div snyCarouselItem>Slide 1</div>
    <div snyCarouselItem>Slide 2</div>
    <div snyCarouselItem>Slide 3</div>
  </div>
  <button snyCarouselPrev>‹</button>
  <button snyCarouselNext>›</button>
</div>`;

  readonly carouselProps = computed<PropDef[]>(() => [
    { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: this.t().propDescriptions.orientation },
    { name: 'autoplay', type: 'number (ms)', default: '0', description: 'Autoplay interval in milliseconds. 0 to disable.' },
    { name: 'loop', type: 'boolean', default: 'false', description: this.t().propDescriptions.loop },
    { name: 'class', type: 'string', default: "''", description: this.t().propDescriptions.class },
  ]);

  readonly itemProps = computed<PropDef[]>(() => [
    { name: 'class', type: 'string', default: "''", description: this.t().itemPropDescriptions.class },
  ]);
}
