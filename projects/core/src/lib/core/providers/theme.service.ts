import { Injectable, signal, computed, inject, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

export type Theme = 'light' | 'dark' | 'corporate';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  private readonly _theme = signal<Theme>('light');

  readonly theme = this._theme.asReadonly();
  readonly isDark = computed(() => this._theme() === 'dark');

  setTheme(theme: Theme): void {
    this._theme.set(theme);

    if (!this.isBrowser) return;

    const root = this.document.documentElement;
    root.classList.remove('dark');
    root.removeAttribute('data-theme');

    if (theme === 'dark') {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
    } else if (theme !== 'light') {
      root.setAttribute('data-theme', theme);
    }
  }

  toggleDark(): void {
    this.setTheme(this._theme() === 'dark' ? 'light' : 'dark');
  }
}
