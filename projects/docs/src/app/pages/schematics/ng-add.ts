import { Component, computed, inject } from '@angular/core';
import { CodeBlockComponent } from '../../shared/code-block';
import { I18nService } from '../../i18n/i18n.service';
import { NG_ADD_EN } from '../../i18n/en/pages/ng-add';
import { NG_ADD_ES } from '../../i18n/es/pages/ng-add';

@Component({
  selector: 'docs-ng-add',
  standalone: true,
  imports: [CodeBlockComponent],
  template: `
    <div class="space-y-8">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">{{ t().title }}</h1>
        <p class="text-muted-foreground mt-2">{{ t().description }}</p>
      </div>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ t().usage }}</h2>
        <docs-code-block [code]="addCode" language="bash" />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ t().whatItDoes }}</h2>
        <p class="text-sm text-muted-foreground">{{ t().whatItDoesDesc }}</p>
        <ol class="list-decimal pl-6 space-y-2 text-sm text-muted-foreground">
          @for (step of t().steps; track step.strong) {
            <li>
              <strong class="text-foreground" [innerHTML]="step.strong"></strong>
              <span [innerHTML]="step.text"></span>
            </li>
          }
        </ol>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ t().options }}</h2>
        <docs-code-block [code]="optionsCode" language="bash" />
        <ul class="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
          @for (opt of t().optionsList; track opt) {
            <li [innerHTML]="opt"></li>
          }
        </ul>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ t().afterInstallation }}</h2>
        <p class="text-sm text-muted-foreground">{{ t().afterInstallationDesc }}</p>
        <docs-code-block [code]="usageCode" language="typescript" />
      </section>
    </div>
  `,
})
export class NgAddComponent {
  private readonly i18n = inject(I18nService);
  readonly t = computed(() => this.i18n.locale() === 'es' ? NG_ADD_ES : NG_ADD_EN);

  addCode = `ng add @sonny-ui/core`;
  optionsCode = `ng add @sonny-ui/core --project=my-app --theme=dark`;
  usageCode = `import { SnyButtonDirective } from '@sonny-ui/core';

@Component({
  imports: [SnyButtonDirective],
  template: \`<button snyBtn variant="outline">Hello SonnyUI!</button>\`,
})
export class MyComponent {}`;
}
