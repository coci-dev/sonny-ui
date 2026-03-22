import { Component, computed, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CodeBlockComponent } from '../../shared/code-block';
import { ComponentPreviewComponent } from '../../shared/component-preview';
import { PropsTableComponent, type PropDef } from '../../shared/props-table';
import { SnySliderComponent, SnyLabelDirective } from 'core';
import { I18nService } from '../../i18n/i18n.service';
import { SLIDER_DOC_EN } from '../../i18n/en/pages/slider-doc';
import { SLIDER_DOC_ES } from '../../i18n/es/pages/slider-doc';

@Component({
  selector: 'docs-slider-doc',
  standalone: true,
  imports: [CodeBlockComponent, ComponentPreviewComponent, PropsTableComponent, SnySliderComponent, SnyLabelDirective, ReactiveFormsModule],
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
          <div class="w-full max-w-sm space-y-2">
            <sny-slider [(value)]="volume" />
            <p class="text-sm text-muted-foreground">Value: {{ volume() }}</p>
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.sizes }}</h2>
        <docs-component-preview [code]="sizesCode">
          <div class="w-full max-w-sm space-y-4">
            <div class="space-y-1">
              <label snyLabel>Small</label>
              <sny-slider size="sm" [value]="30" />
            </div>
            <div class="space-y-1">
              <label snyLabel>Medium</label>
              <sny-slider size="md" [value]="50" />
            </div>
            <div class="space-y-1">
              <label snyLabel>Large</label>
              <sny-slider size="lg" [value]="70" />
            </div>
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.examples }}</h2>
        <h3 class="text-lg font-medium">{{ t().volumeControl }}</h3>
        <docs-component-preview [code]="exampleCode" language="typescript">
          <div class="w-full max-w-sm space-y-2">
            <div class="flex justify-between text-sm">
              <label snyLabel>Volume</label>
              <span class="text-muted-foreground">{{ volume() }}%</span>
            </div>
            <sny-slider [(value)]="volume" [min]="0" [max]="100" [step]="5" />
            <div class="flex justify-between text-xs text-muted-foreground">
              <span>0</span>
              <span>100</span>
            </div>
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.reactiveForms }}</h2>
        <docs-component-preview [code]="reactiveFormsCode" language="typescript">
          <div class="w-full max-w-sm space-y-2">
            <sny-slider [formControl]="sliderCtrl" />
            <p class="text-sm text-muted-foreground">Value: {{ sliderCtrl.value }}</p>
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
export class SliderDocComponent {
  readonly i18n = inject(I18nService);
  readonly t = computed(() => this.i18n.locale() === 'es' ? SLIDER_DOC_ES : SLIDER_DOC_EN);

  readonly sliderCtrl = new FormControl(50);
  readonly volume = signal(50);

  reactiveFormsCode = `readonly sliderCtrl = new FormControl(50);

<sny-slider [formControl]="sliderCtrl" />`;

  importCode = `import { SnySliderComponent } from '@sonny-ui/core';`;
  basicCode = `<sny-slider [(value)]="volume" />`;
  sizesCode = `<sny-slider size="sm" [value]="30" />
<sny-slider size="md" [value]="50" />
<sny-slider size="lg" [value]="70" />`;
  exampleCode = `readonly volume = signal(50);

<sny-slider [(value)]="volume" [min]="0" [max]="100" [step]="5" />`;

  readonly props = computed<PropDef[]>(() => [
    { name: 'value', type: 'number', default: '0', description: this.t().propDescriptions.value },
    { name: 'min', type: 'number', default: '0', description: this.t().propDescriptions.min },
    { name: 'max', type: 'number', default: '100', description: this.t().propDescriptions.max },
    { name: 'step', type: 'number', default: '1', description: this.t().propDescriptions.step },
    { name: 'disabled', type: 'boolean', default: 'false', description: this.t().propDescriptions.disabled },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: this.t().propDescriptions.size },
  ]);
}
