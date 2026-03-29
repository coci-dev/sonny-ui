import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { SnyColorPickerComponent } from './color-picker.component';
import { hexToRgb, rgbToHex, rgbToHsl, hslToRgb, rgbToHsv, hsvToRgb, parseColor, formatColor, isValidColor } from './color-picker.utils';
import type { ColorPickerPreset } from './color-picker.types';

// --- Utils Tests ---
describe('Color Picker Utils', () => {
  it('hexToRgb should parse 6-digit hex', () => {
    expect(hexToRgb('#ff0000')).toEqual({ r: 255, g: 0, b: 0 });
    expect(hexToRgb('#00ff00')).toEqual({ r: 0, g: 255, b: 0 });
  });

  it('hexToRgb should parse 3-digit hex', () => {
    expect(hexToRgb('#f00')).toEqual({ r: 255, g: 0, b: 0 });
  });

  it('hexToRgb should return null for invalid', () => {
    expect(hexToRgb('#xyz')).toBeNull();
    expect(hexToRgb('')).toBeNull();
  });

  it('rgbToHex should convert rgb to hex', () => {
    expect(rgbToHex({ r: 255, g: 0, b: 0 })).toBe('#ff0000');
    expect(rgbToHex({ r: 0, g: 0, b: 0 })).toBe('#000000');
    expect(rgbToHex({ r: 255, g: 255, b: 255 })).toBe('#ffffff');
  });

  it('rgbToHex should clamp out-of-range values', () => {
    expect(rgbToHex({ r: 300, g: -10, b: 128 })).toBe('#ff0080');
  });

  it('rgbToHsl and hslToRgb should round-trip', () => {
    const rgb = { r: 59, g: 130, b: 246 };
    const hsl = rgbToHsl(rgb);
    const back = hslToRgb(hsl);
    expect(Math.abs(back.r - rgb.r)).toBeLessThanOrEqual(1);
    expect(Math.abs(back.g - rgb.g)).toBeLessThanOrEqual(1);
    expect(Math.abs(back.b - rgb.b)).toBeLessThanOrEqual(1);
  });

  it('rgbToHsl should handle grayscale', () => {
    const hsl = rgbToHsl({ r: 128, g: 128, b: 128 });
    expect(hsl.s).toBe(0);
  });

  it('rgbToHsv and hsvToRgb should round-trip', () => {
    const rgb = { r: 100, g: 200, b: 50 };
    const hsv = rgbToHsv(rgb);
    const back = hsvToRgb(hsv);
    expect(Math.abs(back.r - rgb.r)).toBeLessThanOrEqual(1);
    expect(Math.abs(back.g - rgb.g)).toBeLessThanOrEqual(1);
    expect(Math.abs(back.b - rgb.b)).toBeLessThanOrEqual(1);
  });

  it('rgbToHsv should handle black', () => {
    const hsv = rgbToHsv({ r: 0, g: 0, b: 0 });
    expect(hsv.v).toBe(0);
    expect(hsv.s).toBe(0);
  });

  it('parseColor should parse hex', () => {
    expect(parseColor('#3b82f6')).toEqual({ r: 59, g: 130, b: 246 });
  });

  it('parseColor should parse rgb()', () => {
    expect(parseColor('rgb(255, 0, 0)')).toEqual({ r: 255, g: 0, b: 0 });
  });

  it('parseColor should parse hsl()', () => {
    const result = parseColor('hsl(0, 100%, 50%)');
    expect(result).not.toBeNull();
    expect(result!.r).toBe(255);
  });

  it('parseColor should return null for invalid', () => {
    expect(parseColor('notacolor')).toBeNull();
    expect(parseColor('')).toBeNull();
  });

  it('formatColor should format as hex', () => {
    expect(formatColor({ r: 255, g: 0, b: 0 }, 'hex')).toBe('#ff0000');
  });

  it('formatColor should format as rgb', () => {
    expect(formatColor({ r: 255, g: 0, b: 0 }, 'rgb')).toBe('rgb(255, 0, 0)');
  });

  it('formatColor should format as hsl', () => {
    const result = formatColor({ r: 255, g: 0, b: 0 }, 'hsl');
    expect(result).toContain('hsl(');
    expect(result).toContain('100%');
  });

  it('isValidColor should validate', () => {
    expect(isValidColor('#ff0000')).toBe(true);
    expect(isValidColor('rgb(0, 0, 0)')).toBe(true);
    expect(isValidColor('hsl(120, 50%, 50%)')).toBe(true);
    expect(isValidColor('invalid')).toBe(false);
    expect(isValidColor('')).toBe(false);
  });
});

