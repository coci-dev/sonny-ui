import { Component, computed, inject } from '@angular/core';
import { CodeBlockComponent } from '../../shared/code-block';
import { I18nService } from '../../i18n/i18n.service';
import { INSTALLATION_EN } from '../../i18n/en/pages/installation';
import { INSTALLATION_ES } from '../../i18n/es/pages/installation';

@Component({
  selector: 'docs-installation',
  standalone: true,
  imports: [CodeBlockComponent],
  template: `
    <div class="space-y-8">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">{{ t().title }}</h1>
        <p class="text-muted-foreground mt-2">{{ t().description }}</p>
      </div>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ t().prerequisites }}</h2>
        <ul class="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
          @for (item of t().prerequisitesList; track item) {
            <li>{{ item }}</li>
          }
          <li><a href="https://tailwindcss.com/docs/installation/framework-guides/angular" target="_blank" rel="noopener" class="text-primary underline">{{ t().prerequisitesTailwind }}</a> — {{ t().prerequisitesTailwindLink }}</li>
        </ul>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ t().automaticSetup }}</h2>
        <p class="text-sm text-muted-foreground" [innerHTML]="t().automaticSetupDesc"></p>
        <docs-code-block [code]="ngAddCode" language="bash" />
        <p class="text-sm text-muted-foreground">{{ t().automaticSetupAfter }}</p>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ t().manualSetup }}</h2>

        <h3 class="text-lg font-medium">{{ t().step1 }}</h3>
        <docs-code-block [code]="installCode" language="bash" />

        <h3 class="text-lg font-medium">{{ t().step2 }}</h3>
        <p class="text-sm text-muted-foreground">{{ t().step2Desc }}</p>
        <docs-code-block [code]="cssImportCode" language="css" />

        <h3 class="text-lg font-medium">{{ t().step3 }}</h3>
        <p class="text-sm text-muted-foreground">{{ t().step3Desc }}</p>
        <docs-code-block [code]="tailwindSourceCode" language="css" />

        <h3 class="text-lg font-medium">{{ t().step4 }}</h3>
        <p class="text-sm text-muted-foreground">{{ t().step4Desc }}</p>
        <docs-code-block [code]="providerCode" language="typescript" />
      </section>
    </div>
  `,
})
export class InstallationComponent {
  private readonly i18n = inject(I18nService);
  readonly t = computed(() => this.i18n.locale() === 'es' ? INSTALLATION_ES : INSTALLATION_EN);

  ngAddCode = `ng add @sonny-ui/core`;
  installCode = `npm install @sonny-ui/core`;
  cssImportCode = `@import "tailwindcss";
@import "@sonny-ui/core/styles/sonny-theme.css";`;
  tailwindSourceCode = `@source "../node_modules/@sonny-ui/core";`;
  providerCode = `import { provideSonnyUI } from '@sonny-ui/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideSonnyUI({ defaultTheme: 'light' }),
  ],
};`;
}
