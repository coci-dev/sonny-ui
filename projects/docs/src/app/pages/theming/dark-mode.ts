import { Component, computed, inject } from '@angular/core';
import { CodeBlockComponent } from '../../shared/code-block';
import { SnyButtonDirective, ThemeService } from 'core';
import { I18nService } from '../../i18n/i18n.service';
import { THEMING_DARK_MODE_EN } from '../../i18n/en/pages/theming-dark-mode';
import { THEMING_DARK_MODE_ES } from '../../i18n/es/pages/theming-dark-mode';

@Component({
  selector: 'docs-dark-mode',
  standalone: true,
  imports: [CodeBlockComponent, SnyButtonDirective],
  template: `
    <div class="space-y-8">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">{{ t().title }}</h1>
        <p class="text-muted-foreground mt-2">{{ t().description }}</p>
      </div>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ t().howItWorks }}</h2>
        <p class="text-sm text-muted-foreground" [innerHTML]="t().howItWorksDesc"></p>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ t().tryIt }}</h2>
        <p class="text-sm text-muted-foreground">{{ t().tryItDesc }}</p>
        <div class="flex gap-4">
          <button snyBtn (click)="themeService.setTheme('light')">Light</button>
          <button snyBtn variant="outline" (click)="themeService.setTheme('dark')">Dark</button>
          <button snyBtn variant="secondary" (click)="themeService.toggleDark()">Toggle</button>
        </div>
        <p class="text-xs text-muted-foreground">
          {{ t().currentTheme }} <strong>{{ themeService.theme() }}</strong>
        </p>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ t().toggleButtonExample }}</h2>
        <docs-code-block [code]="toggleCode" language="typescript" />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ t().cssCustomVariant }}</h2>
        <p class="text-sm text-muted-foreground" [innerHTML]="t().cssCustomVariantDesc"></p>
        <docs-code-block [code]="variantCode" language="css" />
      </section>
    </div>
  `,
})
export class DarkModeComponent {
  readonly themeService = inject(ThemeService);
  private readonly i18n = inject(I18nService);
  readonly t = computed(() => this.i18n.locale() === 'es' ? THEMING_DARK_MODE_ES : THEMING_DARK_MODE_EN);

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
