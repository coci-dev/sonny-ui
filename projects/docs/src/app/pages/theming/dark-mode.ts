import { Component, inject } from '@angular/core';
import { CodeBlockComponent } from '../../shared/code-block';
import { SnyButtonDirective, ThemeService } from 'core';

@Component({
  selector: 'docs-dark-mode',
  standalone: true,
  imports: [CodeBlockComponent, SnyButtonDirective],
  template: `
    <div class="space-y-8">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Dark Mode</h1>
        <p class="text-muted-foreground mt-2">Enable and control dark mode in your application.</p>
      </div>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">How it works</h2>
        <p class="text-sm text-muted-foreground">
          Dark mode is activated by adding the <code class="text-primary font-mono text-xs bg-muted px-1.5 py-0.5 rounded">dark</code> class
          or <code class="text-primary font-mono text-xs bg-muted px-1.5 py-0.5 rounded">data-theme="dark"</code> attribute
          to the document root. The <code class="text-primary font-mono text-xs bg-muted px-1.5 py-0.5 rounded">ThemeService</code> handles this automatically.
        </p>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Try it</h2>
        <p class="text-sm text-muted-foreground">Toggle between light and dark mode:</p>
        <div class="flex gap-4">
          <button snyBtn (click)="themeService.setTheme('light')">Light</button>
          <button snyBtn variant="outline" (click)="themeService.setTheme('dark')">Dark</button>
          <button snyBtn variant="secondary" (click)="themeService.toggleDark()">Toggle</button>
        </div>
        <p class="text-xs text-muted-foreground">
          Current theme: <strong>{{ themeService.theme() }}</strong>
        </p>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Toggle button example</h2>
        <docs-code-block [code]="toggleCode" language="typescript" />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">CSS custom variant</h2>
        <p class="text-sm text-muted-foreground">
          SonnyUI registers a Tailwind custom variant so you can use <code class="text-primary font-mono text-xs bg-muted px-1.5 py-0.5 rounded">dark:</code> utilities:
        </p>
        <docs-code-block [code]="variantCode" language="css" />
      </section>
    </div>
  `,
})
export class DarkModeComponent {
  readonly themeService = inject(ThemeService);

  toggleCode = `import { ThemeService } from '@sonny-ui/core';

@Component({
  template: \`
    <button (click)="themeService.toggleDark()">
      {{ themeService.isDark() ? 'Light mode' : 'Dark mode' }}
    </button>
  \`,
})
export class ThemeToggle {
  readonly themeService = inject(ThemeService);
}`;

  variantCode = `/* In sonny-theme.css */
@custom-variant dark (&:is(.dark *));

/* Usage in your templates */
<div class="bg-white dark:bg-black">...</div>`;
}