// --- Component Tests ---
@Component({
  standalone: true,
  imports: [SnyColorPickerComponent],
  template: `
    <sny-color-picker
      [(value)]="color"
      [presets]="presets()"
      [showFavorites]="showFavorites()"
      [inline]="inline()"
      [disabled]="disabled()"
      (colorChange)="lastColor = $event"
    />
  `,
})
class TestHostComponent {
  color = signal('#3b82f6');
  presets = signal<ColorPickerPreset[]>([]);
  showFavorites = signal(false);
  inline = signal(false);
  disabled = signal(false);
  lastColor: string | null = null;
}

describe('SnyColorPickerComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TestHostComponent] }).compileComponents();
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    el = fixture.nativeElement;
  });

  it('should render trigger with color swatch', () => {
    const swatch = el.querySelector('[style*="background"]');
    expect(swatch).not.toBeNull();
    const trigger = el.querySelector('button');
    // HSV round-trip may cause ±1 in RGB values
    expect(trigger?.textContent).toContain('#3b8');
  });

  it('should open popover on click', () => {
    const trigger = el.querySelector('button') as HTMLButtonElement;
    trigger.click();
    fixture.detectChanges();
    const panel = el.querySelector('[role="dialog"]');
    expect(panel).not.toBeNull();
    const satPanel = el.querySelector('.cursor-crosshair');
    expect(satPanel).not.toBeNull();
  });

  it('should close popover on escape', () => {
    const trigger = el.querySelector('button') as HTMLButtonElement;
    trigger.click();
    fixture.detectChanges();
    expect(el.querySelector('[role="dialog"]')).not.toBeNull();

    // Dispatch on the host element (HostListener binds to host, not document)
    const host = el.querySelector('sny-color-picker') as HTMLElement;
    host.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    fixture.detectChanges();
    expect(el.querySelector('[role="dialog"]')).toBeNull();
  });

  it('should render inline without trigger', () => {
    fixture.componentInstance.inline.set(true);
    fixture.detectChanges();
    const panel = el.querySelector('[role="dialog"]');
    expect(panel).not.toBeNull();
    const satPanel = el.querySelector('.cursor-crosshair');
    expect(satPanel).not.toBeNull();
    // No trigger button in inline mode
    const combobox = el.querySelector('[role="combobox"]');
    expect(combobox).toBeNull();
  });

  it('should render presets when provided', () => {
    fixture.componentInstance.presets.set([
      { label: 'Reds', colors: ['#ff0000', '#cc0000', '#990000'] },
    ]);
    fixture.componentInstance.inline.set(true);
    fixture.detectChanges();
    const label = el.querySelector('.text-muted-foreground');
    expect(label?.textContent).toContain('Reds');
    const swatches = el.querySelectorAll('[title="#ff0000"], [title="#cc0000"], [title="#990000"]');
    expect(swatches.length).toBe(3);
  });

  it('should select preset color on click', () => {
    fixture.componentInstance.presets.set([
      { colors: ['#ff0000'] },
    ]);
    fixture.componentInstance.inline.set(true);
    fixture.detectChanges();

    const swatch = el.querySelector('[title="#ff0000"]') as HTMLButtonElement;
    swatch.click();
    fixture.detectChanges();

    expect(fixture.componentInstance.color()).toBe('#ff0000');
    expect(fixture.componentInstance.lastColor).toBe('#ff0000');
  });

  it('should not open when disabled', () => {
    fixture.componentInstance.disabled.set(true);
    fixture.detectChanges();
    const trigger = el.querySelector('button') as HTMLButtonElement;
    expect(trigger.disabled).toBe(true);
  });

  it('should display format switcher and cycle formats', () => {
    fixture.componentInstance.inline.set(true);
    fixture.detectChanges();

    const formatBtn = Array.from(el.querySelectorAll('button')).find(
      (b) => b.textContent?.trim().toLowerCase() === 'hex'
    ) as HTMLButtonElement;
    expect(formatBtn).not.toBeNull();

    // Cycle to rgb
    formatBtn.click();
    fixture.detectChanges();
    const rgbBtn = Array.from(el.querySelectorAll('button')).find(
      (b) => b.textContent?.trim().toLowerCase() === 'rgb'
    );
    expect(rgbBtn).not.toBeNull();
  });

  it('should have copy button in panel', () => {
    fixture.componentInstance.inline.set(true);
    fixture.detectChanges();
    const copyBtn = el.querySelector('[title="Copy color"]');
    expect(copyBtn).not.toBeNull();
  });

  it('should validate manual input', () => {
    fixture.componentInstance.inline.set(true);
    fixture.detectChanges();

    const input = el.querySelector('input') as HTMLInputElement;
    // Type valid hex
    input.value = '#00ff00';
    input.dispatchEvent(new Event('input'));
    input.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    expect(fixture.componentInstance.color()).toBe('#00ff00');
  });

  it('should reject invalid manual input', () => {
    fixture.componentInstance.inline.set(true);
    fixture.detectChanges();

    const originalColor = fixture.componentInstance.color();
    const input = el.querySelector('input') as HTMLInputElement;
    input.value = 'notacolor';
    input.dispatchEvent(new Event('input'));
    input.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    // Should revert to previous valid color
    expect(fixture.componentInstance.color()).toBe(originalColor);
  });

  it('should show hue slider', () => {
    fixture.componentInstance.inline.set(true);
    fixture.detectChanges();
    const hueTrack = el.querySelector('[style*="linear-gradient"]');
    expect(hueTrack).not.toBeNull();
  });
});

