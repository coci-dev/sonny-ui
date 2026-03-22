import { Component, computed, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CodeBlockComponent } from '../../shared/code-block';
import { ComponentPreviewComponent } from '../../shared/component-preview';
import { PropsTableComponent, type PropDef } from '../../shared/props-table';
import { SnyRatingComponent } from 'core';
import { I18nService } from '../../i18n/i18n.service';
import { RATING_DOC_EN } from '../../i18n/en/pages/rating-doc';
import { RATING_DOC_ES } from '../../i18n/es/pages/rating-doc';

@Component({
  selector: 'docs-rating-doc',
  standalone: true,
  imports: [CodeBlockComponent, ComponentPreviewComponent, PropsTableComponent, SnyRatingComponent, ReactiveFormsModule],
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
          <div class="space-y-2">
            <sny-rating [(value)]="rating" />
            <p class="text-sm text-muted-foreground">Value: {{ rating() }}</p>
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.sizes }}</h2>
        <docs-component-preview [code]="sizesCode">
          <div class="space-y-3">
            <sny-rating size="sm" [value]="3" [readonly]="true" />
            <sny-rating size="md" [value]="3" [readonly]="true" />
            <sny-rating size="lg" [value]="3" [readonly]="true" />
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ t().readonlyRating }}</h2>
        <docs-component-preview [code]="readonlyCode">
          <sny-rating [value]="4" [readonly]="true" />
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.examples }}</h2>
        <h3 class="text-lg font-medium">{{ t().heartVariant }}</h3>
        <docs-component-preview [code]="exampleCode" language="typescript">
          <div class="space-y-2">
            <sny-rating [(value)]="heartRating" ratingVariant="heart" />
            <p class="text-sm text-muted-foreground">Value: {{ heartRating() }}</p>
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.reactiveForms }}</h2>
        <docs-component-preview [code]="reactiveFormsCode" language="typescript">
          <div class="space-y-2">
            <sny-rating [formControl]="ratingCtrl" />
            <p class="text-sm text-muted-foreground">Value: {{ ratingCtrl.value }}</p>
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
export class RatingDocComponent {
  readonly i18n = inject(I18nService);
  readonly t = computed(() => this.i18n.locale() === 'es' ? RATING_DOC_ES : RATING_DOC_EN);

  readonly ratingCtrl = new FormControl(3);
  readonly rating = signal(3);
  readonly heartRating = signal(4);

  reactiveFormsCode = `readonly ratingCtrl = new FormControl(3);

<sny-rating [formControl]="ratingCtrl" />`;

  importCode = `import { SnyRatingComponent } from '@sonny-ui/core';`;
  basicCode = `<sny-rating [(value)]="rating" />`;
  sizesCode = `<sny-rating size="sm" [value]="3" [readonly]="true" />
<sny-rating size="md" [value]="3" [readonly]="true" />
<sny-rating size="lg" [value]="3" [readonly]="true" />`;
  readonlyCode = `<sny-rating [value]="4" [readonly]="true" />`;
  exampleCode = `readonly heartRating = signal(4);

<sny-rating [(value)]="heartRating" ratingVariant="heart" />`;

  readonly props = computed<PropDef[]>(() => [
    { name: 'value', type: 'number', default: '0', description: this.t().propDescriptions.value },
    { name: 'max', type: 'number', default: '5', description: this.t().propDescriptions.max },
    { name: 'readonly', type: 'boolean', default: 'false', description: this.t().propDescriptions.readonly },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: this.t().propDescriptions.size },
    { name: 'ratingVariant', type: "'star' | 'heart'", default: "'star'", description: this.t().propDescriptions.ratingVariant },
    { name: 'half', type: 'boolean', default: 'false', description: this.t().propDescriptions.half },
    { name: 'class', type: 'string', default: "''", description: this.t().propDescriptions.class },
  ]);
}
