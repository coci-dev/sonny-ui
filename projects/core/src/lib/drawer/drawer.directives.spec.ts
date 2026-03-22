import { Component, viewChild } from '@angular/core';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { SnyDrawerLayoutDirective, SnyDrawerContentDirective, SnyDrawerSideDirective } from './drawer.directives';

@Component({
  standalone: true,
  imports: [SnyDrawerLayoutDirective, SnyDrawerContentDirective, SnyDrawerSideDirective],
  template: `
    <div snyDrawerLayout #drawer="snyDrawerLayout">
      <div snyDrawerSide>Sidebar</div>
      <div snyDrawerContent>Main</div>
    </div>
  `,
})
class TestHostComponent {
  drawer = viewChild(SnyDrawerLayoutDirective);
}

describe('SnyDrawerLayoutDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TestHostComponent] }).compileComponents();
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should be closed by default', () => {
    const side = fixture.nativeElement.querySelector('[snyDrawerSide]');
    expect(side.className).toContain('-translate-x-full');
  });

  it('should open on toggle', () => {
    fixture.componentInstance.drawer()!.toggle();
    fixture.detectChanges();
    const side = fixture.nativeElement.querySelector('[snyDrawerSide]');
    expect(side.className).toContain('translate-x-0');
  });

  it('should close after open', () => {
    const d = fixture.componentInstance.drawer()!;
    d.open();
    fixture.detectChanges();
    d.close();
    fixture.detectChanges();
    const side = fixture.nativeElement.querySelector('[snyDrawerSide]');
    expect(side.className).toContain('-translate-x-full');
  });

  it('should have navigation role on drawer side', () => {
    const side = fixture.nativeElement.querySelector('[snyDrawerSide]');
    expect(side.getAttribute('role')).toBe('navigation');
  });

  it('should set aria-modal on side when overlay and open', () => {
    const side = fixture.nativeElement.querySelector('[snyDrawerSide]');
    expect(side.getAttribute('aria-modal')).toBeNull();
    fixture.componentInstance.drawer()!.open();
    fixture.detectChanges();
    expect(side.getAttribute('aria-modal')).toBe('true');
  });
});
