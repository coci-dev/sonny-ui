import { Component, signal } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import {
  SnyTabsDirective,
  SnyTabsListDirective,
  SnyTabsTriggerDirective,
  SnyTabsContentDirective,
} from './tabs.directives';

@Component({
  standalone: true,
  imports: [SnyTabsDirective, SnyTabsListDirective, SnyTabsTriggerDirective, SnyTabsContentDirective],
  template: `
    <div snyTabs [(value)]="activeTab">
      <div snyTabsList>
        <button snyTabsTrigger value="tab1">Tab 1</button>
        <button snyTabsTrigger value="tab2">Tab 2</button>
      </div>
      <div snyTabsContent value="tab1">Content 1</div>
      <div snyTabsContent value="tab2">Content 2</div>
    </div>
  `,
})
class TestHostComponent {
  activeTab = signal('tab1');
}

describe('Tabs Directives', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should show active tab content', () => {
    const contents = fixture.nativeElement.querySelectorAll('[role="tabpanel"]');
    expect(contents[0].style.display).not.toBe('none');
    expect(contents[1].style.display).toBe('none');
  });

  it('should set aria-selected on active trigger', () => {
    const triggers = fixture.nativeElement.querySelectorAll('[role="tab"]');
    expect(triggers[0].getAttribute('aria-selected')).toBe('true');
    expect(triggers[1].getAttribute('aria-selected')).toBe('false');
  });

  it('should switch tabs on click', () => {
    const triggers = fixture.nativeElement.querySelectorAll('[role="tab"]');
    triggers[1].click();
    fixture.detectChanges();
    const contents = fixture.nativeElement.querySelectorAll('[role="tabpanel"]');
    expect(contents[0].style.display).toBe('none');
    expect(contents[1].style.display).not.toBe('none');
  });

  it('should have tablist role', () => {
    const list = fixture.nativeElement.querySelector('[role="tablist"]');
    expect(list).toBeTruthy();
    expect(list.className).toContain('bg-muted');
  });
});
