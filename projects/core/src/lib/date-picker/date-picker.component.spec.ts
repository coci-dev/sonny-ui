import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { SnyDatePickerComponent } from './date-picker.component';

@Component({
  standalone: true,
  imports: [SnyDatePickerComponent],
  template: `
    <sny-date-picker
      [(value)]="selectedDate"
      [placeholder]="placeholder()"
      [clearable]="clearable()"
      [disabled]="disabled()"
    />
  `,
})
class TestHostComponent {
  selectedDate = signal<Date | null>(null);
  placeholder = signal('Pick a date...');
  clearable = signal(true);
  disabled = signal(false);
}

describe('SnyDatePickerComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TestHostComponent] }).compileComponents();
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    el = fixture.nativeElement;
  });

  it('should render trigger with placeholder', () => {
    const trigger = el.querySelector('button');
    expect(trigger?.textContent).toContain('Pick a date...');
  });

  it('should open dropdown on click', () => {
    const trigger = el.querySelector('button') as HTMLButtonElement;
    trigger.click();
    fixture.detectChanges();
    const calendar = el.querySelector('sny-calendar');
    expect(calendar).not.toBeNull();
  });

  it('should close dropdown when date is selected', () => {
    const trigger = el.querySelector('button') as HTMLButtonElement;
    trigger.click();
    fixture.detectChanges();

    const dayBtn = el.querySelectorAll('sny-calendar [role="grid"] button:not([disabled])');
    const btn = Array.from(dayBtn).find((b) => b.textContent?.trim() === '15') as HTMLButtonElement;
    btn?.click();
    fixture.detectChanges();

    const calendar = el.querySelector('sny-calendar');
    expect(calendar).toBeNull();
    expect(fixture.componentInstance.selectedDate()).not.toBeNull();
  });

  it('should show clear button when value is set', () => {
    fixture.componentInstance.selectedDate.set(new Date(2026, 2, 15));
    fixture.detectChanges();
    const clearBtn = el.querySelector('[aria-label="Clear date"]');
    expect(clearBtn).not.toBeNull();
  });

  it('should clear value on clear button click', () => {
    fixture.componentInstance.selectedDate.set(new Date(2026, 2, 15));
    fixture.detectChanges();
    const clearBtn = el.querySelector('[aria-label="Clear date"]') as HTMLButtonElement;
    clearBtn.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.selectedDate()).toBeNull();
  });

  it('should not open when disabled', () => {
    fixture.componentInstance.disabled.set(true);
    fixture.detectChanges();
    const trigger = el.querySelector('button') as HTMLButtonElement;
    expect(trigger.disabled).toBe(true);
  });

  it('should display formatted date', () => {
    fixture.componentInstance.selectedDate.set(new Date(2026, 2, 15));
    fixture.detectChanges();
    const trigger = el.querySelector('button');
    expect(trigger?.textContent).toContain('Mar');
    expect(trigger?.textContent).toContain('15');
    expect(trigger?.textContent).toContain('2026');
  });
});

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, SnyDatePickerComponent],
  template: `<sny-date-picker [formControl]="ctrl" />`,
})
class ReactiveFormHost {
  ctrl = new FormControl<Date | null>(null);
}

describe('SnyDatePickerComponent — Reactive Forms', () => {
  let fixture: ComponentFixture<ReactiveFormHost>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ReactiveFormHost] }).compileComponents();
    fixture = TestBed.createComponent(ReactiveFormHost);
    fixture.detectChanges();
    el = fixture.nativeElement;
  });

  it('should update display when FormControl value changes', () => {
    fixture.componentInstance.ctrl.setValue(new Date(2026, 5, 20));
    fixture.detectChanges();
    const trigger = el.querySelector('button');
    expect(trigger?.textContent).toContain('Jun');
    expect(trigger?.textContent).toContain('20');
  });

  it('should disable via FormControl.disable()', () => {
    fixture.componentInstance.ctrl.disable();
    fixture.detectChanges();
    const trigger = el.querySelector('button') as HTMLButtonElement;
    expect(trigger.disabled).toBe(true);
  });
});
