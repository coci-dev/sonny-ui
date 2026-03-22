import { Component, signal } from '@angular/core';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { SnyValidatorDirective, SnyValidatorHintDirective } from './validator.directives';

@Component({
  standalone: true,
  imports: [SnyValidatorDirective, SnyValidatorHintDirective],
  template: `
    <div snyValidator>
      <div snyValidatorHint when="required" variant="error">Required</div>
      <div snyValidatorHint when="minlength" variant="error">Too short</div>
      <div snyValidatorHint variant="success">Looks good!</div>
    </div>
  `,
})
class TestHostComponent {}

describe('SnyValidatorDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TestHostComponent] }).compileComponents();
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should render validator container', () => {
    const el = fixture.nativeElement.querySelector('[snyValidator]');
    expect(el).toBeTruthy();
  });

  it('should render hints with alert role', () => {
    const hints = fixture.nativeElement.querySelectorAll('[snyValidatorHint]');
    expect(hints.length).toBe(3);
    hints.forEach((h: HTMLElement) => expect(h.getAttribute('role')).toBe('alert'));
  });

  it('should apply error variant to error hints', () => {
    const hints = fixture.nativeElement.querySelectorAll('[snyValidatorHint]');
    expect(hints[0].className).toContain('text-destructive');
  });

  it('should apply success variant', () => {
    const hints = fixture.nativeElement.querySelectorAll('[snyValidatorHint]');
    expect(hints[2].className).toContain('text-green-600');
  });
});
