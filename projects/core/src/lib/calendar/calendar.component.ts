import {
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  input,
  linkedSignal,
  model,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { cn } from '../core/utils/cn';
import type { CalendarDay, CalendarMode, DateRange } from './calendar.types';

@Component({
  selector: 'sny-calendar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClass()',
    '(keydown)': 'onKeydown($event)',
    'role': 'application',
    'aria-label': 'Calendar',
  },
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SnyCalendarComponent), multi: true },
  ],
  template: `
    @if (showNavigation()) {
      <div class="flex items-center justify-between mb-3">
        <button
          type="button"
          class="inline-flex items-center justify-center rounded-md h-8 w-8 hover:bg-accent hover:text-accent-foreground transition-colors"
          (click)="prevMonth()"
          aria-label="Previous month"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <span class="text-sm font-semibold tracking-tight">{{ monthYearLabel() }}</span>
        <button
          type="button"
          class="inline-flex items-center justify-center rounded-md h-8 w-8 hover:bg-accent hover:text-accent-foreground transition-colors"
          (click)="nextMonth()"
          aria-label="Next month"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </button>
      </div>
    }

    <div role="grid" class="grid grid-cols-7 gap-1">
      @for (dayName of weekDays; track dayName) {
        <div class="text-center text-xs text-muted-foreground font-medium h-9 flex items-center justify-center" role="columnheader">{{ dayName }}</div>
      }
      @for (day of days(); track day.date.getTime()) {
        <button
          type="button"
          [class]="dayClass(day)"
          [disabled]="day.isDisabled"
          [attr.aria-selected]="day.isSelected || day.isRangeStart || day.isRangeEnd || null"
          [attr.aria-current]="day.isToday ? 'date' : null"
          [attr.aria-disabled]="day.isDisabled || null"
          [attr.aria-label]="day.date.toLocaleDateString(locale(), { month: 'long', day: 'numeric', year: 'numeric' })"
          role="gridcell"
          (click)="onDayClick(day.date)"
          (mouseenter)="onDayHover(day.date)"
          (mouseleave)="onDayHover(null)"
        >
          {{ day.day }}
        </button>
      }
    </div>
  `,
})
export class SnyCalendarComponent implements ControlValueAccessor {
  // Existing inputs (backwards compatible)
  readonly value = model<Date | null>(null);
  readonly min = input<Date | undefined>(undefined);
  readonly max = input<Date | undefined>(undefined);
  readonly locale = input('en-US');
  readonly class = input<string>('');

  // Range mode inputs
  readonly mode = input<CalendarMode>('single');
  readonly rangeValue = model<DateRange | null>(null);
  readonly showNavigation = input(true);
  readonly initialViewDate = input<Date | undefined>(undefined);
  readonly borderless = input(false);

  readonly hostClass = computed(() =>
    this.borderless()
      ? 'inline-block p-3 bg-background'
      : 'inline-block p-4 rounded-md border border-border bg-background'
  );

  // Internal state
  private readonly _disabledByCva = signal(false);
  readonly hoveredDate = signal<Date | null>(null);
  readonly viewDate = linkedSignal(() => this.initialViewDate() ?? new Date());
  readonly weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  // CVA
  private _onChange: (value: unknown) => void = () => {};
  protected onTouched: () => void = () => {};

  writeValue(val: unknown): void {
    if (this.mode() === 'range') {
      this.rangeValue.set((val as DateRange) ?? null);
      const range = val as DateRange | null;
      if (range?.start) {
        this.viewDate.set(new Date(range.start.getFullYear(), range.start.getMonth(), 1));
      }
    } else {
      this.value.set((val as Date) ?? null);
      if (val) {
        const d = val as Date;
        this.viewDate.set(new Date(d.getFullYear(), d.getMonth(), 1));
      }
    }
  }

  registerOnChange(fn: (value: unknown) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._disabledByCva.set(isDisabled);
  }

  // Computed
  readonly monthYearLabel = computed(() => {
    const d = this.viewDate();
    return d.toLocaleDateString(this.locale(), { month: 'long', year: 'numeric' });
  });

  readonly days = computed<CalendarDay[]>(() => {
    const view = this.viewDate();
    const year = view.getFullYear();
    const month = view.getMonth();
    const today = new Date();
    const selected = this.value();
    const rangeVal = this.mode() === 'range' ? this.rangeValue() : null;
    const hovered = this.hoveredDate();
    const minDate = this.min();
    const maxDate = this.max();

    const firstDay = new Date(year, month, 1);
    const startDay = firstDay.getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const days: CalendarDay[] = [];

    for (let i = startDay - 1; i >= 0; i--) {
      const date = new Date(year, month - 1, daysInPrevMonth - i);
      days.push(this.createDay(date, false, today, selected, rangeVal, hovered, minDate, maxDate));
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(year, month, d);
      days.push(this.createDay(date, true, today, selected, rangeVal, hovered, minDate, maxDate));
    }

    const remaining = 42 - days.length;
    for (let d = 1; d <= remaining; d++) {
      const date = new Date(year, month + 1, d);
      days.push(this.createDay(date, false, today, selected, rangeVal, hovered, minDate, maxDate));
    }

    return days;
  });

