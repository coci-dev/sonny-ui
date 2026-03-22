import { Component, signal } from '@angular/core';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import {
  SnyFieldsetDirective,
  SnyFieldsetLegendDirective,
  SnyFieldsetContentDirective,
} from './fieldset.directives';
import type { FieldsetVariant } from './fieldset.variants';

@Component({
  standalone: true,
  imports: [SnyFieldsetDirective, SnyFieldsetLegendDirective, SnyFieldsetContentDirective],
  template: `
    <fieldset snyFieldset [variant]="variant()" [disabled]="disabled()">
      <legend snyFieldsetLegend>Personal Info</legend>
      <div snyFieldsetContent>
        <input type="text" />
      </div>
    </fieldset>
  `,
})
class TestHostComponent {
  variant = signal<FieldsetVariant>('default');
  disabled = signal(false);
}

describe('SnyFieldsetDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let fieldset: HTMLFieldSetElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    fieldset = fixture.nativeElement.querySelector('fieldset');
  });

  it('should apply default classes', () => {
    expect(fieldset.className).toContain('space-y-4');
  });

  it('should apply bordered variant', () => {
    fixture.componentInstance.variant.set('bordered');
    fixture.detectChanges();
    expect(fieldset.className).toContain('border');
    expect(fieldset.className).toContain('rounded-lg');
  });

  it('should set disabled attribute', () => {
    expect(fieldset.disabled).toBe(false);
    fixture.componentInstance.disabled.set(true);
    fixture.detectChanges();
    expect(fieldset.disabled).toBe(true);
  });

  it('should apply legend classes', () => {
    const legend = fixture.nativeElement.querySelector('legend');
    expect(legend.className).toContain('font-medium');
  });

  it('should apply content classes', () => {
    const content = fixture.nativeElement.querySelector('[snyFieldsetContent]');
    expect(content.className).toContain('space-y-2');
  });

  it('should set aria-disabled when disabled', () => {
    expect(fieldset.getAttribute('aria-disabled')).toBeNull();
    fixture.componentInstance.disabled.set(true);
    fixture.detectChanges();
    expect(fieldset.getAttribute('aria-disabled')).toBe('true');
  });
});
