import { Component, signal } from '@angular/core';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { SnyTooltipDirective } from './tooltip.directive';
import type { TooltipPosition } from './tooltip.variants';
import { vi } from 'vitest';

@Component({
  standalone: true,
  imports: [SnyTooltipDirective],
  template: `
    <button
      [snyTooltip]="text()"
      [tooltipPosition]="position()"
      [tooltipDelay]="delay()"
      [tooltipDisabled]="disabled()"
    >
      Hover me
    </button>
  `,
})
class TestHostComponent {
  text = signal('Tooltip text');
  position = signal<TooltipPosition>('top');
  delay = signal(0);
  disabled = signal(false);
}

describe('SnyTooltipDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let button: HTMLButtonElement;

  beforeEach(async () => {
    vi.useFakeTimers();
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    button = fixture.nativeElement.querySelector('button');
  });

  afterEach(() => {
    vi.useRealTimers();
    document.querySelectorAll('[role="tooltip"]').forEach((el) => el.remove());
  });

  it('should not show tooltip initially', () => {
    expect(document.querySelector('[role="tooltip"]')).toBeNull();
    expect(button.getAttribute('aria-describedby')).toBeNull();
  });

  it('should show tooltip on mouseenter after delay', () => {
    button.dispatchEvent(new MouseEvent('mouseenter'));
    vi.advanceTimersByTime(0);
    fixture.detectChanges();

    const tooltip = document.querySelector('[role="tooltip"]');
    expect(tooltip).not.toBeNull();
    expect(tooltip!.textContent).toBe('Tooltip text');
  });

  it('should hide tooltip on mouseleave', () => {
    button.dispatchEvent(new MouseEvent('mouseenter'));
    vi.advanceTimersByTime(0);
    fixture.detectChanges();

    button.dispatchEvent(new MouseEvent('mouseleave'));
    fixture.detectChanges();

    expect(document.querySelector('[role="tooltip"]')).toBeNull();
  });

  it('should set aria-describedby when visible', () => {
    button.dispatchEvent(new MouseEvent('mouseenter'));
    vi.advanceTimersByTime(0);
    fixture.detectChanges();

    expect(button.getAttribute('aria-describedby')).toBeTruthy();
  });

  it('should not show when disabled', () => {
    fixture.componentInstance.disabled.set(true);
    fixture.detectChanges();

    button.dispatchEvent(new MouseEvent('mouseenter'));
    vi.advanceTimersByTime(0);
    fixture.detectChanges();

    expect(document.querySelector('[role="tooltip"]')).toBeNull();
  });

  it('should hide on Escape key', () => {
    button.dispatchEvent(new MouseEvent('mouseenter'));
    vi.advanceTimersByTime(0);
    fixture.detectChanges();

    button.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    fixture.detectChanges();

    expect(document.querySelector('[role="tooltip"]')).toBeNull();
  });

  it('should show on focus and hide on blur', () => {
    button.dispatchEvent(new Event('focus'));
    vi.advanceTimersByTime(0);
    fixture.detectChanges();
    expect(document.querySelector('[role="tooltip"]')).not.toBeNull();

    button.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    expect(document.querySelector('[role="tooltip"]')).toBeNull();
  });
});
