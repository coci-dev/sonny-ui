import { Component, inject } from '@angular/core';
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
    <docs-navbar (toggleSidebar)="sidebarOpen = !sidebarOpen" />
    <div class="flex pt-16">
      @if (!isHome()) {
        <docs-sidebar [open]="sidebarOpen" (close)="sidebarOpen = false" />
      }
      <main [class]="isHome() ? 'flex-1 min-w-0 w-full' : 'flex-1 min-w-0 px-6 py-8 lg:px-8 max-w-4xl mx-auto w-full'">
        <router-outlet />
      </main>
    </div>
  `,
})
export class App {
  private readonly router = inject(Router);
  readonly isHome = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map((e) => e.urlAfterRedirects === '/')
    ),
    { initialValue: this.router.url === '/' }
  );
  sidebarOpen = false;
}
