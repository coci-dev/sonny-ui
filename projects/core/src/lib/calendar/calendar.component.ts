import { ChangeDetectionStrategy, Component, computed, effect, forwardRef, input, model, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { cn } from '../core/utils/cn';

interface CalendarDay {
  date: Date;
  day: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isDisabled: boolean;
}

@Component({
  selector: 'sny-calendar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': '"inline-block p-3 rounded-md border bg-background"',
    '(keydown)': 'onKeydown($event)',
  },
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SnyCalendarComponent), multi: true },
  ],
  template: `
    <div class="flex items-center justify-between mb-4">
      <button
        class="inline-flex items-center justify-center rounded-md text-sm h-7 w-7 hover:bg-accent"
        (click)="prevMonth()"
        aria-label="Previous month"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg>
      </button>
      <span class="text-sm font-medium">{{ monthYearLabel() }}</span>
      <button
        class="inline-flex items-center justify-center rounded-md text-sm h-7 w-7 hover:bg-accent"
        (click)="nextMonth()"
        aria-label="Next month"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
      </button>
    </div>

    <div role="grid" aria-label="Calendar" class="grid grid-cols-7 gap-0">
      @for (dayName of weekDays; track dayName) {
        <div class="text-center text-xs text-muted-foreground font-medium py-1">{{ dayName }}</div>
      }
      @for (day of days(); track day.date.getTime()) {
        <button
          [class]="dayClass(day)"
          [disabled]="day.isDisabled"
          [attr.aria-selected]="day.isSelected || null"
          [attr.aria-current]="day.isToday ? 'date' : null"
          [attr.aria-disabled]="day.isDisabled || null"
          (click)="selectDate(day.date)"
        >
          {{ day.day }}
        </button>
      }
    </div>
  `,
})
export class SnyCalendarComponent implements ControlValueAccessor {
  readonly value = model<Date | null>(null);
  readonly min = input<Date | undefined>(undefined);
  readonly max = input<Date | undefined>(undefined);
  readonly locale = input('en-US');
  readonly class = input<string>('');

  private readonly _disabledByCva = signal(false);

  readonly viewDate = signal(new Date());
  readonly weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  private _onChange: (value: Date | null) => void = () => {};
  protected onTouched: () => void = () => {};
  private _writing = false;

  constructor() {
    effect(() => {
      const val = this.value();
      if (this._writing) {
        this._writing = false;
        return;
      }
      this._onChange(val);
    });
  }

  writeValue(val: Date | null): void {
    this._writing = true;
    this.value.set(val ?? null);
    if (val) {
      this.viewDate.set(new Date(val.getFullYear(), val.getMonth(), 1));
    }
  }

  registerOnChange(fn: (value: Date | null) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._disabledByCva.set(isDisabled);
  }

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
    const minDate = this.min();
    const maxDate = this.max();

    const firstDay = new Date(year, month, 1);
    const startDay = firstDay.getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const days: CalendarDay[] = [];

    // Previous month
    for (let i = startDay - 1; i >= 0; i--) {
      const date = new Date(year, month - 1, daysInPrevMonth - i);
      days.push(this.createDay(date, false, today, selected, minDate, maxDate));
    }

    // Current month
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(year, month, d);
      days.push(this.createDay(date, true, today, selected, minDate, maxDate));
    }

    // Next month fill
    const remaining = 42 - days.length;
    for (let d = 1; d <= remaining; d++) {
      const date = new Date(year, month + 1, d);
      days.push(this.createDay(date, false, today, selected, minDate, maxDate));
    }

    return days;
  });

  prevMonth(): void {
    this.viewDate.update((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  }

  nextMonth(): void {
    this.viewDate.update((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1));
  }

  selectDate(date: Date): void {
    this.value.set(date);
    this.onTouched();
  }

  onKeydown(event: KeyboardEvent): void {
    // Simplified keyboard navigation
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

  dayClass(day: CalendarDay): string {
    return cn(
      'inline-flex items-center justify-center rounded-md text-sm h-8 w-8 transition-colors',
      day.isCurrentMonth ? 'text-foreground' : 'text-muted-foreground/50',
      day.isToday && !day.isSelected && 'bg-accent font-bold',
      day.isSelected && 'bg-primary text-primary-foreground',
      day.isDisabled && 'opacity-50 cursor-not-allowed',
      !day.isDisabled && !day.isSelected && 'hover:bg-accent cursor-pointer'
    );
  }

  private navigateDays(offset: number): void {
    const current = this.value() ?? new Date();
    const next = new Date(current);
    next.setDate(next.getDate() + offset);
    this.value.set(next);
    this.viewDate.set(new Date(next.getFullYear(), next.getMonth(), 1));
  }

  private createDay(
    date: Date,
    isCurrentMonth: boolean,
    today: Date,
    selected: Date | null,
    minDate: Date | undefined,
    maxDate: Date | undefined
  ): CalendarDay {
    const isToday = this.isSameDay(date, today);
    const isSelected = selected ? this.isSameDay(date, selected) : false;
    const isDisabled =
      this._disabledByCva() ||
      (minDate ? date < minDate : false) || (maxDate ? date > maxDate : false);

    return { date, day: date.getDate(), isCurrentMonth, isToday, isSelected, isDisabled };
  }

  private isSameDay(a: Date, b: Date): boolean {
    return (
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
    );
  }
}
