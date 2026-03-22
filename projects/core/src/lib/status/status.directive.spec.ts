import { Component, signal } from '@angular/core';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { SnyStatusDirective } from './status.directive';
import type { StatusVariant } from './status.variants';

@Component({
  standalone: true,
  imports: [SnyStatusDirective],
  template: `<span snyStatus [variant]="variant()" [pulse]="pulse()"></span>`,
})
class TestHostComponent {
  variant = signal<StatusVariant>('default');
  pulse = signal(false);
}

describe('SnyStatusDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TestHostComponent] }).compileComponents();
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    el = fixture.nativeElement.querySelector('[snyStatus]');
  });

  it('should have status role', () => {
    expect(el.getAttribute('role')).toBe('status');
  });

  it('should apply success variant', () => {
    fixture.componentInstance.variant.set('success');
    fixture.detectChanges();
    expect(el.className).toContain('bg-green-500');
    expect(el.getAttribute('aria-label')).toBe('Online');
  });

  it('should apply pulse animation', () => {
    fixture.componentInstance.pulse.set(true);
    fixture.detectChanges();
    expect(el.className).toContain('animate-pulse');
  });
});