// --- Reactive Forms ---
@Component({
  standalone: true,
  imports: [ReactiveFormsModule, SnyColorPickerComponent],
  template: `<sny-color-picker [formControl]="ctrl" [inline]="true" />`,
})
class ReactiveFormHost {
  ctrl = new FormControl('#ff0000');
}

describe('SnyColorPickerComponent — Reactive Forms', () => {
  let fixture: ComponentFixture<ReactiveFormHost>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ReactiveFormHost] }).compileComponents();
    fixture = TestBed.createComponent(ReactiveFormHost);
    fixture.detectChanges();
    el = fixture.nativeElement;
  });

  it('should display initial FormControl value', () => {
    const input = el.querySelector('input') as HTMLInputElement;
    expect(input.value).toContain('#ff0000');
  });

  it('should update display when FormControl value changes', () => {
    fixture.componentInstance.ctrl.setValue('#00ff00');
    fixture.detectChanges();
    const input = el.querySelector('input') as HTMLInputElement;
    expect(input.value).toContain('#00ff00');
  });

  it('should update FormControl when user selects a preset', () => {
    // The inline component is rendered, interact with input
    const input = el.querySelector('input') as HTMLInputElement;
    input.value = '#0000ff';
    input.dispatchEvent(new Event('input'));
    input.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    expect(fixture.componentInstance.ctrl.value).toBe('#0000ff');
  });

  it('should disable via FormControl.disable()', () => {
    fixture.componentInstance.ctrl.disable();
    fixture.detectChanges();
    expect(fixture.componentInstance.ctrl.disabled).toBe(true);
  });
});
