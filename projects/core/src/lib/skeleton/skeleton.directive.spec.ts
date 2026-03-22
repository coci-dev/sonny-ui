import { Component, signal } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { SnySkeletonDirective } from './skeleton.directive';
import type { SkeletonVariant, SkeletonSize } from './skeleton.variants';

@Component({
  standalone: true,
  imports: [SnySkeletonDirective],
  template: `<div snySkeleton [variant]="variant()" [size]="size()"></div>`,
})
class TestHostComponent {
  variant = signal<SkeletonVariant>('line');
  size = signal<SkeletonSize>('md');
}

describe('SnySkeletonDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    el = fixture.nativeElement.querySelector('div');
  });

  it('should apply default classes', () => {
    expect(el.className).toContain('animate-pulse');
    expect(el.className).toContain('bg-muted');
    expect(el.className).toContain('rounded-sm');
    expect(el.className).toContain('h-6');
  });

  it('should apply circular variant', () => {
    fixture.componentInstance.variant.set('circular');
    fixture.detectChanges();
    expect(el.className).toContain('rounded-full');
    expect(el.className).toContain('aspect-square');
  });

  it('should apply sm size', () => {
    fixture.componentInstance.size.set('sm');
    fixture.detectChanges();
    expect(el.className).toContain('h-4');
  });

  it('should apply xl size', () => {
    fixture.componentInstance.size.set('xl');
    fixture.detectChanges();
    expect(el.className).toContain('h-12');
  });

  it('should have aria-busy="true"', () => {
    expect(el.getAttribute('aria-busy')).toBe('true');
  });

  it('should have aria-hidden="true"', () => {
    expect(el.getAttribute('aria-hidden')).toBe('true');
  });
});
