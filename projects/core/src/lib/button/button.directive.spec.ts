import { Component, signal } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { SnyButtonDirective } from './button.directive';
import type { ButtonVariant, ButtonSize } from './button.variants';

@Component({
  standalone: true,
  imports: [SnyButtonDirective],
  template: `<button snyBtn [variant]="variant()" [size]="size()" [disabled]="disabled()" [loading]="loading()">Click</button>`,
})
class TestHostComponent {
  variant = signal<ButtonVariant>('default');
  size = signal<ButtonSize>('md');
  disabled = signal(false);
  loading = signal(false);
}

describe('SnyButtonDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let button: HTMLButtonElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    button = fixture.nativeElement.querySelector('button');
  });

  it('should apply default variant classes', () => {
    expect(button.className).toContain('bg-primary');
    expect(button.className).toContain('text-primary-foreground');
  });

  it('should apply destructive variant', () => {
    fixture.componentInstance.variant.set('destructive');
    fixture.detectChanges();
    expect(button.className).toContain('bg-destructive');
  });

  it('should apply outline variant', () => {
    fixture.componentInstance.variant.set('outline');
    fixture.detectChanges();
    expect(button.className).toContain('border');
    expect(button.className).toContain('bg-background');
  });

  it('should apply ghost variant', () => {
    fixture.componentInstance.variant.set('ghost');
    fixture.detectChanges();
    expect(button.className).toContain('hover:bg-accent');
  });

  it('should apply sm size', () => {
    fixture.componentInstance.size.set('sm');
    fixture.detectChanges();
    expect(button.className).toContain('h-9');
  });

  it('should apply lg size', () => {
    fixture.componentInstance.size.set('lg');
    fixture.detectChanges();
    expect(button.className).toContain('h-11');
  });

  it('should apply icon size', () => {
    fixture.componentInstance.size.set('icon');
    fixture.detectChanges();
    expect(button.className).toContain('w-10');
  });

  it('should set aria-disabled when disabled', () => {
    fixture.componentInstance.disabled.set(true);
    fixture.detectChanges();
    expect(button.getAttribute('aria-disabled')).toBe('true');
  });

  it('should set aria-disabled when loading', () => {
    fixture.componentInstance.loading.set(true);
    fixture.detectChanges();
    expect(button.getAttribute('aria-disabled')).toBe('true');
    expect(button.className).toContain('cursor-wait');
  });

  it('should set tabindex=-1 when disabled', () => {
    fixture.componentInstance.disabled.set(true);
    fixture.detectChanges();
    expect(button.getAttribute('tabindex')).toBe('-1');
  });
});
