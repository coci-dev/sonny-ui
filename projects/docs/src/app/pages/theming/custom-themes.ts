import { Component } from '@angular/core';
import { CodeBlockComponent } from '../../shared/code-block';

@Component({
  selector: 'docs-custom-themes',
  standalone: true,
  imports: [CodeBlockComponent],
  template: `
    <div class="space-y-8">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Custom Themes</h1>
        <p class="text-muted-foreground mt-2">Create your own themes by overriding CSS variables.</p>
      </div>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Creating a theme</h2>
        <p class="text-sm text-muted-foreground">
          Define a new theme by setting CSS variables under a <code class="text-primary font-mono text-xs bg-muted px-1.5 py-0.5 rounded">data-theme</code> attribute selector:
        </p>
        <docs-code-block [code]="themeCode" language="css" />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Applying the theme</h2>
        <p class="text-sm text-muted-foreground">
          Use the <code class="text-primary font-mono text-xs bg-muted px-1.5 py-0.5 rounded">ThemeService</code> to activate your custom theme:
        </p>
        <docs-code-block [code]="applyCode" language="typescript" />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Built-in: Corporate theme</h2>
        <p class="text-sm text-muted-foreground">
          The corporate theme is included as an example of a custom theme. It uses blue tones with a professional look:
        </p>
        <docs-code-block [code]="corporateCode" language="css" />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Token reference</h2>
        <p class="text-sm text-muted-foreground">
          Override any of these CSS variables to customize your theme:
        </p>
        <docs-code-block [code]="tokensCode" language="css" />
      </section>
    </div>
  `,
})
export class CustomThemesComponent {
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
