import { Component, computed, inject, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { I18nService } from '../i18n/i18n.service';

@Component({
  selector: 'docs-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <!-- Backdrop (mobile) -->
    @if (open()) {
      <div
        class="fixed inset-0 z-30 bg-black/50 lg:hidden"
        (click)="close.emit()"
      ></div>
    }

    <!-- Sidebar panel -->
    <aside
      [class]="
        'fixed top-16 bottom-0 z-40 w-64 overflow-y-auto border-r border-border bg-background px-4 py-6 transition-transform duration-200 lg:sticky lg:translate-x-0 ' +
        (open() ? 'translate-x-0' : '-translate-x-full')
      "
    >
      @for (section of sections(); track section.title) {
        <div class="mb-4">
          <h4 class="mb-1 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {{ section.title }}
          </h4>
          <nav class="flex flex-col gap-0.5">
            @for (item of section.items; track item.path) {
              <a
                [routerLink]="item.path"
                routerLinkActive="bg-accent text-accent-foreground font-medium"
                class="rounded-sm px-2 py-1.5 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                (click)="close.emit()"
              >
                {{ item.label }}
              </a>
            }
          </nav>
        </div>
      }
    </aside>
  `,
})
export class SidebarComponent {
  readonly open = input(false);
  readonly close = output();
  private readonly i18n = inject(I18nService);
  readonly sections = computed(() => this.i18n.common().sidebar);
}
