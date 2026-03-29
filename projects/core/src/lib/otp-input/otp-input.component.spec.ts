import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { SnyOtpInputComponent } from './otp-input.component';

@Component({
  standalone: true,
  imports: [SnyOtpInputComponent],
  template: `
    <sny-otp-input
      [(value)]="otp"
      [length]="length()"
      [type]="type()"
      [disabled]="disabled()"
      [mask]="mask()"
      [separator]="separator()"
      [status]="status()"
      [autoFocus]="false"
      (completed)="lastCompleted = $event"
    />
  `,
})
class TestHostComponent {
  otp = signal('');
  length = signal(6);
  type = signal<'number' | 'alphanumeric'>('number');
  disabled = signal(false);
  mask = signal(false);
  separator = signal<number | null>(null);
  status = signal<'idle' | 'loading' | 'success' | 'error'>('idle');
  lastCompleted: string | null = null;
}

describe('SnyOtpInputComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TestHostComponent] }).compileComponents();
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    el = fixture.nativeElement;
  });

  function getInputs(): HTMLInputElement[] {
    return Array.from(el.querySelectorAll('input'));
  }

  function typeChar(input: HTMLInputElement, char: string): void {
    input.value = char;
    input.dispatchEvent(new Event('input', { bubbles: true }));
    fixture.detectChanges();
  }

  it('should render N inputs based on length', () => {
    expect(getInputs().length).toBe(6);
  });

  it('should render 4 inputs when length is 4', () => {
    fixture.componentInstance.length.set(4);
    fixture.detectChanges();
    expect(getInputs().length).toBe(4);
  });

  it('should accept numbers when type is number', () => {
    const inputs = getInputs();
    typeChar(inputs[0], '5');
    expect(fixture.componentInstance.otp()).toContain('5');
  });

  it('should reject letters when type is number', () => {
    const inputs = getInputs();
    typeChar(inputs[0], 'a');
    expect(inputs[0].value).toBe('');
  });

  it('should accept letters when type is alphanumeric', () => {
    fixture.componentInstance.type.set('alphanumeric');
    fixture.detectChanges();
    const inputs = getInputs();
    typeChar(inputs[0], 'A');
    expect(fixture.componentInstance.otp()).toContain('A');
  });

  it('should auto-focus next input after typing', () => {
    const inputs = getInputs();
    inputs[0].focus();
    typeChar(inputs[0], '1');
    expect(document.activeElement).toBe(inputs[1]);
  });

  it('should handle backspace - clear current and move back', () => {
    const inputs = getInputs();
    typeChar(inputs[0], '1');
    typeChar(inputs[1], '2');

    // Backspace on empty input[2] should move to input[1]
    inputs[2].focus();
    inputs[2].dispatchEvent(new KeyboardEvent('keydown', { key: 'Backspace', bubbles: true }));
    fixture.detectChanges();

    // Should clear input[1] and focus it
    expect(document.activeElement).toBe(inputs[1]);
  });

  it('should handle paste', () => {
    const inputs = getInputs();
    inputs[0].focus();

    // Create a paste event compatible with test environments
    const pasteEvent = new Event('paste', { bubbles: true }) as any;
    pasteEvent.clipboardData = { getData: () => '123456' };
    inputs[0].dispatchEvent(pasteEvent);
    fixture.detectChanges();

    expect(fixture.componentInstance.otp()).toBe('123456');
  });

  it('should emit completed when all digits filled', () => {
    const inputs = getInputs();
    for (let i = 0; i < 6; i++) {
      typeChar(inputs[i], String(i + 1));
    }
    expect(fixture.componentInstance.lastCompleted).toBe('123456');
  });

  it('should navigate with arrow keys', () => {
    const inputs = getInputs();
    inputs[2].focus();

    inputs[2].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
    fixture.detectChanges();
    expect(document.activeElement).toBe(inputs[1]);

    inputs[1].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    fixture.detectChanges();
    expect(document.activeElement).toBe(inputs[2]);
  });

  it('should navigate with Home/End', () => {
    const inputs = getInputs();
    inputs[3].focus();

    inputs[3].dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true }));
    fixture.detectChanges();
    expect(document.activeElement).toBe(inputs[0]);

    inputs[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true }));
    fixture.detectChanges();
    expect(document.activeElement).toBe(inputs[5]);
  });

  it('should render password inputs when mask is true', () => {
    fixture.componentInstance.mask.set(true);
    fixture.detectChanges();
    const inputs = getInputs();
    expect(inputs[0].type).toBe('password');
  });

  it('should render separator', () => {
    fixture.componentInstance.separator.set(3);
    fixture.detectChanges();
    const separators = el.querySelectorAll('[aria-hidden="true"]');
    expect(separators.length).toBe(1);
    expect(separators[0].textContent).toContain('—');
  });

  it('should disable all inputs when disabled', () => {
    fixture.componentInstance.disabled.set(true);
    fixture.detectChanges();
    const inputs = getInputs();
    expect(inputs.every((i) => i.disabled)).toBe(true);
  });

  it('should have aria-label on each input', () => {
    const inputs = getInputs();
    expect(inputs[0].getAttribute('aria-label')).toBe('Digit 1 of 6');
    expect(inputs[5].getAttribute('aria-label')).toBe('Digit 6 of 6');
  });

  it('should have autocomplete one-time-code', () => {
    const inputs = getInputs();
    expect(inputs[0].getAttribute('autocomplete')).toBe('one-time-code');
  });

  it('should disable inputs when status is loading', () => {
    fixture.componentInstance.status.set('loading');
    fixture.detectChanges();
    const inputs = getInputs();
    expect(inputs.every((i) => i.disabled)).toBe(true);
  });

  it('should apply success styles when status is success', () => {
    fixture.componentInstance.status.set('success');
    fixture.detectChanges();
    const inputs = getInputs();
    expect(inputs[0].className).toContain('border-green-500');
  });

  it('should apply error styles when status is error', () => {
    fixture.componentInstance.status.set('error');
    fixture.detectChanges();
    const inputs = getInputs();
    expect(inputs[0].className).toContain('border-destructive');
  });
});

