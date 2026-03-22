import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { SnyCalendarComponent } from './calendar.component';

@Component({
  standalone: true,
  imports: [SnyCalendarComponent],
  template: `<sny-calendar [(value)]="selectedDate" />`,
})
class TestHostComponent {
  selectedDate = signal<Date | null>(null);
}

describe('SnyCalendarComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TestHostComponent] }).compileComponents();
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    host = fixture.nativeElement.querySelector('sny-calendar');
  });

  it('should render a grid', () => {
    const grid = host.querySelector('[role="grid"]');
    expect(grid).not.toBeNull();
  });

  it('should render day headers', () => {
    const headers = host.querySelectorAll('[role="grid"] > div:not(button)');
    expect(headers.length).toBe(7);
  });

  it('should render 42 day buttons', () => {
    const buttons = host.querySelectorAll('[role="grid"] button');
    expect(buttons.length).toBe(42);
  });

  it('should navigate months', () => {
    const prevBtn = host.querySelector('[aria-label="Previous month"]') as HTMLButtonElement;
    const nextBtn = host.querySelector('[aria-label="Next month"]') as HTMLButtonElement;
    expect(prevBtn).not.toBeNull();
    expect(nextBtn).not.toBeNull();
  });

  it('should select a date on click', () => {
    const buttons = host.querySelectorAll('[role="grid"] button:not([disabled])');
    const dayButton = Array.from(buttons).find((b) => b.textContent?.trim() === '15') as HTMLButtonElement;
    if (dayButton) {
      dayButton.click();
      fixture.detectChanges();
      expect(fixture.componentInstance.selectedDate()).not.toBeNull();
    }
  });
});

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, SnyCalendarComponent],
  template: `<sny-calendar [formControl]="ctrl" />`,
})
class ReactiveFormHost {
  ctrl = new FormControl<Date | null>(null);
}

describe('SnyCalendarComponent — Reactive Forms', () => {
  let fixture: ComponentFixture<ReactiveFormHost>;
  let host: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ReactiveFormHost] }).compileComponents();
    fixture = TestBed.createComponent(ReactiveFormHost);
    fixture.detectChanges();
    host = fixture.nativeElement.querySelector('sny-calendar');
  });

  it('should update view when FormControl value changes (writeValue)', () => {
    const date = new Date(2025, 5, 15);
    fixture.componentInstance.ctrl.setValue(date);
    fixture.detectChanges();
    const selected = host.querySelector('[role="grid"] button[aria-selected="true"]');
    expect(selected).not.toBeNull();
  });

  it('should update FormControl when user interacts (onChange)', () => {
    const buttons = host.querySelectorAll('[role="grid"] button:not([disabled])');
    const dayButton = Array.from(buttons).find((b) => b.textContent?.trim() === '15') as HTMLButtonElement;
    if (dayButton) {
      dayButton.click();
      fixture.detectChanges();
      expect(fixture.componentInstance.ctrl.value).not.toBeNull();
      expect(fixture.componentInstance.ctrl.value!.getDate()).toBe(15);
    }
  });

  it('should disable via FormControl.disable() (setDisabledState)', () => {
    fixture.componentInstance.ctrl.disable();
    fixture.detectChanges();
    const buttons = host.querySelectorAll('[role="grid"] button');
    const allDisabled = Array.from(buttons).every((b) => (b as HTMLButtonElement).disabled || b.getAttribute('aria-disabled') === 'true');
    expect(allDisabled).toBe(true);
  });
});
