import { Component, signal, viewChild } from '@angular/core';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import {
  SnySidebarLayoutComponent,
  SnySidebarDirective,
  SnySidebarHeaderDirective,
  SnySidebarBodyDirective,
  SnySidebarFooterDirective,
  SnySidebarGroupComponent,
  SnySidebarItemDirective,
  SnySidebarSubMenuDirective,
  SnySidebarSubItemDirective,
  SnySidebarContentDirective,
} from './sidebar.directives';

@Component({
  standalone: true,
  imports: [
    SnySidebarLayoutComponent,
    SnySidebarDirective,
    SnySidebarHeaderDirective,
    SnySidebarBodyDirective,
    SnySidebarFooterDirective,
    SnySidebarGroupComponent,
    SnySidebarItemDirective,
    SnySidebarSubMenuDirective,
    SnySidebarSubItemDirective,
    SnySidebarContentDirective,
  ],
  template: `
    <div snySidebarLayout #sidebar="snySidebarLayout">
      <nav snySidebar [collapsible]="collapsible()">
        <div snySidebarHeader>Logo</div>
        <div snySidebarBody>
          <sny-sidebar-group label="Main">
            <a snySidebarItem [active]="true">Dashboard</a>
            <a snySidebarItem>Users</a>
            <div snySidebarItem [expandable]="true">
              Settings
              <div snySidebarSubMenu>
                <a snySidebarSubItem>General</a>
                <a snySidebarSubItem [active]="true">Security</a>
              </div>
            </div>
          </sny-sidebar-group>
          <sny-sidebar-group label="Support">
            <a snySidebarItem>Help</a>
          </sny-sidebar-group>
        </div>
        <div snySidebarFooter>Footer</div>
      </nav>
      <div snySidebarContent>Main Content</div>
    </div>
  `,
})
class TestHostComponent {
  collapsible = signal(true);
  sidebar = viewChild(SnySidebarLayoutComponent);
}

