import { Component, signal } from '@angular/core';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { SnyDiffComponent } from './diff.component';

@Component({
  standalone: true,
  imports: [SnyDiffComponent],
  template: `
    <sny-diff [(value)]="value">
      <div snyDiffBefore>Before</div>
      <div snyDiffAfter>After</div>
    </sny-diff>
  `,
})
class TestHostComponent {
  value = signal(50);
}

describe('SnyDiffComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TestHostComponent] }).compileComponents();
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    host = fixture.nativeElement.querySelector('sny-diff');
  });

  it('should render slider handle', () => {
    const slider = host.querySelector('[role="slider"]');
    expect(slider).not.toBeNull();
    expect(slider!.getAttribute('aria-valuenow')).toBe('50');
  });

  it('should handle keyboard ArrowLeft', () => {
    host.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
    fixture.detectChanges();
    expect(fixture.componentInstance.value()).toBe(45);
  });

  it('should handle keyboard ArrowRight', () => {
    host.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    fixture.detectChanges();
    expect(fixture.componentInstance.value()).toBe(55);
  });
});
