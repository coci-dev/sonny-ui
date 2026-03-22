import { Component, signal } from '@angular/core';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { SnyDockDirective, SnyDockItemDirective, type DockPosition } from './dock.directives';

@Component({
  standalone: true,
  imports: [SnyDockDirective, SnyDockItemDirective],
  template: `
    <div snyDock [position]="position()">
      <button snyDockItem [active]="true">Home</button>
      <button snyDockItem>Settings</button>
    </div>
  `,
})
class TestHostComponent {
  position = signal<DockPosition>('bottom');
}

describe('SnyDockDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TestHostComponent] }).compileComponents();
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should render with toolbar role', () => {
    const dock = fixture.nativeElement.querySelector('[snyDock]');
    expect(dock.getAttribute('role')).toBe('toolbar');
  });

  it('should position at bottom by default', () => {
    const dock = fixture.nativeElement.querySelector('[snyDock]');
    expect(dock.className).toContain('bottom-4');
  });

  it('should position at top', () => {
    fixture.componentInstance.position.set('top');
    fixture.detectChanges();
    const dock = fixture.nativeElement.querySelector('[snyDock]');
    expect(dock.className).toContain('top-4');
  });

  it('should apply active state to dock item', () => {
    const items = fixture.nativeElement.querySelectorAll('[snyDockItem]');
    expect(items[0].className).toContain('bg-primary');
  });

  it('should move focus with ArrowRight', () => {
    const items = fixture.nativeElement.querySelectorAll('[snyDockItem]');
    (items[0] as HTMLElement).focus();
    items[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    fixture.detectChanges();
    const updated = fixture.nativeElement.querySelectorAll('[snyDockItem]');
    expect(document.activeElement).toBe(updated[1]);
  });

  it('should move focus with ArrowLeft', () => {
    const items = fixture.nativeElement.querySelectorAll('[snyDockItem]');
    (items[1] as HTMLElement).focus();
    items[1].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
    fixture.detectChanges();
    const updated = fixture.nativeElement.querySelectorAll('[snyDockItem]');
    expect(document.activeElement).toBe(updated[0]);
  });

  it('should move focus to first with Home', () => {
    const items = fixture.nativeElement.querySelectorAll('[snyDockItem]');
    (items[1] as HTMLElement).focus();
    items[1].dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true }));
    fixture.detectChanges();
    const updated = fixture.nativeElement.querySelectorAll('[snyDockItem]');
    expect(document.activeElement).toBe(updated[0]);
  });

  it('should move focus to last with End', () => {
    const items = fixture.nativeElement.querySelectorAll('[snyDockItem]');
    (items[0] as HTMLElement).focus();
    items[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true }));
    fixture.detectChanges();
    const updated = fixture.nativeElement.querySelectorAll('[snyDockItem]');
    expect(document.activeElement).toBe(updated[1]);
  });
});
