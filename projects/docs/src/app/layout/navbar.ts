import { Component, inject, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThemeService, type Theme, SnyDialogService } from 'core';
import { SearchDialogComponent } from '../shared/search-dialog';

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
        <div class="flex items-center gap-4">
          <button
            class="lg:hidden p-2 rounded-sm hover:bg-accent transition-colors"
            (click)="toggleSidebar.emit()"
            aria-label="Toggle sidebar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
          </button>
          <a routerLink="/" class="flex items-center gap-2 text-lg font-bold tracking-tight">
            <img src="logo.png" alt="SonnyUI" class="h-8 w-auto" />
            SonnyUI
            <span class="text-[10px] font-medium uppercase tracking-wider rounded-sm bg-yellow-500/10 text-yellow-600 border border-yellow-500/20 px-1.5 py-0.5">alpha</span>
          </a>
        </div>

        <!-- Center links (desktop) -->
        <nav class="hidden md:flex items-center gap-6 text-sm">
          <a routerLink="/docs" class="text-muted-foreground hover:text-foreground transition-colors">Docs</a>
          <a routerLink="/docs/components/button" class="text-muted-foreground hover:text-foreground transition-colors">Components</a>
          <a href="https://github.com/poseimus/sonny-ui" target="_blank" rel="noopener" class="text-muted-foreground hover:text-foreground transition-colors">GitHub</a>
        </nav>

        <!-- Right: search + theme toggle -->
        <div class="flex items-center gap-2">
          <button
            (click)="openSearch()"
            class="hidden md:inline-flex items-center gap-2 border border-border rounded-sm px-3 py-1.5 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            Search docs...
            <kbd class="ml-2 rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px]">Ctrl K</kbd>
          </button>

          <div class="flex items-center gap-1">
            @for (t of themes; track t) {
              <button
                (click)="themeService.setTheme(t)"
                [class]="
                  'rounded-sm px-2.5 py-1 text-xs font-medium capitalize transition-colors ' +
                  (themeService.theme() === t
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground')
                "
              >
                {{ t }}
              </button>
            }
          </div>
        </div>
      </div>
    </header>
  `,
})
export class NavbarComponent {
  readonly toggleSidebar = output();
  readonly themeService = inject(ThemeService);
  readonly themes: Theme[] = ['light', 'dark', 'corporate'];

  private readonly dialogService = inject(SnyDialogService);
  private searchOpen = false;

  onGlobalKeydown(event: KeyboardEvent): void {
    if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
      event.preventDefault();
      this.openSearch();
    }
  }

  openSearch(): void {
    if (this.searchOpen) return;
    this.searchOpen = true;

    const ref = this.dialogService.open(SearchDialogComponent, {
      width: '32rem',
    });

    ref.closed.subscribe(() => {
      this.searchOpen = false;
    });
  }
}
