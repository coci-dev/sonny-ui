import { Component, signal } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { SnyInputDirective } from './input.directive';
import { SnyLabelDirective } from './label.directive';
import type { InputVariant, InputSize } from './input.variants';

@Component({
  standalone: true,
  imports: [SnyInputDirective, SnyLabelDirective],
  template: `
    <label snyLabel [variant]="variant()">Name</label>
    <input snyInput [variant]="variant()" [inputSize]="inputSize()" [ariaDescribedBy]="describedBy()" />
  `,
})
class TestHostComponent {
  variant = signal<InputVariant>('default');
  inputSize = signal<InputSize>('md');
  describedBy = signal('');
}

describe('SnyInputDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let input: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    input = fixture.nativeElement.querySelector('input');
  });

  it('should apply default input classes', () => {
    expect(input.className).toContain('border-input');
    expect(input.className).toContain('h-10');
  });

  it('should apply error variant', () => {
    fixture.componentInstance.variant.set('error');
    fixture.detectChanges();
    expect(input.className).toContain('border-destructive');
  });

  it('should set aria-invalid on error', () => {
    fixture.componentInstance.variant.set('error');
    fixture.detectChanges();
    expect(input.getAttribute('aria-invalid')).toBe('true');
  });

  it('should not set aria-invalid on default', () => {
    expect(input.getAttribute('aria-invalid')).toBeNull();
  });

  it('should apply success variant', () => {
    fixture.componentInstance.variant.set('success');
    fixture.detectChanges();
    expect(input.className).toContain('border-green-500');
  });

  it('should apply sm size', () => {
    fixture.componentInstance.inputSize.set('sm');
    fixture.detectChanges();
    expect(input.className).toContain('h-9');
  });

  it('should apply lg size', () => {
    fixture.componentInstance.inputSize.set('lg');
    fixture.detectChanges();
    expect(input.className).toContain('h-11');
  });

  it('should set aria-describedby', () => {
    fixture.componentInstance.describedBy.set('help-text');
    fixture.detectChanges();
    expect(input.getAttribute('aria-describedby')).toBe('help-text');
  });
});

describe('SnyLabelDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let label: HTMLLabelElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    label = fixture.nativeElement.querySelector('label');
  });

  it('should apply label classes', () => {
    expect(label.className).toContain('text-sm');
    expect(label.className).toContain('font-medium');
  });

  it('should apply error variant to label', () => {
    fixture.componentInstance.variant.set('error');
    fixture.detectChanges();
    expect(label.className).toContain('text-destructive');
  });
});
