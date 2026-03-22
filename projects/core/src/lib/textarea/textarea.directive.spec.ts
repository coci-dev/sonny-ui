import { Component, signal } from '@angular/core';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { SnyTextareaDirective } from './textarea.directive';
import type { TextareaVariant, TextareaSize, TextareaResize } from './textarea.variants';

@Component({
  standalone: true,
  imports: [SnyTextareaDirective],
  template: `
    <textarea
      snyTextarea
      [variant]="variant()"
      [textareaSize]="textareaSize()"
      [resize]="resize()"
      [autoResize]="autoResize()"
    ></textarea>
  `,
})
class TestHostComponent {
  variant = signal<TextareaVariant>('default');
  textareaSize = signal<TextareaSize>('md');
  resize = signal<TextareaResize>('vertical');
  autoResize = signal(false);
}

describe('SnyTextareaDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let el: HTMLTextAreaElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    el = fixture.nativeElement.querySelector('textarea');
  });

  it('should apply default variant classes', () => {
    expect(el.className).toContain('border-input');
    expect(el.className).toContain('rounded-md');
  });

  it('should apply error variant classes', () => {
    fixture.componentInstance.variant.set('error');
    fixture.detectChanges();
    expect(el.className).toContain('border-destructive');
  });

  it('should set aria-invalid for error variant', () => {
    expect(el.getAttribute('aria-invalid')).toBeNull();
    fixture.componentInstance.variant.set('error');
    fixture.detectChanges();
    expect(el.getAttribute('aria-invalid')).toBe('true');
  });

  it('should apply small size', () => {
    fixture.componentInstance.textareaSize.set('sm');
    fixture.detectChanges();
    expect(el.className).toContain('text-xs');
  });

  it('should apply large size', () => {
    fixture.componentInstance.textareaSize.set('lg');
    fixture.detectChanges();
    expect(el.className).toContain('text-base');
  });

  it('should apply resize-none when resize is "none"', () => {
    fixture.componentInstance.resize.set('none');
    fixture.detectChanges();
    expect(el.className).toContain('resize-none');
  });

  it('should apply resize-y by default', () => {
    expect(el.className).toContain('resize-y');
  });

  it('should force resize-none when autoResize is true', () => {
    fixture.componentInstance.autoResize.set(true);
    fixture.detectChanges();
    expect(el.className).toContain('resize-none');
  });
});
