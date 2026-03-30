import { Component, signal } from '@angular/core';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { SnyAvatarGroupComponent, type AvatarGroupItem } from './avatar-group.component';

@Component({
  standalone: true,
  imports: [SnyAvatarGroupComponent],
  template: `<sny-avatar-group [items]="items()" [max]="max()" [size]="size()" />`,
})
class TestHost {
  items = signal<AvatarGroupItem[]>([
    { src: 'a.jpg', alt: 'Alice' },
    { src: 'b.jpg', alt: 'Bob' },
    { src: 'c.jpg', alt: 'Carol' },
    { src: 'd.jpg', alt: 'David' },
    { src: 'e.jpg', alt: 'Eve' },
  ]);
  max = signal(3);
  size = signal<'sm' | 'md' | 'lg'>('md');
}

describe('SnyAvatarGroupComponent', () => {
  let fixture: ComponentFixture<TestHost>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TestHost] }).compileComponents();
    fixture = TestBed.createComponent(TestHost);
    fixture.detectChanges();
    el = fixture.nativeElement;
  });

  it('should render max avatars', () => {
    const imgs = el.querySelectorAll('img');
    expect(imgs.length).toBe(3);
  });

  it('should show overflow counter', () => {
    const counter = el.querySelector('[title="2 more"]');
    expect(counter).not.toBeNull();
    expect(counter?.textContent).toContain('+2');
  });

  it('should not show counter when no overflow', () => {
    fixture.componentInstance.max.set(5);
    fixture.detectChanges();
    const counter = el.querySelector('[title]');
    expect(counter).toBeNull();
  });

  it('should render all when max >= items', () => {
    fixture.componentInstance.max.set(10);
    fixture.detectChanges();
    const imgs = el.querySelectorAll('img');
    expect(imgs.length).toBe(5);
  });

  it('should render fallback initials when no src', () => {
    fixture.componentInstance.items.set([
      { fallback: 'AB' },
      { fallback: 'CD' },
    ]);
    fixture.componentInstance.max.set(2);
    fixture.detectChanges();
    const fallbacks = el.querySelectorAll('.bg-muted');
    expect(fallbacks.length).toBe(2);
    expect(fallbacks[0].textContent).toContain('AB');
  });

  it('should have aria-label on group', () => {
    const group = el.querySelector('[role="group"]');
    expect(group?.getAttribute('aria-label')).toBe('Group of 5 users');
  });
});
