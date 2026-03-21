import { Component, signal } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { SnyComboboxComponent, type ComboboxOption } from './combobox.component';

@Component({
  standalone: true,
  imports: [SnyComboboxComponent],
  template: `<sny-combobox [options]="options" [(value)]="value" placeholder="Select..." searchPlaceholder="Search..." />`,
})
class TestHostComponent {
  value = signal('');
  options: ComboboxOption[] = [
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'ca', label: 'Canada' },
  ];
}

describe('SnyComboboxComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let el: HTMLElement;
  let trigger: HTMLButtonElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    el = fixture.nativeElement.querySelector('sny-combobox');
    trigger = el.querySelector('button')!;
  });

  it('should render the trigger button', () => {
    expect(trigger).toBeTruthy();
    expect(trigger.getAttribute('role')).toBe('combobox');
  });

  it('should show placeholder when no value selected', () => {
    expect(trigger.textContent).toContain('Select...');
  });

  it('should set aria-expanded=false initially', () => {
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
  });

  it('should open dropdown on trigger click', () => {
    trigger.click();
    fixture.detectChanges();
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
    const listbox = el.querySelector('[role="listbox"]');
    expect(listbox).toBeTruthy();
  });

  it('should show search input in dropdown', () => {
    trigger.click();
    fixture.detectChanges();
    const searchInput = el.querySelector('input[type="text"]') as HTMLInputElement;
    expect(searchInput).toBeTruthy();
    expect(searchInput.getAttribute('placeholder')).toBe('Search...');
  });

  it('should show all options when no query', () => {
    trigger.click();
    fixture.detectChanges();
    const options = el.querySelectorAll('[role="option"]');
    expect(options.length).toBe(3);
  });

  it('should select option on click and show label', () => {
    trigger.click();
    fixture.detectChanges();

    const option = el.querySelector('[role="option"]') as HTMLElement;
    option.dispatchEvent(new Event('mousedown'));
    fixture.detectChanges();

    expect(fixture.componentInstance.value()).toBe('us');
    expect(trigger.textContent).toContain('United States');
  });

  it('should close dropdown after selecting', () => {
    trigger.click();
    fixture.detectChanges();

    const option = el.querySelector('[role="option"]') as HTMLElement;
    option.dispatchEvent(new Event('mousedown'));
    fixture.detectChanges();

    expect(trigger.getAttribute('aria-expanded')).toBe('false');
  });
});
