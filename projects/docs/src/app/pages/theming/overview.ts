import { Component, computed, inject } from '@angular/core';
import { CodeBlockComponent } from '../../shared/code-block';
import { I18nService } from '../../i18n/i18n.service';
import { THEMING_OVERVIEW_EN } from '../../i18n/en/pages/theming-overview';
import { THEMING_OVERVIEW_ES } from '../../i18n/es/pages/theming-overview';

@Component({
  selector: 'docs-theming-overview',
  standalone: true,
  imports: [CodeBlockComponent],
  template: `
    <div class="space-y-8">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">{{ t().title }}</h1>
        <p class="text-muted-foreground mt-2" [innerHTML]="t().description"></p>
      </div>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ t().howItWorks }}</h2>
        <p class="text-sm text-muted-foreground" [innerHTML]="t().howItWorksDesc"></p>
        <docs-code-block [code]="variablesCode" language="css" />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ t().availableTokens }}</h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
          @for (token of tokens; track token) {
            <div class="flex items-center gap-2 rounded-sm border border-border p-2">
              <div class="h-6 w-6 rounded-sm border border-border" [style.background-color]="'var(--sny-' + token + ')'"></div>
              <span class="text-xs font-mono text-muted-foreground">{{ token }}</span>
            </div>
          }
        </div>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ t().themeService }}</h2>
        <p class="text-sm text-muted-foreground" [innerHTML]="t().themeServiceDesc"></p>
        <docs-code-block [code]="serviceCode" language="typescript" />
      </section>
    </div>
  `,
})
export class ThemingOverviewComponent {
  private readonly i18n = inject(I18nService);
  readonly t = computed(() => this.i18n.locale() === 'es' ? THEMING_OVERVIEW_ES : THEMING_OVERVIEW_EN);

  tokens = [
    'background', 'foreground', 'primary', 'primary-foreground',
    'secondary', 'secondary-foreground', 'muted', 'muted-foreground',
    'accent', 'accent-foreground', 'destructive', 'destructive-foreground',
    'card', 'card-foreground', 'border', 'input', 'ring',
  ];

  variablesCode = `:root {
  --sny-background: #ffffff;
  --sny-foreground: #0a0a0a;
  --sny-primary: #171717;
  --sny-primary-foreground: #fafafa;
  --sny-secondary: #f5f5f5;
  --sny-secondary-foreground: #171717;
  --sny-muted: #f5f5f5;
  --sny-muted-foreground: #737373;
  /* ... */
}`;

  serviceCode = `import { ThemeService } from '@sonny-ui/core';

export class MyComponent {
  private themeService = inject(ThemeService);

  // Read the current theme (signal)
  currentTheme = this.themeService.theme;

  // Check if dark mode is active
  isDark = this.themeService.isDark;

  // Set a specific theme
  setDark() {
    this.themeService.setTheme('dark');
  }

  // Toggle dark mode
  toggle() {
    this.themeService.toggleDark();
  }
}`;
}
