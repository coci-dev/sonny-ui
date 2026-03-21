import { Component, signal } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { SnyCheckboxDirective } from './checkbox.directive';
import type { CheckboxSize } from './checkbox.variants';

@Component({
  standalone: true,
  imports: [SnyCheckboxDirective],
  template: `<input type="checkbox" snyCheckbox [size]="size()" />`,
})
class TestHostComponent {
  size = signal<CheckboxSize>('md');
}

describe('SnyCheckboxDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let el: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    el = fixture.nativeElement.querySelector('input[type="checkbox"]');
  });

  it('should apply default classes', () => {
    expect(el.className).toContain('appearance-none');
    expect(el.className).toContain('rounded-sm');
    expect(el.className).toContain('border');
  });

  it('should apply default md size', () => {
    expect(el.className).toContain('h-4');
    expect(el.className).toContain('w-4');
  });

  it('should apply sm size', () => {
    fixture.componentInstance.size.set('sm');
    fixture.detectChanges();
    expect(el.className).toContain('h-3.5');
    expect(el.className).toContain('w-3.5');
  });

  it('should apply lg size', () => {
    fixture.componentInstance.size.set('lg');
    fixture.detectChanges();
    expect(el.className).toContain('h-5');
    expect(el.className).toContain('w-5');
  });

  it('should have checked styles in class list', () => {
    expect(el.className).toContain('checked:bg-primary');
  });
});