  // Navigation
  prevMonth(): void {
    this.viewDate.set(new Date(
      this.viewDate().getFullYear(),
      this.viewDate().getMonth() - 1,
      1,
    ));
  }

  nextMonth(): void {
    this.viewDate.set(new Date(
      this.viewDate().getFullYear(),
      this.viewDate().getMonth() + 1,
      1,
    ));
  }

  // Click handler
  onDayClick(date: Date): void {
    if (this.mode() === 'single') {
      this.value.set(date);
      this._onChange(date);
      this.onTouched();
      return;
    }

    // Range mode
    const current = this.rangeValue();
    if (!current?.start || (current.start && current.end)) {
      this.rangeValue.set({ start: date, end: null });
    } else {
      const start = current.start;
      if (date < start) {
        this.rangeValue.set({ start: date, end: start });
      } else if (this.isSameDay(date, start)) {
        this.rangeValue.set({ start: date, end: date });
      } else {
        this.rangeValue.set({ start, end: date });
      }
    }
    this._onChange(this.rangeValue());
    this.onTouched();
  }

  // Hover handler
  onDayHover(date: Date | null): void {
    if (this.mode() === 'range') {
      this.hoveredDate.set(date);
    }
  }

  // Keyboard
  onKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        this.navigateDays(-1);
        break;
      case 'ArrowRight':
        event.preventDefault();
        this.navigateDays(1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.navigateDays(-7);
        break;
      case 'ArrowDown':
        event.preventDefault();
        this.navigateDays(7);
        break;
    }
  }

  // Styling
  dayClass(day: CalendarDay): string {
    const isEndpoint = day.isRangeStart || day.isRangeEnd;
    return cn(
      'inline-flex items-center justify-center text-sm h-9 w-9 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
      // Shape
      day.isRangeStart && !day.isRangeEnd ? 'rounded-l-md rounded-r-none' :
      day.isRangeEnd && !day.isRangeStart ? 'rounded-r-md rounded-l-none' :
      day.isInRange || day.isRangePreview ? 'rounded-none' :
      'rounded-md',
      // Base text color
      !day.isCurrentMonth && 'text-muted-foreground/40',
      day.isCurrentMonth && !day.isSelected && !isEndpoint && 'text-foreground',
      // Today indicator
      day.isToday && !day.isSelected && !isEndpoint && 'bg-accent text-accent-foreground font-semibold',
      // Single selected
      day.isSelected && this.mode() === 'single' && 'bg-primary text-primary-foreground font-semibold shadow-sm',
      // Range endpoints
      isEndpoint && 'bg-primary text-primary-foreground font-semibold shadow-sm',
      // Range band
      day.isInRange && 'bg-primary/10 text-foreground',
      day.isRangePreview && 'bg-primary/5 text-foreground',
      // States
      day.isDisabled && 'opacity-40 cursor-not-allowed pointer-events-none',
      !day.isDisabled && !day.isSelected && !isEndpoint && 'hover:bg-accent hover:text-accent-foreground cursor-pointer',
    );
  }

  // Private helpers
  private navigateDays(offset: number): void {
    const current = this.value() ?? new Date();
    const next = new Date(current);
    next.setDate(next.getDate() + offset);
    this.value.set(next);
    this._onChange(next);
    this.viewDate.set(new Date(next.getFullYear(), next.getMonth(), 1));
  }

  private createDay(
    date: Date,
    isCurrentMonth: boolean,
    today: Date,
    selected: Date | null,
    rangeVal: DateRange | null,
    hoveredDate: Date | null,
    minDate: Date | undefined,
    maxDate: Date | undefined,
  ): CalendarDay {
    const isToday = this.isSameDay(date, today);
    const isSelected = selected ? this.isSameDay(date, selected) : false;
    const isDisabled =
      this._disabledByCva() ||
      (minDate ? date < minDate : false) ||
      (maxDate ? date > maxDate : false);

    let isRangeStart = false;
    let isRangeEnd = false;
    let isInRange = false;
    let isRangePreview = false;

    if (rangeVal) {
      const { start, end } = rangeVal;
      if (start) isRangeStart = this.isSameDay(date, start);
      if (end) isRangeEnd = this.isSameDay(date, end);
      if (start && end) {
        isInRange = date > start && date < end && !isRangeStart && !isRangeEnd;
      }
      // Preview: start set, no end yet, user hovering
      if (start && !end && hoveredDate && !this.isSameDay(hoveredDate, start)) {
        const previewStart = hoveredDate > start ? start : hoveredDate;
        const previewEnd = hoveredDate > start ? hoveredDate : start;
        if (date > previewStart && date < previewEnd) {
          isRangePreview = true;
        }
        if (this.isSameDay(date, hoveredDate) && !isRangeStart) {
          isRangePreview = true;
        }
      }
    }

    return {
      date, day: date.getDate(), isCurrentMonth, isToday, isSelected, isDisabled,
      isRangeStart, isRangeEnd, isInRange, isRangePreview,
    };
  }

  private isSameDay(a: Date, b: Date): boolean {
    return (
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
    );
  }
}
