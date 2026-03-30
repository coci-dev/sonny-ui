import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { SnyTagInputComponent } from './tag-input.component';

@Component({
  standalone: true,
  imports: [SnyTagInputComponent],
  template: `
    <sny-tag-input
      [(value)]="tags"
      [maxTags]="maxTags()"
      [allowDuplicates]="allowDuplicates()"
      [disabled]="disabled()"
      [validate]="validateFn()"
      (tagAdded)="lastAdded = $event"
      (tagRemoved)="lastRemoved = $event"
    />
  `,
})
class TestHost {
  tags = signal<string[]>([]);
  maxTags = signal<number | null>(null);
  allowDuplicates = signal(false);
  disabled = signal(false);
  validateFn = signal<((t: string) => boolean) | null>(null);
  lastAdded: string | null = null;
  lastRemoved: string | null = null;
}

describe('SnyTagInputComponent', () => {
  let fixture: ComponentFixture<TestHost>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TestHost] }).compileComponents();
    fixture = TestBed.createComponent(TestHost);
    fixture.detectChanges();
    el = fixture.nativeElement;
  });

  function getInput(): HTMLInputElement {
    return el.querySelector('input') as HTMLInputElement;
  }

  function getTags(): string[] {
    return Array.from(el.querySelectorAll('span')).map((s) => s.textContent?.trim().replace('×', '').trim() ?? '');
  }

  function typeAndEnter(text: string): void {
    const input = getInput();
    input.value = text;
    input.dispatchEvent(new Event('input', { bubbles: true }));
    fixture.detectChanges();
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    fixture.detectChanges();
  }

  it('should render empty with placeholder', () => {
    expect(getInput().placeholder).toBe('Add tag...');
  });

  it('should add tag on Enter', () => {
    typeAndEnter('Angular');
    expect(fixture.componentInstance.tags()).toContain('Angular');
    expect(fixture.componentInstance.lastAdded).toBe('Angular');
  });

  it('should add tag on comma', () => {
    const input = getInput();
    input.value = 'React,';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    fixture.detectChanges();
    expect(fixture.componentInstance.tags()).toContain('React');
  });

  it('should reject duplicates when allowDuplicates=false', () => {
    typeAndEnter('Angular');
    typeAndEnter('Angular');
    expect(fixture.componentInstance.tags().filter((t) => t === 'Angular').length).toBe(1);
  });

  it('should allow duplicates when allowDuplicates=true', () => {
    fixture.componentInstance.allowDuplicates.set(true);
    fixture.detectChanges();
    typeAndEnter('Angular');
    typeAndEnter('Angular');
    expect(fixture.componentInstance.tags().filter((t) => t === 'Angular').length).toBe(2);
  });

  it('should respect maxTags', () => {
    fixture.componentInstance.maxTags.set(2);
    fixture.detectChanges();
    typeAndEnter('A');
    typeAndEnter('B');
    // Input should be hidden now (atMax), so we can't type more
    const input = el.querySelector('input');
    expect(input).toBeNull(); // hidden when at max
    expect(fixture.componentInstance.tags().length).toBe(2);
  });

  it('should validate with custom function', () => {
    fixture.componentInstance.validateFn.set((t: string) => t.length >= 3);
    fixture.detectChanges();
    typeAndEnter('AB');
    expect(fixture.componentInstance.tags().length).toBe(0);
    typeAndEnter('ABC');
    expect(fixture.componentInstance.tags()).toContain('ABC');
  });

  it('should remove tag on X click', () => {
    typeAndEnter('Angular');
    fixture.detectChanges();
    const removeBtn = el.querySelector('[aria-label="Remove Angular"]') as HTMLButtonElement;
    removeBtn.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.tags().length).toBe(0);
    expect(fixture.componentInstance.lastRemoved).toBe('Angular');
  });

  it('should remove last tag on Backspace with empty input', () => {
    typeAndEnter('A');
    typeAndEnter('B');
    const input = getInput();
    input.value = '';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Backspace', bubbles: true }));
    fixture.detectChanges();
    expect(fixture.componentInstance.tags()).toEqual(['A']);
  });

  it('should add tag on blur when addOnBlur=true', () => {
    const input = getInput();
    input.value = 'BlurTag';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('blur', { bubbles: true }));
    fixture.detectChanges();
    expect(fixture.componentInstance.tags()).toContain('BlurTag');
  });

  it('should disable when disabled', () => {
    fixture.componentInstance.disabled.set(true);
    fixture.detectChanges();
    expect(getInput().disabled).toBe(true);
  });

  it('should emit tagAdded and tagRemoved', () => {
    typeAndEnter('Test');
    expect(fixture.componentInstance.lastAdded).toBe('Test');
    const removeBtn = el.querySelector('[aria-label="Remove Test"]') as HTMLButtonElement;
    removeBtn.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.lastRemoved).toBe('Test');
  });
});

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, SnyTagInputComponent],
  template: `<sny-tag-input [formControl]="ctrl" />`,
})
class ReactiveHost {
  ctrl = new FormControl<string[]>([]);
}

describe('SnyTagInputComponent — Reactive Forms', () => {
  let fixture: ComponentFixture<ReactiveHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ReactiveHost] }).compileComponents();
    fixture = TestBed.createComponent(ReactiveHost);
    fixture.detectChanges();
  });

  it('should populate tags from FormControl', () => {
    fixture.componentInstance.ctrl.setValue(['A', 'B', 'C']);
    fixture.detectChanges();
    const tags = fixture.nativeElement.querySelectorAll('span');
    expect(tags.length).toBe(3);
  });

  it('should update FormControl when tag added', () => {
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    input.value = 'New';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    fixture.detectChanges();
    expect(fixture.componentInstance.ctrl.value).toContain('New');
  });
});
