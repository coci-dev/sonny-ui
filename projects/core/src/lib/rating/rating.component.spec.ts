import { Component, signal, viewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { SnyRatingComponent } from './rating.component';
import type { RatingSize } from './rating.variants';

@Component({
  standalone: true,
  imports: [SnyRatingComponent],
  template: `
    <sny-rating
      [(value)]="value"
      [max]="max()"
      [readonly]="readonly()"
      [size]="size()"
      [half]="half()"
    />
  `,
})
class TestHostComponent {
  value = signal(0);
  max = signal(5);
  readonly = signal(false);
  size = signal<RatingSize>('md');
  half = signal(false);
  rating = viewChild(SnyRatingComponent);
}

describe('SnyRatingComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    host = fixture.nativeElement.querySelector('sny-rating');
  });

  it('should render with slider role', () => {
    expect(host.getAttribute('role')).toBe('slider');
  });

  it('should render correct number of stars', () => {
    const stars = host.querySelectorAll('svg');
    expect(stars.length).toBe(5);
  });

  it('should set aria-valuenow', () => {
    expect(host.getAttribute('aria-valuenow')).toBe('0');
    fixture.componentInstance.value.set(3);
    fixture.detectChanges();
    expect(host.getAttribute('aria-valuenow')).toBe('3');
  });

  it('should set value on star click', () => {
    const stars = host.querySelectorAll('svg');
    stars[2].dispatchEvent(new MouseEvent('click'));
    fixture.detectChanges();
    expect(fixture.componentInstance.value()).toBe(3);
  });

  it('should not change value when readonly', () => {
    fixture.componentInstance.readonly.set(true);
    fixture.detectChanges();
    const stars = host.querySelectorAll('svg');
    stars[2].dispatchEvent(new MouseEvent('click'));
    fixture.detectChanges();
    expect(fixture.componentInstance.value()).toBe(0);
  });

  it('should handle keyboard ArrowRight', () => {
    host.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    fixture.detectChanges();
    expect(fixture.componentInstance.value()).toBe(1);
  });

  it('should handle keyboard ArrowLeft', () => {
    fixture.componentInstance.value.set(3);
    fixture.detectChanges();
    host.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
    fixture.detectChanges();
    expect(fixture.componentInstance.value()).toBe(2);
  });

  it('should handle Home and End keys', () => {
    fixture.componentInstance.value.set(3);
    fixture.detectChanges();
    host.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home' }));
    fixture.detectChanges();
    expect(fixture.componentInstance.value()).toBe(0);

    host.dispatchEvent(new KeyboardEvent('keydown', { key: 'End' }));
    fixture.detectChanges();
    expect(fixture.componentInstance.value()).toBe(5);
  });

  it('should render with custom max', () => {
    fixture.componentInstance.max.set(10);
    fixture.detectChanges();
    const stars = host.querySelectorAll('svg');
    expect(stars.length).toBe(10);
  });
});

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, SnyRatingComponent],
  template: `<sny-rating [formControl]="ctrl" />`,
})
class ReactiveFormHost {
  ctrl = new FormControl(0);
}

describe('SnyRatingComponent — Reactive Forms', () => {
  let fixture: ComponentFixture<ReactiveFormHost>;
  let host: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormHost],
    }).compileComponents();
    fixture = TestBed.createComponent(ReactiveFormHost);
    fixture.detectChanges();
    host = fixture.nativeElement.querySelector('sny-rating');
  });

  it('should update view when FormControl value changes (writeValue)', () => {
    fixture.componentInstance.ctrl.setValue(4);
    fixture.detectChanges();
    expect(host.getAttribute('aria-valuenow')).toBe('4');
  });

  it('should update FormControl when user interacts (onChange)', () => {
    const stars = host.querySelectorAll('svg');
    stars[2].dispatchEvent(new MouseEvent('click'));
    fixture.detectChanges();
    expect(fixture.componentInstance.ctrl.value).toBe(3);
  });

  it('should disable via FormControl.disable() (setDisabledState)', () => {
    fixture.componentInstance.ctrl.disable();
    fixture.detectChanges();
    const stars = host.querySelectorAll('svg');
    stars[2].dispatchEvent(new MouseEvent('click'));
    fixture.detectChanges();
    expect(fixture.componentInstance.ctrl.value).toBe(0);
  });

  it('should mark as touched on blur (onTouched)', () => {
    expect(fixture.componentInstance.ctrl.touched).toBe(false);
    host.dispatchEvent(new Event('blur'));
    expect(fixture.componentInstance.ctrl.touched).toBe(true);
  });
});
