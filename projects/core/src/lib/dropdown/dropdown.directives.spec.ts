import { Component, signal } from '@angular/core';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import {
  SnyMenuContentDirective,
  SnyMenuItemDirective,
  SnyMenuSeparatorDirective,
  SnyMenuLabelDirective,
} from './dropdown.directives';
import type { DropdownItemVariant } from './dropdown.variants';

@Component({
  standalone: true,
  imports: [
    SnyMenuContentDirective,
    SnyMenuItemDirective,
    SnyMenuSeparatorDirective,
    SnyMenuLabelDirective,
  ],
  template: `
    <div snyMenuContent>
      <div snyMenuLabel>Actions</div>
      <div snyMenuItem [variant]="variant()">Edit</div>
      <div snyMenuSeparator></div>
      <div snyMenuItem variant="destructive">Delete</div>
    </div>
  `,
})
class TestHostComponent {
  variant = signal<DropdownItemVariant>('default');
}

describe('SnyMenuContentDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should apply content classes', () => {
    const content = fixture.nativeElement.querySelector('[snyMenuContent]');
    expect(content.className).toContain('rounded-md');
    expect(content.className).toContain('bg-popover');
  });
});

describe('SnyMenuItemDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should apply default item classes', () => {
    const items = fixture.nativeElement.querySelectorAll('[snyMenuItem]');
    expect(items[0].className).toContain('text-sm');
    expect(items[0].className).toContain('rounded-sm');
  });

  it('should apply destructive variant', () => {
    const items = fixture.nativeElement.querySelectorAll('[snyMenuItem]');
    expect(items[1].className).toContain('text-destructive');
  });
});

describe('SnyMenuSeparatorDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should apply separator classes and role', () => {
    const separator = fixture.nativeElement.querySelector('[snyMenuSeparator]');
    expect(separator.getAttribute('role')).toBe('separator');
    expect(separator.className).toContain('bg-muted');
  });
});

describe('SnyMenuLabelDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should apply label classes', () => {
    const label = fixture.nativeElement.querySelector('[snyMenuLabel]');
    expect(label.className).toContain('font-semibold');
  });
});
