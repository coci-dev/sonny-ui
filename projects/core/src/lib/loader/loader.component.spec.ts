import { Component, signal } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { SnyLoaderComponent } from './loader.component';
import type { LoaderVariant, LoaderSize } from './loader.variants';

@Component({
  standalone: true,
  imports: [SnyLoaderComponent],
  template: `<sny-loader [variant]="variant()" [size]="size()" />`,
})
class TestHostComponent {
  variant = signal<LoaderVariant>('spinner');
  size = signal<LoaderSize>('md');
}

describe('SnyLoaderComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    el = fixture.nativeElement.querySelector('sny-loader');
  });

  it('should have status role', () => {
    expect(el.getAttribute('role')).toBe('status');
  });

  it('should render spinner by default', () => {
    expect(el.querySelector('svg')).toBeTruthy();
    expect(el.className).toContain('h-6');
  });

  it('should render dots variant', () => {
    fixture.componentInstance.variant.set('dots');
    fixture.detectChanges();
    const dots = el.querySelectorAll('.rounded-full');
    expect(dots.length).toBe(3);
  });

  it('should render bars variant', () => {
    fixture.componentInstance.variant.set('bars');
    fixture.detectChanges();
    const bars = el.querySelectorAll('.rounded-sm');
    expect(bars.length).toBe(4);
  });

  it('should apply lg size', () => {
    fixture.componentInstance.size.set('lg');
    fixture.detectChanges();
    expect(el.className).toContain('h-8');
  });
});
