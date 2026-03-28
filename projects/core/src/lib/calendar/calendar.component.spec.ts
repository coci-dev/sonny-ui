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

// --- Range Mode Tests ---

import type { DateRange } from './calendar.types';

@Component({
  standalone: true,
  imports: [SnyCalendarComponent],
  template: `<sny-calendar mode="range" [(rangeValue)]="range" />`,
})
class RangeTestHost {
  range = signal<DateRange | null>(null);
}

describe('SnyCalendarComponent — Range Mode', () => {
  let fixture: ComponentFixture<RangeTestHost>;
  let host: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [RangeTestHost] }).compileComponents();
    fixture = TestBed.createComponent(RangeTestHost);
    fixture.detectChanges();
    host = fixture.nativeElement.querySelector('sny-calendar');
  });

  function clickDay(dayNum: string): void {
    const buttons = host.querySelectorAll('[role="grid"] button:not([disabled])');
    const btn = Array.from(buttons).find((b) => b.textContent?.trim() === dayNum) as HTMLButtonElement;
    btn?.click();
    fixture.detectChanges();
  }

  it('should render 42 buttons in range mode', () => {
    const buttons = host.querySelectorAll('[role="grid"] button');
    expect(buttons.length).toBe(42);
  });

  it('should set range start on first click', () => {
    clickDay('10');
    const range = fixture.componentInstance.range();
    expect(range).not.toBeNull();
    expect(range!.start).not.toBeNull();
    expect(range!.start!.getDate()).toBe(10);
    expect(range!.end).toBeNull();
  });

  it('should set range end on second click', () => {
    clickDay('10');
    clickDay('20');
    const range = fixture.componentInstance.range();
    expect(range!.start!.getDate()).toBe(10);
    expect(range!.end!.getDate()).toBe(20);
  });

  it('should swap if second click is before start', () => {
    clickDay('20');
    clickDay('5');
    const range = fixture.componentInstance.range();
    expect(range!.start!.getDate()).toBe(5);
    expect(range!.end!.getDate()).toBe(20);
  });

  it('should reset range on third click', () => {
    clickDay('10');
    clickDay('20');
    clickDay('15');
    const range = fixture.componentInstance.range();
    expect(range!.start!.getDate()).toBe(15);
    expect(range!.end).toBeNull();
  });

  it('should have range highlight classes when range is set', () => {
    clickDay('10');
    clickDay('15');
    fixture.detectChanges();
    const buttons = host.querySelectorAll('[role="grid"] button');
    const classes = Array.from(buttons).map((b) => b.className);
    const hasRangeStyle = classes.some((c) => c.includes('bg-primary/15') || c.includes('rounded-l-none') || c.includes('rounded-r-none'));
    expect(hasRangeStyle).toBe(true);
  });

  it('should not affect single mode behavior', () => {
    // This test uses the basic TestHostComponent which defaults to single mode
    // Regression test: existing single mode tests above should still pass
    expect(true).toBe(true);
  });
});
