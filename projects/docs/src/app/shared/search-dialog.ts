import {
  Component,
  computed,
  inject,
  signal,
  viewChild,
  afterNextRender,
  ElementRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { DialogRef } from '@angular/cdk/dialog';
import { SnyInputDirective } from 'core';
import { I18nService } from '../i18n/i18n.service';

@Component({
  selector: 'docs-search-dialog',
  standalone: true,
  imports: [SnyInputDirective],
  host: {
    '(keydown)': 'onKeydown($event)',
  },
  styles: `
    :host {
      display: block;
      background-color: var(--sny-background);
      border: 1px solid var(--sny-border);
      border-radius: 0.5rem;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
      overflow: hidden;
    }
  `,
  template: `
    <div class="flex items-center gap-2 border-b border-border px-3 py-3">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-muted-foreground shrink-0"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
      <input
        #searchInput
        snyInput
        class="border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 h-8 px-0"
        [placeholder]="i18n.common().search.placeholder"
        [value]="query()"
        (input)="onQueryChange(searchInput.value)"
      />
    </div>

    <div class="max-h-[300px] overflow-y-auto p-2">
      @if (flatResults().length === 0) {
        <p class="py-6 text-center text-sm text-muted-foreground">{{ i18n.common().search.noResults }}</p>
      } @else {
        @for (section of filteredSections(); track section.title) {
          <div class="mb-2">
            <p class="px-2 py-1.5 text-xs font-medium text-muted-foreground">{{ section.title }}</p>
            @for (item of section.items; track item.path) {
              <button
                [attr.data-search-idx]="flatIndex(item)"
                [class]="
                  'w-full text-left rounded-sm px-2 py-1.5 text-sm transition-colors cursor-pointer ' +
                  (flatIndex(item) === activeIndex()
                    ? 'bg-accent text-accent-foreground'
                    : 'text-foreground hover:bg-accent/50')
                "
                (click)="select(item)"
                (mouseenter)="activeIndex.set(flatIndex(item))"
              >
                {{ item.label }}
              </button>
            }
          </div>
        }
      }
    </div>

    <div class="border-t border-border px-3 py-2">
      <div class="flex items-center gap-3 text-xs text-muted-foreground">
        <span class="flex items-center gap-1">
          <kbd class="rounded border border-border bg-muted px-1 py-0.5 font-mono text-[10px]">&uarr;&darr;</kbd>
          {{ i18n.common().search.navigate }}
        </span>
        <span class="flex items-center gap-1">
          <kbd class="rounded border border-border bg-muted px-1 py-0.5 font-mono text-[10px]">&crarr;</kbd>
          {{ i18n.common().search.open }}
        </span>
        <span class="flex items-center gap-1">
          <kbd class="rounded border border-border bg-muted px-1 py-0.5 font-mono text-[10px]">Esc</kbd>
          {{ i18n.common().search.close }}
        </span>
      </div>
    </div>
  `,
})
export class SearchDialogComponent {
  private readonly router = inject(Router);
  private readonly dialogRef = inject(DialogRef);
  private readonly searchInput =
    viewChild<ElementRef<HTMLInputElement>>('searchInput');
  readonly i18n = inject(I18nService);

  readonly query = signal('');
  readonly activeIndex = signal(0);

  private readonly sidebarSections = computed(() => this.i18n.common().sidebar);

  readonly filteredSections = computed(() => {
    const q = this.query().toLowerCase().trim();
    const sections = this.sidebarSections();
    if (!q) return sections;

    return sections.map((section) => ({
      ...section,
      items: section.items.filter(
        (item) =>
          item.label.toLowerCase().includes(q) ||
          section.title.toLowerCase().includes(q),
      ),
    })).filter((section) => section.items.length > 0);
  });

  readonly flatResults = computed(() =>
    this.filteredSections().flatMap((s) => s.items),
  );

  constructor() {
    afterNextRender(() => {
      this.searchInput()?.nativeElement.focus();
    });
  }

  onQueryChange(value: string): void {
    this.query.set(value);
    this.activeIndex.set(0);
  }

  flatIndex(item: { label: string; path: string }): number {
    return this.flatResults().indexOf(item);
  }

  select(item: { label: string; path: string }): void {
    this.router.navigate([item.path]);
    this.dialogRef.close();
  }

  onKeydown(event: KeyboardEvent): void {
    const results = this.flatResults();
    const len = results.length;
    if (len === 0) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.activeIndex.update((i) => (i + 1) % len);
        this.scrollActiveIntoView();
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.activeIndex.update((i) => (i - 1 + len) % len);
        this.scrollActiveIntoView();
        break;
      case 'Enter':
        event.preventDefault();
        const active = results[this.activeIndex()];
        if (active) this.select(active);
        break;
    }
  }

  private scrollActiveIntoView(): void {
    requestAnimationFrame(() => {
      const el = document.querySelector(
        `[data-search-idx="${this.activeIndex()}"]`,
      );
      el?.scrollIntoView({ block: 'nearest' });
    });
  }
}
