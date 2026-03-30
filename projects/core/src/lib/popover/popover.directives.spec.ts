import { Component, signal } from '@angular/core';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import {
  SnyPopoverDirective,
  SnyPopoverTriggerDirective,
  SnyPopoverContentDirective,
} from './popover.directives';

@Component({
  standalone: true,
  imports: [SnyPopoverDirective, SnyPopoverTriggerDirective, SnyPopoverContentDirective],
  template: `
    <div snyPopover [matchWidth]="matchWidth()" [closeOnOutside]="closeOnOutside()" [closeOnEscape]="closeOnEscape()" #pop="snyPopover">
      <button snyPopoverTrigger>Open</button>
      <div snyPopoverContent class="p-4">
        <p>Popover content</p>
        <button class="close-btn" (click)="pop.close()">Close</button>
      </div>
    </div>
  `,
})
class TestHost {
  matchWidth = signal(false);
  closeOnOutside = signal(true);
  closeOnEscape = signal(true);
}

describe('SnyPopoverDirective', () => {
  let fixture: ComponentFixture<TestHost>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TestHost] }).compileComponents();
    fixture = TestBed.createComponent(TestHost);
    fixture.detectChanges();
    el = fixture.nativeElement;
  });

  function getTrigger(): HTMLButtonElement {
    return el.querySelector('[snypopovertrigger]') as HTMLButtonElement;
  }

  function getContent(): HTMLElement | null {
    return el.querySelector('[snyPopoverContent], [snypopovercontent]');
  }

  function isVisible(): boolean {
    const content = getContent();
    return content ? content.style.display !== 'none' : false;
  }

  it('should render trigger and hidden content', () => {
    expect(getTrigger()).not.toBeNull();
    expect(getContent()).not.toBeNull();
    expect(isVisible()).toBe(false);
  });

  it('should open on trigger click', () => {
    getTrigger().click();
    fixture.detectChanges();
    expect(isVisible()).toBe(true);
  });

  it('should close on second trigger click', () => {
    getTrigger().click();
    fixture.detectChanges();
    expect(isVisible()).toBe(true);

    getTrigger().click();
    fixture.detectChanges();
    expect(isVisible()).toBe(false);
  });

  it('should set aria-expanded on trigger', () => {
    expect(getTrigger().getAttribute('aria-expanded')).toBe('false');
    getTrigger().click();
    fixture.detectChanges();
    expect(getTrigger().getAttribute('aria-expanded')).toBe('true');
  });

  it('should have aria-haspopup on trigger', () => {
    expect(getTrigger().getAttribute('aria-haspopup')).toBe('dialog');
  });

  it('should have role=dialog on content', () => {
    expect(getContent()?.getAttribute('role')).toBe('dialog');
  });

  it('should close on click outside', () => {
    getTrigger().click();
    fixture.detectChanges();
    expect(isVisible()).toBe(true);

    document.body.click();
    fixture.detectChanges();
    expect(isVisible()).toBe(false);
  });

  it('should not close on click outside when closeOnOutside=false', () => {
    fixture.componentInstance.closeOnOutside.set(false);
    fixture.detectChanges();

    getTrigger().click();
    fixture.detectChanges();
    expect(isVisible()).toBe(true);

    document.body.click();
    fixture.detectChanges();
    expect(isVisible()).toBe(true);
  });

  it('should close on escape', () => {
    getTrigger().click();
    fixture.detectChanges();
    expect(isVisible()).toBe(true);

    const host = el.querySelector('[snyPopover], [snypopover]') as HTMLElement;
    host.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    fixture.detectChanges();
    expect(isVisible()).toBe(false);
  });

  it('should not close on escape when closeOnEscape=false', () => {
    fixture.componentInstance.closeOnEscape.set(false);
    fixture.detectChanges();

    getTrigger().click();
    fixture.detectChanges();
    expect(isVisible()).toBe(true);

    const host = el.querySelector('[snyPopover], [snypopover]') as HTMLElement;
    host.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    fixture.detectChanges();
    expect(isVisible()).toBe(true);
  });

  it('should close programmatically via template ref', () => {
    getTrigger().click();
    fixture.detectChanges();
    expect(isVisible()).toBe(true);

    const closeBtn = el.querySelector('.close-btn') as HTMLButtonElement;
    closeBtn.click();
    fixture.detectChanges();
    expect(isVisible()).toBe(false);
  });
});
