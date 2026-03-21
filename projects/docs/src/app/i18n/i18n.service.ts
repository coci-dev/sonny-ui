import { Injectable, computed, effect, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';
import type { Locale, CommonTranslations } from './i18n.types';
import { COMMON_EN } from './en/common';
import { COMMON_ES } from './es/common';

@Injectable({ providedIn: 'root' })
export class I18nService {
  private readonly router = inject(Router);

  readonly locale = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map((e) => this.detectLocale(e.urlAfterRedirects)),
    ),
    { initialValue: this.detectLocale(this.router.url) },
  );

  readonly common = computed<CommonTranslations>(() =>
    this.locale() === 'es' ? COMMON_ES : COMMON_EN,
  );

  constructor() {
    effect(() => {
      const lang = this.locale();
      document.documentElement.lang = lang;
    });
  }

  localizeLink(path: string): string {
    return this.locale() === 'es' ? `/es${path}` : path;
  }

  switchLocaleUrl(currentUrl: string): string {
    if (currentUrl.startsWith('/es/') || currentUrl === '/es') {
      return currentUrl.replace(/^\/es/, '') || '/';
    }
    return `/es${currentUrl}`;
  }

  private detectLocale(url: string): Locale {
    return url.startsWith('/es/') || url === '/es' ? 'es' : 'en';
  }
}
