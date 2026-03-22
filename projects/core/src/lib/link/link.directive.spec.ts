import { Component, signal } from '@angular/core';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { SnyLinkDirective } from './link.directive';
import type { LinkVariant } from './link.variants';

@Component({
  standalone: true,
  imports: [SnyLinkDirective],
  template: `<a snyLink [variant]="variant()" href="#">Click me</a>`,
})
class TestHostComponent {
  variant = signal<LinkVariant>('default');
}

describe('SnyLinkDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TestHostComponent] }).compileComponents();
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    el = fixture.nativeElement.querySelector('a');
  });

  it('should apply default classes', () => {
    expect(el.className).toContain('underline');
  });

  it('should apply primary variant', () => {
    fixture.componentInstance.variant.set('primary');
    fixture.detectChanges();
    expect(el.className).toContain('text-primary');
  });

  it('should apply hover variant', () => {
    fixture.componentInstance.variant.set('hover');
    fixture.detectChanges();
    expect(el.className).toContain('no-underline');
  });
});