describe('Sidebar', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TestHostComponent] }).compileComponents();
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    host = fixture.nativeElement;
  });

  // ─── Rendering ───────────────────────────────────────────────────────────

  it('should render sidebar with navigation role', () => {
    const sidebar = host.querySelector('[snySidebar]');
    expect(sidebar?.getAttribute('role')).toBe('navigation');
  });

  it('should render header, body, and footer', () => {
    expect(host.querySelector('[snySidebarHeader]')).not.toBeNull();
    expect(host.querySelector('[snySidebarBody]')).not.toBeNull();
    expect(host.querySelector('[snySidebarFooter]')).not.toBeNull();
  });

  it('should render group with label', () => {
    const group = host.querySelector('sny-sidebar-group');
    expect(group).not.toBeNull();
    const label = group?.querySelector('.uppercase');
    expect(label?.textContent?.trim()).toBe('Main');
  });

  it('should render group with aria-label', () => {
    const groupDiv = host.querySelector('[role="group"]');
    expect(groupDiv?.getAttribute('aria-label')).toBe('Main');
  });

  it('should render items', () => {
    const items = host.querySelectorAll('[snySidebarItem]');
    expect(items.length).toBe(4); // Dashboard, Users, Settings, Help
  });

  it('should render main content area', () => {
    const content = host.querySelector('[snySidebarContent]');
    expect(content?.textContent?.trim()).toBe('Main Content');
  });

  // ─── State (collapse/expand) ─────────────────────────────────────────────

  it('should be expanded by default', () => {
    const sidebar = host.querySelector('[snySidebar]');
    expect(sidebar?.className).toContain('w-64');
  });

  it('should collapse on toggleCollapse()', () => {
    fixture.componentInstance.sidebar()!.toggleCollapse();
    fixture.detectChanges();
    const sidebar = host.querySelector('[snySidebar]');
    expect(sidebar?.className).toContain('w-16');
  });

  it('should expand on expand()', () => {
    const layout = fixture.componentInstance.sidebar()!;
    layout.collapse();
    fixture.detectChanges();
    layout.expand();
    fixture.detectChanges();
    const sidebar = host.querySelector('[snySidebar]');
    expect(sidebar?.className).toContain('w-64');
  });

  it('should hide group labels when collapsed', () => {
    fixture.componentInstance.sidebar()!.collapse();
    fixture.detectChanges();
    const label = host.querySelector('sny-sidebar-group .uppercase');
    expect(label).toBeNull();
  });

  // ─── Active item ─────────────────────────────────────────────────────────

  it('should set aria-current="page" on active item', () => {
    const activeItem = host.querySelector('[snySidebarItem][aria-current="page"]');
    expect(activeItem).not.toBeNull();
    expect(activeItem?.textContent?.trim()).toBe('Dashboard');
  });

  it('should apply active styles', () => {
    const activeItem = host.querySelector('[snySidebarItem][aria-current="page"]');
    expect(activeItem?.className).toContain('bg-accent');
  });

  // ─── Expandable items ────────────────────────────────────────────────────

  it('should have sub-menu collapsed by default', () => {
    const subMenu = host.querySelector('[snySidebarSubMenu]');
    expect(subMenu?.className).toContain('grid-rows-[0fr]');
  });

  it('should expand sub-menu on click', () => {
    const expandableItem = host.querySelector('[snySidebarItem][aria-expanded]') as HTMLElement;
    expandableItem.click();
    fixture.detectChanges();
    const subMenu = host.querySelector('[snySidebarSubMenu]');
    expect(subMenu?.className).toContain('grid-rows-[1fr]');
  });

  it('should toggle aria-expanded on expandable item', () => {
    const expandableItem = host.querySelector('[snySidebarItem][aria-expanded]') as HTMLElement;
    expect(expandableItem.getAttribute('aria-expanded')).toBe('false');
    expandableItem.click();
    fixture.detectChanges();
    expect(expandableItem.getAttribute('aria-expanded')).toBe('true');
  });

  it('should set aria-current="page" on active sub-item', () => {
    const activeSubItem = host.querySelector('[snySidebarSubItem][aria-current="page"]');
    expect(activeSubItem).not.toBeNull();
    expect(activeSubItem?.textContent?.trim()).toBe('Security');
  });

  // ─── Accessibility ───────────────────────────────────────────────────────

  it('should have default aria-label on sidebar', () => {
    const sidebar = host.querySelector('[snySidebar]');
    expect(sidebar?.getAttribute('aria-label')).toBe('Sidebar navigation');
  });

  it('should have role="group" on groups', () => {
    const groups = host.querySelectorAll('[role="group"]');
    expect(groups.length).toBe(2); // Main, Support
  });

  // ─── Keyboard navigation ────────────────────────────────────────────────

  it('should move focus down with ArrowDown', () => {
    const items = host.querySelectorAll<HTMLElement>('[snySidebarItem]');
    items[0].focus();
    items[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    fixture.detectChanges();
    expect(document.activeElement).toBe(items[1]);
  });

  it('should move focus up with ArrowUp', () => {
    const items = host.querySelectorAll<HTMLElement>('[snySidebarItem]');
    items[1].focus();
    items[1].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
    fixture.detectChanges();
    expect(document.activeElement).toBe(items[0]);
  });

  it('should move focus to first item with Home', () => {
    const items = host.querySelectorAll<HTMLElement>('[snySidebarItem]');
    items[2].focus();
    items[2].dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true }));
    fixture.detectChanges();
    expect(document.activeElement).toBe(items[0]);
  });

  it('should move focus to last item with End', () => {
    const items = host.querySelectorAll<HTMLElement>('[snySidebarItem]');
    items[0].focus();
    items[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true }));
    fixture.detectChanges();
    expect(document.activeElement).toBe(items[items.length - 1]);
  });

  // ─── exportAs ────────────────────────────────────────────────────────────

  it('should expose layout via exportAs template ref', () => {
    const layout = fixture.componentInstance.sidebar();
    expect(layout).toBeTruthy();
    expect(typeof layout!.toggleCollapse).toBe('function');
    expect(typeof layout!.collapse).toBe('function');
    expect(typeof layout!.expand).toBe('function');
    expect(typeof layout!.toggleMobile).toBe('function');
  });

  // ─── Custom class ────────────────────────────────────────────────────────

  it('should merge custom class on content directive', () => {
    const content = host.querySelector('[snySidebarContent]');
    expect(content?.className).toContain('flex-1');
    expect(content?.className).toContain('overflow-auto');
  });
});
