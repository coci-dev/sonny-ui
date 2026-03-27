import { Component, inject, signal } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { filter, map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavbarComponent } from './layout/navbar';
import { SidebarComponent } from './layout/sidebar';

@Component({
  selector: 'docs-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, SidebarComponent],
  template: `
    <docs-navbar [isHome]="!!isHome()" (toggleSidebar)="sidebarOpen.set(!sidebarOpen())" />
    <div [class]="isHome() ? 'pt-16' : 'flex pt-16 h-screen'">
      @if (!isHome()) {
        <docs-sidebar [open]="sidebarOpen()" (close)="sidebarOpen.set(false)" />
      }
      <main [class]="isHome() ? 'flex-1 min-w-0 w-full' : 'flex-1 min-w-0 overflow-y-auto'">
        <div [class]="isHome() ? '' : 'px-3 py-6 sm:px-6 sm:py-8 lg:px-8 max-w-4xl mx-auto w-full'">
          <router-outlet />
        </div>
      </main>
    </div>
  `,
})
export class App {
  private readonly router = inject(Router);
  readonly isHome = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map((e) => e.urlAfterRedirects === '/' || e.urlAfterRedirects === '/es')
    ),
    { initialValue: this.router.url === '/' || this.router.url === '/es' }
  );
  readonly sidebarOpen = signal(false);
}
