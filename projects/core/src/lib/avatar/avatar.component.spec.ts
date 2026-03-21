import { Component, signal } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { SnyAvatarComponent } from './avatar.component';
import type { AvatarSize, AvatarVariant } from './avatar.variants';

@Component({
  standalone: true,
  imports: [SnyAvatarComponent],
  template: `<sny-avatar [src]="src()" [alt]="alt()" [fallback]="fallback()" [size]="size()" [variant]="variant()" />`,
})
class TestHostComponent {
  src = signal('');
  alt = signal('John Doe');
  fallback = signal('');
  size = signal<AvatarSize>('md');
  variant = signal<AvatarVariant>('circle');
}

describe('SnyAvatarComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    el = fixture.nativeElement.querySelector('sny-avatar');
  });

  it('should show fallback text when no src', () => {
    const span = el.querySelector('span');
    expect(span?.textContent?.trim()).toBe('JD');
  });

  it('should show custom fallback', () => {
    fixture.componentInstance.fallback.set('AB');
    fixture.detectChanges();
    const span = el.querySelector('span');
    expect(span?.textContent?.trim()).toBe('AB');
  });

  it('should show image when src is provided', () => {
    fixture.componentInstance.src.set('https://example.com/avatar.png');
    fixture.detectChanges();
    const img = el.querySelector('img');
    expect(img).toBeTruthy();
    expect(img?.getAttribute('src')).toBe('https://example.com/avatar.png');
  });

  it('should apply circle variant by default', () => {
    expect(el.className).toContain('rounded-full');
  });

  it('should apply rounded variant', () => {
    fixture.componentInstance.variant.set('rounded');
    fixture.detectChanges();
    expect(el.className).toContain('rounded-md');
  });

  it('should apply size classes', () => {
    fixture.componentInstance.size.set('lg');
    fixture.detectChanges();
    expect(el.className).toContain('h-12');
    expect(el.className).toContain('w-12');
  });

  it('should apply xl size', () => {
    fixture.componentInstance.size.set('xl');
    fixture.detectChanges();
    expect(el.className).toContain('h-16');
  });
});
