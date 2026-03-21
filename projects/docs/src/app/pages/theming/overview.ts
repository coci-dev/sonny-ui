import { Component } from '@angular/core';
import { CodeBlockComponent } from '../../shared/code-block';

@Component({
  selector: 'docs-theming-overview',
  standalone: true,
  imports: [CodeBlockComponent],
  template: `
    <div class="space-y-8">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Theming Overview</h1>
        <p class="text-muted-foreground mt-2">
          SonnyUI uses CSS custom properties for theming. Three built-in themes are included: light, dark, and corporate.
        </p>
      </div>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">How it works</h2>
        <p class="text-sm text-muted-foreground">
          All colors are defined as CSS variables on <code class="text-primary font-mono text-xs bg-muted px-1.5 py-0.5 rounded">:root</code>.
          The Tailwind theme maps these variables to utility classes like <code class="text-primary font-mono text-xs bg-muted px-1.5 py-0.5 rounded">bg-primary</code>,
          <code class="text-primary font-mono text-xs bg-muted px-1.5 py-0.5 rounded">text-foreground</code>, etc.
        </p>
        <docs-code-block [code]="variablesCode" language="css" />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Available tokens</h2>
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
        <h2 class="text-xl font-semibold">ThemeService</h2>
        <p class="text-sm text-muted-foreground">
          Use the <code class="text-primary font-mono text-xs bg-muted px-1.5 py-0.5 rounded">ThemeService</code> to switch themes programmatically:
        </p>
        <docs-code-block [code]="serviceCode" language="typescript" />
      </section>
    </div>
  `,
})
export class ThemingOverviewComponent {
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
