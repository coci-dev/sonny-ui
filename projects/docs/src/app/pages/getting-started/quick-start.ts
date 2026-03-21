import { Component, computed, inject } from '@angular/core';
import { CodeBlockComponent } from '../../shared/code-block';
import { ComponentPreviewComponent } from '../../shared/component-preview';
import { SnyButtonDirective } from 'core';
import { I18nService } from '../../i18n/i18n.service';
import { QUICK_START_EN } from '../../i18n/en/pages/quick-start';
import { QUICK_START_ES } from '../../i18n/es/pages/quick-start';

@Component({
  selector: 'docs-quick-start',
  standalone: true,
  imports: [CodeBlockComponent, ComponentPreviewComponent, SnyButtonDirective],
  template: `
    <div class="space-y-8">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">{{ t().title }}</h1>
        <p class="text-muted-foreground mt-2">{{ t().description }}</p>
      </div>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ t().step1Title }}</h2>
        <p class="text-sm text-muted-foreground">{{ t().step1Desc }}</p>
        <docs-code-block [code]="importCode" language="typescript" />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ t().step2Title }}</h2>
        <p class="text-sm text-muted-foreground">{{ t().step2Desc }}</p>
        <docs-component-preview [code]="usageCode" language="html">
          <button snyBtn>Click me</button>
          <button snyBtn variant="outline">Outline</button>
          <button snyBtn variant="secondary">Secondary</button>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ t().step3Title }}</h2>
        <p class="text-sm text-muted-foreground">{{ t().step3Desc }}</p>
        <docs-code-block [code]="inputsCode" language="html" />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ t().nextSteps }}</h2>
        <ul class="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
          <li>{{ t().nextStepsList[0].text }}<a [href]="i18n.localizeLink('/docs/components/button')" class="text-primary underline">{{ t().nextStepsList[0].link }}</a>{{ t().nextStepsList[0].suffix }}</li>
          <li>{{ t().nextStepsList[1].text }}<a [href]="i18n.localizeLink('/docs/theming/overview')" class="text-primary underline">{{ t().nextStepsList[1].link }}</a>{{ t().nextStepsList[1].suffix }}</li>
          <li>{{ t().nextStepsList[2].text }}<a [href]="i18n.localizeLink('/docs/schematics/ng-add')" class="text-primary underline">{{ t().nextStepsList[2].link }}</a>{{ t().nextStepsList[2].suffix }}</li>
        </ul>
      </section>
    </div>
  `,
})
export class QuickStartComponent {
  readonly i18n = inject(I18nService);
  readonly t = computed(() => this.i18n.locale() === 'es' ? QUICK_START_ES : QUICK_START_EN);

  importCode = `import { Component } from '@angular/core';
import { SnyButtonDirective } from '@sonny-ui/core';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [SnyButtonDirective],
  template: \`<button snyBtn>Click me</button>\`,
})
export class ExampleComponent {}`;

  usageCode = `<button snyBtn>Click me</button>
<button snyBtn variant="outline">Outline</button>
<button snyBtn variant="secondary">Secondary</button>`;

  inputsCode = `<button snyBtn variant="destructive" size="lg">Delete</button>
<button snyBtn [disabled]="true">Disabled</button>
<button snyBtn [loading]="isLoading">Submit</button>`;
}
