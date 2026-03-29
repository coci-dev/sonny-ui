import { Component, computed, inject, input, output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ThemeService, type Theme, SnyCommandPaletteService, type Command } from 'core';
import { I18nService } from '../i18n/i18n.service';
import { LIB_VERSION, NPM_URL } from '../shared/version';

@Component({
  selector: 'docs-navbar',
  standalone: true,
  imports: [RouterLink],
  host: {
    '(document:keydown)': 'onGlobalKeydown($event)',
  },
  template: `
    <header class="fixed top-0 left-0 right-0 z-50 h-16 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div class="flex h-full items-center justify-between px-4 lg:px-6">
        <!-- Left -->
        <div class="flex items-center gap-2 sm:gap-4 min-w-0">
          @if (!isHome()) {
            <button
              class="lg:hidden p-2 rounded-sm hover:bg-accent transition-colors shrink-0"
              (click)="toggleSidebar.emit()"
              [attr.aria-label]="i18n.common().nav.toggleSidebar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
            </button>
          }
          <a [routerLink]="i18n.localizeLink('/')" class="flex items-center gap-2 text-lg font-bold tracking-tight shrink-0">
            <img src="logo.png" alt="SonnyUI" class="h-8 w-auto" />
            <span class="hidden sm:inline">SonnyUI</span>
          </a>
          <a [href]="npmUrl" target="_blank" rel="noopener" class="text-[10px] font-medium tracking-wider rounded-sm bg-yellow-500/10 text-yellow-600 border border-yellow-500/20 px-1.5 py-0.5 hover:bg-yellow-500/20 transition-colors no-underline shrink-0">v{{ version }}</a>
        </div>

        <!-- Center links (desktop) -->
        <nav class="hidden md:flex items-center gap-6 text-sm">
          <a [routerLink]="i18n.localizeLink('/docs')" class="text-muted-foreground hover:text-foreground transition-colors">{{ i18n.common().nav.docs }}</a>
          <a [routerLink]="i18n.localizeLink('/docs/components/button')" class="text-muted-foreground hover:text-foreground transition-colors">{{ i18n.common().nav.components }}</a>
          <a href="https://github.com/coci-dev/sonny-ui" target="_blank" rel="noopener" class="text-muted-foreground hover:text-foreground transition-colors">{{ i18n.common().nav.github }}</a>
        </nav>

        <!-- Right: search + lang switcher + theme toggle -->
        <div class="flex items-center gap-1 sm:gap-2 shrink-0">
          <!-- Mobile search button -->
          <button
            (click)="openCommandPalette()"
            class="md:hidden p-2 rounded-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </button>

          <!-- Desktop search button -->
          <button
            (click)="openCommandPalette()"
            class="hidden md:inline-flex items-center gap-2 border border-border rounded-sm px-3 py-1.5 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            {{ i18n.common().nav.searchPlaceholder }}
            <kbd class="ml-2 rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px]">Ctrl K</kbd>
          </button>

          <!-- Language switcher -->
          <button
            (click)="switchLanguage()"
            class="rounded-sm px-2 py-1 text-xs font-medium transition-colors text-muted-foreground hover:bg-accent hover:text-accent-foreground border border-border"
          >
            {{ i18n.locale() === 'es' ? 'EN' : 'ES' }}
          </button>

          <div class="flex items-center gap-1">
            @for (t of themes; track t) {
              <button
                (click)="themeService.setTheme(t)"
                [class]="
                  'rounded-sm sm:px-2.5 px-1.5 py-1 text-xs font-medium transition-colors ' +
                  (themeService.theme() === t
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground')
                "
              >
                <span class="hidden sm:inline capitalize">{{ t }}</span>
                @if (t === 'light') {
                  <svg class="sm:hidden" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
                } @else if (t === 'dark') {
                  <svg class="sm:hidden" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
                } @else {
                  <svg class="sm:hidden" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></svg>
                }
              </button>
            }
          </div>
        </div>
      </div>
    </header>
  `,
})
export class NavbarComponent {
  readonly isHome = input(false);
  readonly toggleSidebar = output();
  readonly themeService = inject(ThemeService);
  readonly i18n = inject(I18nService);
  readonly themes: Theme[] = ['light', 'dark', 'corporate'];
  readonly version = LIB_VERSION;
  readonly npmUrl = NPM_URL;

  private readonly router = inject(Router);
  private readonly commandPalette = inject(SnyCommandPaletteService);

  readonly commands = computed<Command[]>(() => {
    const nav = this.i18n.common();
    const commands: Command[] = [];

    // Navigation commands from sidebar
    for (const section of nav.sidebar) {
      for (const item of section.items) {
        commands.push({
          id: `nav-${item.path}`,
          label: item.label,
          group: section.title,
          keywords: [section.title.toLowerCase()],
          action: () => this.router.navigate([item.path]),
        });
      }
    }

    // Theme commands
    commands.push(
      { id: 'theme-light', label: 'Light Theme', group: 'Theme', icon: '☀️', action: () => this.themeService.setTheme('light') },
      { id: 'theme-dark', label: 'Dark Theme', group: 'Theme', icon: '🌙', action: () => this.themeService.setTheme('dark') },
      { id: 'theme-corporate', label: 'Corporate Theme', group: 'Theme', icon: '🏢', action: () => this.themeService.setTheme('corporate') },
    );

    // Language
    commands.push({
      id: 'lang-switch',
      label: this.i18n.locale() === 'es' ? 'Switch to English' : 'Cambiar a Español',
      group: 'Settings',
      icon: '🌐',
      action: () => this.switchLanguage(),
    });

    // Actions
    commands.push({
      id: 'copy-url',
      label: 'Copy Current URL',
      group: 'Actions',
      keywords: ['clipboard', 'share', 'link'],
      action: () => navigator.clipboard.writeText(location.href),
    });

    commands.push({
      id: 'github',
      label: 'Open GitHub',
      group: 'Actions',
      action: () => window.open('https://github.com/coci-dev/sonny-ui', '_blank'),
    });

    return commands;
  });

  onGlobalKeydown(event: KeyboardEvent): void {
    if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
      event.preventDefault();
      this.openCommandPalette();
    }
  }

  openCommandPalette(): void {
    this.commandPalette.open({
      commands: this.commands(),
      placeholder: this.i18n.common().nav.searchPlaceholder,
    });
  }

  switchLanguage(): void {
    const newUrl = this.i18n.switchLocaleUrl(this.router.url);
    this.router.navigateByUrl(newUrl);
  }
}
