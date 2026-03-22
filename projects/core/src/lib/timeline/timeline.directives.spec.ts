import { Component } from '@angular/core';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import {
  SnyTimelineDirective,
  SnyTimelineItemDirective,
  SnyTimelineStartDirective,
  SnyTimelineMiddleDirective,
  SnyTimelineEndDirective,
} from './timeline.directives';

@Component({
  standalone: true,
  imports: [SnyTimelineDirective, SnyTimelineItemDirective, SnyTimelineStartDirective, SnyTimelineMiddleDirective, SnyTimelineEndDirective],
  template: `
    <div snyTimeline>
      <div snyTimelineItem>
        <div snyTimelineStart>2024</div>
        <div snyTimelineMiddle variant="primary"></div>
        <div snyTimelineEnd>Event 1</div>
      </div>
      <div snyTimelineItem>
        <div snyTimelineStart>2025</div>
        <div snyTimelineMiddle></div>
        <div snyTimelineEnd>Event 2</div>
      </div>
    </div>
  `,
})
class TestHostComponent {}

describe('SnyTimelineDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TestHostComponent] }).compileComponents();
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should render with list role', () => {
    const timeline = fixture.nativeElement.querySelector('[snyTimeline]');
    expect(timeline.getAttribute('role')).toBe('list');
  });

  it('should render items with listitem role', () => {
    const items = fixture.nativeElement.querySelectorAll('[snyTimelineItem]');
    expect(items.length).toBe(2);
    expect(items[0].getAttribute('role')).toBe('listitem');
  });

  it('should mark middle as aria-hidden', () => {
    const middles = fixture.nativeElement.querySelectorAll('[snyTimelineMiddle]');
    expect(middles[0].getAttribute('aria-hidden')).toBe('true');
  });
});
