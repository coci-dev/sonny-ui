import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { SnyDateRangePickerComponent } from './date-range-picker.component';
import type { DateRange, DatePickerPreset } from '../calendar/calendar.types';

@Component({
  standalone: true,
  imports: [SnyDateRangePickerComponent],
  template: `
    <sny-date-range-picker
      [(value)]="range"
      [placeholder]="placeholder()"
      [dualCalendar]="dualCalendar()"
      [presets]="presets()"
      [clearable]="clearable()"
    />
  `,
})
class TestHostComponent {
  range = signal<DateRange | null>(null);
  placeholder = signal('Pick a date range...');
  dualCalendar = signal(false);
  clearable = signal(true);
  presets = signal<DatePickerPreset[]>([]);
}

describe('SnyDateRangePickerComponent', () => {
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
    expect(trigger?.textContent).toContain('Pick a date range...');
  });

  it('should open dropdown with single calendar by default', () => {
    const trigger = el.querySelector('button') as HTMLButtonElement;
    trigger.click();
    fixture.detectChanges();
    const calendars = el.querySelectorAll('sny-calendar');
    expect(calendars.length).toBe(1);
  });

  it('should render dual calendars when dualCalendar is true', () => {
    fixture.componentInstance.dualCalendar.set(true);
    fixture.detectChanges();
    const trigger = el.querySelector('button') as HTMLButtonElement;
    trigger.click();
    fixture.detectChanges();
    const calendars = el.querySelectorAll('sny-calendar');
    expect(calendars.length).toBe(2);
  });

  it('should display formatted range', () => {
    fixture.componentInstance.range.set({
      start: new Date(2026, 2, 10),
      end: new Date(2026, 2, 20),
    });
    fixture.detectChanges();
    const trigger = el.querySelector('button');
    expect(trigger?.textContent).toContain('Mar');
    expect(trigger?.textContent).toContain('10');
    expect(trigger?.textContent).toContain('20');
  });

  it('should render presets sidebar when presets provided', () => {
    fixture.componentInstance.presets.set([
      { label: 'Last 7 days', range: { start: new Date(), end: new Date() } },
      { label: 'Last 30 days', range: { start: new Date(), end: new Date() } },
    ]);
    fixture.detectChanges();
    const trigger = el.querySelector('button') as HTMLButtonElement;
    trigger.click();
    fixture.detectChanges();
    const presetBtns = el.querySelectorAll('[class*="hover:bg-accent"]');
    const presetLabels = Array.from(presetBtns).map((b) => b.textContent?.trim());
    expect(presetLabels).toContain('Last 7 days');
    expect(presetLabels).toContain('Last 30 days');
  });

  it('should clear value on clear button click', () => {
    fixture.componentInstance.range.set({
      start: new Date(2026, 2, 10),
      end: new Date(2026, 2, 20),
    });
    fixture.detectChanges();
    const clearBtn = el.querySelector('[aria-label="Clear date range"]') as HTMLButtonElement;
    clearBtn.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.range()).toBeNull();
  });

  it('should show navigation arrows in dual mode', () => {
    fixture.componentInstance.dualCalendar.set(true);
    fixture.detectChanges();
    const trigger = el.querySelector('button') as HTMLButtonElement;
    trigger.click();
    fixture.detectChanges();
    const prevBtn = el.querySelector('[aria-label="Previous month"]');
    const nextBtn = el.querySelector('[aria-label="Next month"]');
    expect(prevBtn).not.toBeNull();
    expect(nextBtn).not.toBeNull();
  });
});

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, SnyDateRangePickerComponent],
  template: `<sny-date-range-picker [formControl]="ctrl" />`,
})
class ReactiveFormHost {
  ctrl = new FormControl<DateRange | null>(null);
}

describe('SnyDateRangePickerComponent — Reactive Forms', () => {
  let fixture: ComponentFixture<ReactiveFormHost>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ReactiveFormHost] }).compileComponents();
    fixture = TestBed.createComponent(ReactiveFormHost);
    fixture.detectChanges();
    el = fixture.nativeElement;
  });

  it('should update display when FormControl value changes', () => {
    fixture.componentInstance.ctrl.setValue({
      start: new Date(2026, 5, 10),
      end: new Date(2026, 5, 20),
    });
    fixture.detectChanges();
    const trigger = el.querySelector('button');
    expect(trigger?.textContent).toContain('Jun');
    expect(trigger?.textContent).toContain('10');
  });

  it('should disable via FormControl.disable()', () => {
    fixture.componentInstance.ctrl.disable();
    fixture.detectChanges();
    const trigger = el.querySelector('button') as HTMLButtonElement;
    expect(trigger.disabled).toBe(true);
  });
});
