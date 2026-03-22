import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
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

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, SnyToggleDirective],
  template: `<button snyToggle [formControl]="ctrl">Toggle</button>`,
})
class ReactiveFormHost {
  ctrl = new FormControl(false);
}

describe('SnyToggleDirective — Reactive Forms', () => {
  let fixture: ComponentFixture<ReactiveFormHost>;
  let button: HTMLButtonElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormHost],
    }).compileComponents();
    fixture = TestBed.createComponent(ReactiveFormHost);
    fixture.detectChanges();
    button = fixture.nativeElement.querySelector('button');
  });

  it('should update view when FormControl value changes (writeValue)', () => {
    fixture.componentInstance.ctrl.setValue(true);
    fixture.detectChanges();
    expect(button.getAttribute('aria-pressed')).toBe('true');
  });

  it('should update FormControl when user interacts (onChange)', () => {
    button.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.ctrl.value).toBe(true);
  });

  it('should disable via FormControl.disable() (setDisabledState)', () => {
    fixture.componentInstance.ctrl.disable();
    fixture.detectChanges();
    expect(button.disabled).toBe(true);
  });

  it('should mark as touched on blur (onTouched)', () => {
    expect(fixture.componentInstance.ctrl.touched).toBe(false);
    button.dispatchEvent(new Event('blur'));
    expect(fixture.componentInstance.ctrl.touched).toBe(true);
  });
});
