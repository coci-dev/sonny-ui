import { Injectable, signal, computed, inject, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { SNY_CONFIG } from './sonny-config';

export type Theme = 'light' | 'dark' | 'corporate';

const STORAGE_KEY = 'sny-theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly config = inject(SNY_CONFIG);

  private readonly _theme = signal<Theme>('light');

  readonly theme = this._theme.asReadonly();
  readonly isDark = computed(() => this._theme() === 'dark');

  constructor() {
    this.setTheme(this.resolveInitialTheme());
  }

  setTheme(theme: Theme): void {
    this._theme.set(theme);

    if (!this.isBrowser) return;

    localStorage.setItem(STORAGE_KEY, theme);

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

  private resolveInitialTheme(): Theme {
    if (this.isBrowser) {
      const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
      if (stored) return stored;
    }

    const defaultTheme = this.config.defaultTheme ?? 'light';

    if (defaultTheme === 'system') {
      if (this.isBrowser && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
      return 'light';
    }

    return defaultTheme;
  }
}
