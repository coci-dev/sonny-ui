import { Component, signal } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { SnyBadgeDirective } from './badge.directive';
import type { BadgeVariant, BadgeSize } from './badge.variants';

@Component({
  standalone: true,
  imports: [SnyBadgeDirective],
  template: `<span snyBadge [variant]="variant()" [size]="size()">Badge</span>`,
})
class TestHostComponent {
  variant = signal<BadgeVariant>('default');
  size = signal<BadgeSize>('md');
}

describe('SnyBadgeDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    el = fixture.nativeElement.querySelector('[snyBadge]');
  });

  it('should apply default variant classes', () => {
    expect(el.className).toContain('bg-primary');
    expect(el.className).toContain('text-primary-foreground');
  });

  it('should apply destructive variant', () => {
    fixture.componentInstance.variant.set('destructive');
    fixture.detectChanges();
    expect(el.className).toContain('bg-destructive');
  });

  it('should apply outline variant', () => {
    fixture.componentInstance.variant.set('outline');
    fixture.detectChanges();
    expect(el.className).toContain('border-border');
  });

  it('should apply success variant', () => {
    fixture.componentInstance.variant.set('success');
    fixture.detectChanges();
    expect(el.className).toContain('bg-green-600');
  });

  it('should apply warning variant', () => {
    fixture.componentInstance.variant.set('warning');
    fixture.detectChanges();
    expect(el.className).toContain('bg-yellow-500');
  });

  it('should apply sm size', () => {
    fixture.componentInstance.size.set('sm');
    fixture.detectChanges();
    expect(el.className).toContain('text-[10px]');
  });

  it('should apply lg size', () => {
    fixture.componentInstance.size.set('lg');
    fixture.detectChanges();
    expect(el.className).toContain('text-sm');
  });

  it('should have rounded-full class', () => {
    expect(el.className).toContain('rounded-full');
  });
});
