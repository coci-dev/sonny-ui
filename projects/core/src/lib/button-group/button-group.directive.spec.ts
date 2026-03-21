import { Component, signal } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { SnyButtonGroupDirective } from './button-group.directive';
import type { ButtonGroupOrientation } from './button-group.variants';

@Component({
  standalone: true,
  imports: [SnyButtonGroupDirective],
  template: `<div snyButtonGroup [orientation]="orientation()"><button>A</button><button>B</button></div>`,
})
class TestHostComponent {
  orientation = signal<ButtonGroupOrientation>('horizontal');
}

describe('SnyButtonGroupDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    el = fixture.nativeElement.querySelector('[snyButtonGroup]');
  });

  it('should have role="group"', () => {
    expect(el.getAttribute('role')).toBe('group');
  });

  it('should apply inline-flex', () => {
    expect(el.className).toContain('inline-flex');
  });

  it('should apply horizontal orientation by default', () => {
    expect(el.className).toContain('flex-row');
  });

  it('should apply vertical orientation', () => {
    fixture.componentInstance.orientation.set('vertical');
    fixture.detectChanges();
    expect(el.className).toContain('flex-col');
  });
});
