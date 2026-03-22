import { Component, signal } from '@angular/core';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { SnyListDirective, SnyListItemDirective, SnyListItemContentDirective, type ListVariant } from './list.directives';

@Component({
  standalone: true,
  imports: [SnyListDirective, SnyListItemDirective, SnyListItemContentDirective],
  template: `
    <div snyList [variant]="variant()">
      <div snyListItem [active]="active()" [disabled]="disabled()">
        <div snyListItemContent>Item 1</div>
      </div>
      <div snyListItem>
        <div snyListItemContent>Item 2</div>
      </div>
    </div>
  `,
})
class TestHostComponent {
  variant = signal<ListVariant>('default');
  active = signal(false);
  disabled = signal(false);
}

describe('SnyListDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TestHostComponent] }).compileComponents();
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should render with list role', () => {
    const list = fixture.nativeElement.querySelector('[snyList]');
    expect(list.getAttribute('role')).toBe('list');
  });

  it('should render items with listitem role', () => {
    const items = fixture.nativeElement.querySelectorAll('[snyListItem]');
    expect(items.length).toBe(2);
    expect(items[0].getAttribute('role')).toBe('listitem');
  });

  it('should apply bordered variant', () => {
    fixture.componentInstance.variant.set('bordered');
    fixture.detectChanges();
    const list = fixture.nativeElement.querySelector('[snyList]');
    expect(list.className).toContain('border');
  });

  it('should apply active state', () => {
    fixture.componentInstance.active.set(true);
    fixture.detectChanges();
    const item = fixture.nativeElement.querySelector('[snyListItem]');
    expect(item.className).toContain('bg-accent');
  });

  it('should set aria-disabled', () => {
    fixture.componentInstance.disabled.set(true);
    fixture.detectChanges();
    const item = fixture.nativeElement.querySelector('[snyListItem]');
    expect(item.getAttribute('aria-disabled')).toBe('true');
  });
});
