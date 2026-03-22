import { Component, signal } from '@angular/core';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { SnyNavbarDirective, SnyNavbarBrandDirective, SnyNavbarContentDirective, SnyNavbarEndDirective, type NavbarVariant } from './navbar.directives';

@Component({
  standalone: true,
  imports: [SnyNavbarDirective, SnyNavbarBrandDirective, SnyNavbarContentDirective, SnyNavbarEndDirective],
  template: `
    <nav snyNavbar [variant]="variant()" [sticky]="sticky()">
      <div snyNavbarBrand>Logo</div>
      <div snyNavbarContent>Links</div>
      <div snyNavbarEnd>Actions</div>
    </nav>
  `,
})
class TestHostComponent {
  variant = signal<NavbarVariant>('default');
  sticky = signal(false);
}

describe('SnyNavbarDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let nav: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TestHostComponent] }).compileComponents();
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    nav = fixture.nativeElement.querySelector('[snyNavbar]');
  });

  it('should apply default classes', () => {
    expect(nav.className).toContain('bg-background');
    expect(nav.className).toContain('flex');
  });

  it('should apply bordered variant', () => {
    fixture.componentInstance.variant.set('bordered');
    fixture.detectChanges();
    expect(nav.className).toContain('border-b');
  });

  it('should apply sticky class', () => {
    fixture.componentInstance.sticky.set(true);
    fixture.detectChanges();
    expect(nav.className).toContain('sticky');
    expect(nav.className).toContain('top-0');
  });

  it('should render brand, content, end sections', () => {
    expect(fixture.nativeElement.querySelector('[snyNavbarBrand]')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('[snyNavbarContent]')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('[snyNavbarEnd]')).toBeTruthy();
  });

  it('should have default aria-label "Main navigation"', () => {
    expect(nav.getAttribute('aria-label')).toBe('Main navigation');
  });
});
