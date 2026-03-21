import { Component, signal } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { SnyToggleDirective } from './toggle.directive';
import type { ToggleVariant, ToggleSize } from './toggle.variants';

@Component({
  standalone: true,
  imports: [SnyToggleDirective],
  template: `<button snyToggle [variant]="variant()" [size]="size()" [(pressed)]="pressed">Toggle</button>`,
})
class TestHostComponent {
  variant = signal<ToggleVariant>('default');
  size = signal<ToggleSize>('md');
  pressed = signal(false);
}

describe('SnyToggleDirective', () => {
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

  it('should apply default classes', () => {
    expect(button.className).toContain('inline-flex');
    expect(button.className).toContain('rounded-sm');
  });

  it('should be unpressed by default', () => {
    expect(button.getAttribute('aria-pressed')).toBe('false');
  });

  it('should toggle pressed on click', () => {
    button.click();
    fixture.detectChanges();
    expect(button.getAttribute('aria-pressed')).toBe('true');
    expect(button.className).toContain('bg-accent');
  });

  it('should apply outline variant', () => {
    fixture.componentInstance.variant.set('outline');
    fixture.detectChanges();
    expect(button.className).toContain('border');
  });
});
