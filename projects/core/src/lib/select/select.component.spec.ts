import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { SnySelectComponent, type SelectOption } from './select.component';

@Component({
  standalone: true,
  imports: [SnySelectComponent],
  template: `<sny-select [options]="options" [(value)]="value" [placeholder]="placeholder()" />`,
})
class TestHostComponent {
  options: SelectOption[] = [
    { value: 'a', label: 'Option A' },
    { value: 'b', label: 'Option B' },
    { value: 'c', label: 'Option C' },
  ];
  value = signal('');
  placeholder = signal('Pick one...');
}

describe('SnySelectComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let trigger: HTMLButtonElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    trigger = fixture.nativeElement.querySelector('button');
  });

  it('should show placeholder when no value', () => {
    expect(trigger.textContent).toContain('Pick one...');
  });

  it('should have combobox role', () => {
    expect(trigger.getAttribute('role')).toBe('combobox');
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
  });

  it('should open dropdown on click', () => {
    trigger.click();
    fixture.detectChanges();
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
    const options = fixture.nativeElement.querySelectorAll('[role="option"]');
    expect(options.length).toBe(3);
  });

  it('should show selected label', () => {
    fixture.componentInstance.value.set('b');
    fixture.detectChanges();
    expect(trigger.textContent).toContain('Option B');
  });
});

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, SnySelectComponent],
  template: `<sny-select [options]="options" [formControl]="ctrl" />`,
})
class ReactiveFormHost {
  options: SelectOption[] = [
    { value: 'a', label: 'Option A' },
    { value: 'b', label: 'Option B' },
    { value: 'c', label: 'Option C' },
  ];
  ctrl = new FormControl('');
}

describe('SnySelectComponent — Reactive Forms', () => {
  let fixture: ComponentFixture<ReactiveFormHost>;
  let trigger: HTMLButtonElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormHost],
    }).compileComponents();
    fixture = TestBed.createComponent(ReactiveFormHost);
    fixture.detectChanges();
    trigger = fixture.nativeElement.querySelector('button');
  });

  it('should update view when FormControl value changes (writeValue)', () => {
    fixture.componentInstance.ctrl.setValue('b');
    fixture.detectChanges();
    expect(trigger.textContent).toContain('Option B');
  });

  it('should update FormControl when user interacts (onChange)', () => {
    trigger.click();
    fixture.detectChanges();
    const option = fixture.nativeElement.querySelector('[role="option"]') as HTMLElement;
    option.dispatchEvent(new Event('mousedown'));
    fixture.detectChanges();
    expect(fixture.componentInstance.ctrl.value).toBe('a');
  });

  it('should disable via FormControl.disable() (setDisabledState)', () => {
    fixture.componentInstance.ctrl.disable();
    fixture.detectChanges();
    expect(trigger.disabled).toBe(true);
  });

  it('should mark as touched on blur (onTouched)', () => {
    expect(fixture.componentInstance.ctrl.touched).toBe(false);
    trigger.dispatchEvent(new Event('blur'));
    expect(fixture.componentInstance.ctrl.touched).toBe(true);
  });
});
