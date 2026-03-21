import { Component, signal } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { SnySliderComponent } from './slider.component';

@Component({
  standalone: true,
  imports: [SnySliderComponent],
  template: `<sny-slider [(value)]="value" [min]="min()" [max]="max()" [step]="step()" [disabled]="disabled()" />`,
})
class TestHostComponent {
  value = signal(50);
  min = signal(0);
  max = signal(100);
  step = signal(1);
  disabled = signal(false);
}

describe('SnySliderComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let thumb: HTMLButtonElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    thumb = fixture.nativeElement.querySelector('button[role="slider"]');
  });

  it('should have slider role', () => {
    expect(thumb.getAttribute('role')).toBe('slider');
  });

  it('should set aria values', () => {
    expect(thumb.getAttribute('aria-valuemin')).toBe('0');
    expect(thumb.getAttribute('aria-valuemax')).toBe('100');
    expect(thumb.getAttribute('aria-valuenow')).toBe('50');
  });

  it('should increment with ArrowRight', () => {
    const host = fixture.nativeElement.querySelector('sny-slider');
    host.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    fixture.detectChanges();
    expect(thumb.getAttribute('aria-valuenow')).toBe('51');
  });

  it('should decrement with ArrowLeft', () => {
    const host = fixture.nativeElement.querySelector('sny-slider');
    host.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
    fixture.detectChanges();
    expect(thumb.getAttribute('aria-valuenow')).toBe('49');
  });
});
