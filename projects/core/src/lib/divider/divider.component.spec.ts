import { Component, signal } from '@angular/core';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { SnyDividerComponent } from './divider.component';
import type { DividerOrientation } from './divider.variants';

@Component({
  standalone: true,
  imports: [SnyDividerComponent],
  template: `<sny-divider [orientation]="orientation()" [label]="label()" />`,
})
class TestHostComponent {
  orientation = signal<DividerOrientation>('horizontal');
  label = signal('');
}

describe('SnyDividerComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TestHostComponent] }).compileComponents();
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    host = fixture.nativeElement.querySelector('sny-divider');
  });

  it('should have separator role', () => {
    expect(host.getAttribute('role')).toBe('separator');
  });

  it('should set aria-orientation', () => {
    expect(host.getAttribute('aria-orientation')).toBe('horizontal');
    fixture.componentInstance.orientation.set('vertical');
    fixture.detectChanges();
    expect(host.getAttribute('aria-orientation')).toBe('vertical');
  });

  it('should render simple divider without label', () => {
    const div = host.querySelector('div');
    expect(div!.className).toContain('bg-border');
  });

  it('should render label when provided', () => {
    fixture.componentInstance.label.set('OR');
    fixture.detectChanges();
    expect(host.textContent).toContain('OR');
  });
});
