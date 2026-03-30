import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { SnyNumberInputComponent } from './number-input.component';

@Component({
  standalone: true,
  imports: [SnyNumberInputComponent],
  template: `
    <sny-number-input
      [(value)]="num"
      [min]="min()"
      [max]="max()"
      [step]="step()"
      [disabled]="disabled()"
    />
  `,
})
class TestHost {
  num = signal(5);
  min = signal<number | null>(null);
  max = signal<number | null>(null);
  step = signal(1);
  disabled = signal(false);
}

describe('SnyNumberInputComponent', () => {
  let fixture: ComponentFixture<TestHost>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TestHost] }).compileComponents();
    fixture = TestBed.createComponent(TestHost);
    fixture.detectChanges();
    el = fixture.nativeElement;
  });

  function getInput(): HTMLInputElement {
    return el.querySelector('input') as HTMLInputElement;
  }
  function getButtons(): HTMLButtonElement[] {
    return Array.from(el.querySelectorAll('button'));
  }

  it('should render with initial value', () => {
    expect(getInput().value).toBe('5');
  });

  it('should increment on + click', () => {
    getButtons()[1].click();
    fixture.detectChanges();
    expect(fixture.componentInstance.num()).toBe(6);
  });

  it('should decrement on - click', () => {
    getButtons()[0].click();
    fixture.detectChanges();
    expect(fixture.componentInstance.num()).toBe(4);
  });

  it('should respect min', () => {
    fixture.componentInstance.min.set(5);
    fixture.detectChanges();
    getButtons()[0].click();
    fixture.detectChanges();
    expect(fixture.componentInstance.num()).toBe(5);
  });

  it('should respect max', () => {
    fixture.componentInstance.max.set(5);
    fixture.detectChanges();
    getButtons()[1].click();
    fixture.detectChanges();
    expect(fixture.componentInstance.num()).toBe(5);
  });

  it('should use step', () => {
    fixture.componentInstance.step.set(10);
    fixture.detectChanges();
    getButtons()[1].click();
    fixture.detectChanges();
    expect(fixture.componentInstance.num()).toBe(15); // 5 + 10
  });

  it('should handle manual input on blur', () => {
    const input = getInput();
    input.value = '42';
    input.dispatchEvent(new Event('input'));
    input.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    expect(fixture.componentInstance.num()).toBe(42);
  });

  it('should revert invalid input on blur', () => {
    const input = getInput();
    input.value = 'abc';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('blur', { bubbles: true }));
    fixture.detectChanges();
    // Value should remain unchanged at 5
    expect(fixture.componentInstance.num()).toBe(5);
  });

  it('should handle ArrowUp/Down', () => {
    const input = getInput();
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
    fixture.detectChanges();
    expect(fixture.componentInstance.num()).toBe(6);
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    fixture.detectChanges();
    expect(fixture.componentInstance.num()).toBe(5);
  });

  it('should disable when disabled', () => {
    fixture.componentInstance.disabled.set(true);
    fixture.detectChanges();
    expect(getInput().disabled).toBe(true);
    expect(getButtons().every(b => b.disabled)).toBe(true);
  });
});

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, SnyNumberInputComponent],
  template: `<sny-number-input [formControl]="ctrl" />`,
})
class ReactiveHost {
  ctrl = new FormControl(10);
}

describe('SnyNumberInputComponent — Reactive Forms', () => {
  let fixture: ComponentFixture<ReactiveHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ReactiveHost] }).compileComponents();
    fixture = TestBed.createComponent(ReactiveHost);
    fixture.detectChanges();
  });

  it('should display FormControl value', () => {
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    expect(input.value).toBe('10');
  });

  it('should update FormControl on increment', () => {
    const buttons = fixture.nativeElement.querySelectorAll('button');
    buttons[1].click();
    fixture.detectChanges();
    expect(fixture.componentInstance.ctrl.value).toBe(11);
  });
});
