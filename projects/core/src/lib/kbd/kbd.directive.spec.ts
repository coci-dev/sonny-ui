import { Component, signal } from '@angular/core';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { SnyKbdDirective } from './kbd.directive';
import type { KbdSize } from './kbd.variants';

@Component({
  standalone: true,
  imports: [SnyKbdDirective],
  template: `<kbd snyKbd [size]="size()">Ctrl+K</kbd>`,
})
class TestHostComponent {
  size = signal<KbdSize>('md');
}

describe('SnyKbdDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TestHostComponent] }).compileComponents();
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    el = fixture.nativeElement.querySelector('kbd');
  });

  it('should apply default size classes', () => {
    expect(el.className).toContain('font-mono');
    expect(el.className).toContain('h-6');
  });

  it('should apply sm size', () => {
    fixture.componentInstance.size.set('sm');
    fixture.detectChanges();
    expect(el.className).toContain('h-5');
  });

  it('should apply lg size', () => {
    fixture.componentInstance.size.set('lg');
    fixture.detectChanges();
    expect(el.className).toContain('h-7');
  });
});
