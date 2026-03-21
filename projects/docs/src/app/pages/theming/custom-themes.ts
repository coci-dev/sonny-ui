import { Component, computed, inject } from '@angular/core';
import { CodeBlockComponent } from '../../shared/code-block';
import { I18nService } from '../../i18n/i18n.service';
import { THEMING_CUSTOM_THEMES_EN } from '../../i18n/en/pages/theming-custom-themes';
import { THEMING_CUSTOM_THEMES_ES } from '../../i18n/es/pages/theming-custom-themes';

@Component({
  selector: 'docs-custom-themes',
  standalone: true,
  imports: [CodeBlockComponent],
  template: `
    <div class="space-y-8">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">{{ t().title }}</h1>
        <p class="text-muted-foreground mt-2">{{ t().description }}</p>
      </div>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ t().creatingTheme }}</h2>
        <p class="text-sm text-muted-foreground" [innerHTML]="t().creatingThemeDesc"></p>
        <docs-code-block [code]="themeCode" language="css" />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ t().applyingTheme }}</h2>
        <p class="text-sm text-muted-foreground" [innerHTML]="t().applyingThemeDesc"></p>
        <docs-code-block [code]="applyCode" language="typescript" />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ t().builtInCorporate }}</h2>
        <p class="text-sm text-muted-foreground">{{ t().builtInCorporateDesc }}</p>
        <docs-code-block [code]="corporateCode" language="css" />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ t().tokenReference }}</h2>
        <p class="text-sm text-muted-foreground">{{ t().tokenReferenceDesc }}</p>
        <docs-code-block [code]="tokensCode" language="css" />
      </section>
    </div>
  `,
})
export class CustomThemesComponent {
  private readonly i18n = inject(I18nService);
  readonly t = computed(() => this.i18n.locale() === 'es' ? THEMING_CUSTOM_THEMES_ES : THEMING_CUSTOM_THEMES_EN);

  themeCode = `[data-theme="ocean"] {
  --sny-background: #0c1222;
  --sny-foreground: #e2e8f0;
  --sny-primary: #38bdf8;
  --sny-primary-foreground: #0c1222;
  --sny-secondary: #1e293b;
  --sny-secondary-foreground: #e2e8f0;
  --sny-muted: #1e293b;
  --sny-muted-foreground: #94a3b8;
  --sny-accent: #1e3a5f;
  --sny-accent-foreground: #e2e8f0;
  --sny-destructive: #ef4444;
  --sny-destructive-foreground: #ffffff;
  --sny-card: #0f172a;
  --sny-card-foreground: #e2e8f0;
  --sny-border: #1e293b;
  --sny-input: #1e293b;
  --sny-ring: #38bdf8;
}`;

  applyCode = `// Extend the Theme type if needed
themeService.setTheme('ocean' as any);

// Or add it to ThemeService by extending it`;

  corporateCode = `[data-theme="corporate"] {
  --sny-background: #f8fafc;
  --sny-foreground: #0f172a;
  --sny-primary: #1e40af;
  --sny-primary-foreground: #ffffff;
  --sny-secondary: #e2e8f0;
  --sny-secondary-foreground: #1e293b;
  --sny-muted: #f1f5f9;
  --sny-muted-foreground: #64748b;
  --sny-accent: #dbeafe;
  --sny-accent-foreground: #1e3a8a;
  --sny-destructive: #dc2626;
  --sny-destructive-foreground: #ffffff;
  --sny-card: #ffffff;
  --sny-card-foreground: #0f172a;
  --sny-border: #cbd5e1;
  --sny-input: #cbd5e1;
  --sny-ring: #3b82f6;
  --sny-radius: 0.375rem;
}`;

  tokensCode = `--sny-background       /* Page background */
--sny-foreground       /* Default text color */
--sny-primary          /* Primary actions, links */
--sny-primary-foreground
--sny-secondary        /* Secondary buttons, badges */
--sny-secondary-foreground
--sny-muted            /* Muted backgrounds */
--sny-muted-foreground /* Muted text */
--sny-accent           /* Hover backgrounds */
--sny-accent-foreground
--sny-destructive      /* Error, danger states */
--sny-destructive-foreground
--sny-card             /* Card background */
--sny-card-foreground  /* Card text */
--sny-border           /* Border color */
--sny-input            /* Input border color */
--sny-ring             /* Focus ring color */
--sny-radius           /* Border radius */`;
}
