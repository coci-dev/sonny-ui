import { Component, signal } from '@angular/core';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { SnyRadialProgressComponent } from './radial-progress.component';

@Component({
  standalone: true,
  imports: [SnyRadialProgressComponent],
  template: `<sny-radial-progress [value]="value()">{{ value() }}%</sny-radial-progress>`,
})
class TestHostComponent {
  value = signal(75);
}

describe('SnyRadialProgressComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TestHostComponent] }).compileComponents();
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    host = fixture.nativeElement.querySelector('sny-radial-progress');
  });

  it('should render with progressbar role', () => {
    expect(host.getAttribute('role')).toBe('progressbar');
  });

  it('should set aria-valuenow', () => {
    expect(host.getAttribute('aria-valuenow')).toBe('75');
  });

  it('should render SVG circles', () => {
    const circles = host.querySelectorAll('circle');
    expect(circles.length).toBe(2);
  });

  it('should project content', () => {
    expect(host.textContent).toContain('75%');
  });
});