// --- Reactive Forms ---
@Component({
  standalone: true,
  imports: [ReactiveFormsModule, SnyOtpInputComponent],
  template: `<sny-otp-input [formControl]="ctrl" [autoFocus]="false" />`,
})
class ReactiveFormHost {
  ctrl = new FormControl('');
}

describe('SnyOtpInputComponent — Reactive Forms', () => {
  let fixture: ComponentFixture<ReactiveFormHost>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ReactiveFormHost] }).compileComponents();
    fixture = TestBed.createComponent(ReactiveFormHost);
    fixture.detectChanges();
    el = fixture.nativeElement;
  });

  it('should populate inputs when FormControl value is set', () => {
    fixture.componentInstance.ctrl.setValue('123456');
    fixture.detectChanges();
    const inputs = Array.from(el.querySelectorAll('input')) as HTMLInputElement[];
    expect(inputs[0].value).toBe('1');
    expect(inputs[5].value).toBe('6');
  });

  it('should update FormControl when user types', () => {
    const inputs = Array.from(el.querySelectorAll('input')) as HTMLInputElement[];
    inputs[0].value = '9';
    inputs[0].dispatchEvent(new Event('input', { bubbles: true }));
    fixture.detectChanges();

    expect(fixture.componentInstance.ctrl.value).toContain('9');
  });

  it('should disable via FormControl.disable()', () => {
    fixture.componentInstance.ctrl.disable();
    fixture.detectChanges();
    const inputs = Array.from(el.querySelectorAll('input')) as HTMLInputElement[];
    expect(inputs.every((i) => i.disabled)).toBe(true);
  });
});
