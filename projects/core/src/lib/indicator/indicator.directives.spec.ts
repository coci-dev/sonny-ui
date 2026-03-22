import { Component, signal } from '@angular/core';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { SnyIndicatorDirective, SnyIndicatorBadgeDirective, type IndicatorPosition, type IndicatorVariant } from './indicator.directives';

@Component({
  standalone: true,
  imports: [SnyIndicatorDirective, SnyIndicatorBadgeDirective],
  template: `
    <div snyIndicator>
      <span snyIndicatorBadge [position]="position()" [variant]="variant()" [ariaLabel]="badgeLabel()">5</span>
      <div>Content</div>
    </div>
  `,
})
class TestHostComponent {
  position = signal<IndicatorPosition>('top-end');
  variant = signal<IndicatorVariant>('default');
  badgeLabel = signal('');
}

describe('SnyIndicatorDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TestHostComponent] }).compileComponents();
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should render indicator container', () => {
    const el = fixture.nativeElement.querySelector('[snyIndicator]');
    expect(el.className).toContain('relative');
    expect(el.className).toContain('inline-flex');
  });

  it('should position badge at top-end by default', () => {
    const badge = fixture.nativeElement.querySelector('[snyIndicatorBadge]');
    expect(badge.className).toContain('top-0');
    expect(badge.className).toContain('right-0');
  });

  it('should change position', () => {
    fixture.componentInstance.position.set('bottom-start');
    fixture.detectChanges();
    const badge = fixture.nativeElement.querySelector('[snyIndicatorBadge]');
    expect(badge.className).toContain('bottom-0');
    expect(badge.className).toContain('left-0');
  });

  it('should apply error variant', () => {
    fixture.componentInstance.variant.set('error');
    fixture.detectChanges();
    const badge = fixture.nativeElement.querySelector('[snyIndicatorBadge]');
    expect(badge.className).toContain('bg-destructive');
  });

  it('should set aria-label on badge when ariaLabel input is provided', () => {
    const badge = fixture.nativeElement.querySelector('[snyIndicatorBadge]');
    expect(badge.getAttribute('aria-label')).toBeNull();
    fixture.componentInstance.badgeLabel.set('5 notifications');
    fixture.detectChanges();
    expect(badge.getAttribute('aria-label')).toBe('5 notifications');
  });
});
