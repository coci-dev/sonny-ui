import { Component, signal } from '@angular/core';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { SnyProgressComponent } from './progress.component';
import type { ProgressVariant, ProgressSize } from './progress.variants';

@Component({
  standalone: true,
  imports: [SnyProgressComponent],
  template: `
    <sny-progress
      [value]="value()"
      [max]="max()"
      [variant]="variant()"
      [size]="size()"
      [indeterminate]="indeterminate()"
      [label]="label()"
    />
  `,
})
class TestHostComponent {
  value = signal(50);
  max = signal(100);
  variant = signal<ProgressVariant>('default');
  size = signal<ProgressSize>('md');
  indeterminate = signal(false);
  label = signal('Loading');
}

describe('SnyProgressComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    host = fixture.nativeElement.querySelector('sny-progress');
  });

  it('should render with progressbar role', () => {
    expect(host.getAttribute('role')).toBe('progressbar');
  });

  it('should set aria-valuenow to current value', () => {
    expect(host.getAttribute('aria-valuenow')).toBe('50');
  });

  it('should set aria-valuemin to 0', () => {
    expect(host.getAttribute('aria-valuemin')).toBe('0');
  });

  it('should set aria-valuemax to max value', () => {
    expect(host.getAttribute('aria-valuemax')).toBe('100');
  });

  it('should set aria-label', () => {
    expect(host.getAttribute('aria-label')).toBe('Loading');
  });

  it('should calculate percentage correctly', () => {
    const bar = host.querySelector('div > div') as HTMLElement;
    expect(bar.style.width).toBe('50%');
  });

  it('should update percentage when value changes', () => {
    fixture.componentInstance.value.set(75);
    fixture.detectChanges();
    const bar = host.querySelector('div > div') as HTMLElement;
    expect(bar.style.width).toBe('75%');
    expect(host.getAttribute('aria-valuenow')).toBe('75');
  });

  it('should cap percentage at 100%', () => {
    fixture.componentInstance.value.set(150);
    fixture.detectChanges();
    const bar = host.querySelector('div > div') as HTMLElement;
    expect(bar.style.width).toBe('100%');
  });

  it('should omit aria-valuenow when indeterminate', () => {
    fixture.componentInstance.indeterminate.set(true);
    fixture.detectChanges();
    expect(host.getAttribute('aria-valuenow')).toBeNull();
  });

  it('should apply indeterminate animation class', () => {
    fixture.componentInstance.indeterminate.set(true);
    fixture.detectChanges();
    const bar = host.querySelector('div > div') as HTMLElement;
    expect(bar.className).toContain('animate-progress-indeterminate');
  });

  it('should apply size variant', () => {
    fixture.componentInstance.size.set('lg');
    fixture.detectChanges();
    const track = host.querySelector('div') as HTMLElement;
    expect(track.className).toContain('h-4');
  });

  it('should apply success variant', () => {
    fixture.componentInstance.variant.set('success');
    fixture.detectChanges();
    const bar = host.querySelector('div > div') as HTMLElement;
    expect(bar.className).toContain('bg-green-600');
  });

  it('should work with custom max value', () => {
    fixture.componentInstance.max.set(200);
    fixture.componentInstance.value.set(100);
    fixture.detectChanges();
    const bar = host.querySelector('div > div') as HTMLElement;
    expect(bar.style.width).toBe('50%');
    expect(host.getAttribute('aria-valuemax')).toBe('200');
  });
});
