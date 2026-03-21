import { Component, signal } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import {
  SnyAccordionDirective,
  SnyAccordionItemDirective,
  SnyAccordionTriggerDirective,
  SnyAccordionContentDirective,
} from './accordion.directives';

@Component({
  standalone: true,
  imports: [
    SnyAccordionDirective,
    SnyAccordionItemDirective,
    SnyAccordionTriggerDirective,
    SnyAccordionContentDirective,
  ],
  template: `
    <div snyAccordion [multi]="multi()">
      <div snyAccordionItem value="item-1">
        <button snyAccordionTrigger>Item 1</button>
        <div snyAccordionContent><div>Content 1</div></div>
      </div>
      <div snyAccordionItem value="item-2">
        <button snyAccordionTrigger>Item 2</button>
        <div snyAccordionContent><div>Content 2</div></div>
      </div>
    </div>
  `,
})
class TestHostComponent {
  multi = signal(false);
}

describe('Accordion Directives', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should render accordion items', () => {
    const items = fixture.nativeElement.querySelectorAll('[snyAccordionItem]');
    expect(items.length).toBe(2);
  });

  it('should toggle item on trigger click', () => {
    const trigger = fixture.nativeElement.querySelector('[snyAccordionTrigger]');
    trigger.click();
    fixture.detectChanges();
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
  });

  it('should close previous item in single mode', () => {
    const triggers = fixture.nativeElement.querySelectorAll('[snyAccordionTrigger]');
    triggers[0].click();
    fixture.detectChanges();
    expect(triggers[0].getAttribute('aria-expanded')).toBe('true');

    triggers[1].click();
    fixture.detectChanges();
    expect(triggers[0].getAttribute('aria-expanded')).toBe('false');
    expect(triggers[1].getAttribute('aria-expanded')).toBe('true');
  });

  it('should allow multiple open in multi mode', () => {
    fixture.componentInstance.multi.set(true);
    fixture.detectChanges();

    const triggers = fixture.nativeElement.querySelectorAll('[snyAccordionTrigger]');
    triggers[0].click();
    fixture.detectChanges();
    triggers[1].click();
    fixture.detectChanges();

    expect(triggers[0].getAttribute('aria-expanded')).toBe('true');
    expect(triggers[1].getAttribute('aria-expanded')).toBe('true');
  });

  it('should apply content visibility classes', () => {
    const content = fixture.nativeElement.querySelector('[snyAccordionContent]');
    expect(content.className).toContain('grid-rows-[0fr]');

    const trigger = fixture.nativeElement.querySelector('[snyAccordionTrigger]');
    trigger.click();
    fixture.detectChanges();

    expect(content.className).toContain('grid-rows-[1fr]');
  });
});
