import { Component, signal } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import {
  SnyCardDirective,
  SnyCardHeaderDirective,
  SnyCardTitleDirective,
  SnyCardDescriptionDirective,
  SnyCardContentDirective,
  SnyCardFooterDirective,
} from './card.directives';
import type { CardVariant, CardPadding } from './card.variants';

@Component({
  standalone: true,
  imports: [
    SnyCardDirective,
    SnyCardHeaderDirective,
    SnyCardTitleDirective,
    SnyCardDescriptionDirective,
    SnyCardContentDirective,
    SnyCardFooterDirective,
  ],
  template: `
    <div snyCard [variant]="variant()" [padding]="padding()">
      <div snyCardHeader>
        <h3 snyCardTitle>Title</h3>
        <p snyCardDescription>Description</p>
      </div>
      <div snyCardContent>Content</div>
      <div snyCardFooter>Footer</div>
    </div>
  `,
})
class TestHostComponent {
  variant = signal<CardVariant>('default');
  padding = signal<CardPadding>('none');
}

describe('Card Directives', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should apply default card classes', () => {
    const card = fixture.nativeElement.querySelector('[snyCard]');
    expect(card.className).toContain('bg-card');
    expect(card.className).toContain('border');
  });

  it('should apply elevated variant', () => {
    fixture.componentInstance.variant.set('elevated');
    fixture.detectChanges();
    const card = fixture.nativeElement.querySelector('[snyCard]');
    expect(card.className).toContain('shadow-lg');
  });

  it('should apply ghost variant', () => {
    fixture.componentInstance.variant.set('ghost');
    fixture.detectChanges();
    const card = fixture.nativeElement.querySelector('[snyCard]');
    expect(card.className).toContain('bg-transparent');
  });

  it('should apply padding', () => {
    fixture.componentInstance.padding.set('md');
    fixture.detectChanges();
    const card = fixture.nativeElement.querySelector('[snyCard]');
    expect(card.className).toContain('p-6');
  });

  it('should render card header', () => {
    const header = fixture.nativeElement.querySelector('[snyCardHeader]');
    expect(header.className).toContain('flex');
    expect(header.className).toContain('p-6');
  });

  it('should render card title', () => {
    const title = fixture.nativeElement.querySelector('[snyCardTitle]');
    expect(title.className).toContain('text-2xl');
    expect(title.className).toContain('font-semibold');
  });

  it('should render card description', () => {
    const desc = fixture.nativeElement.querySelector('[snyCardDescription]');
    expect(desc.className).toContain('text-muted-foreground');
  });

  it('should render content projection', () => {
    const content = fixture.nativeElement.querySelector('[snyCardContent]');
    expect(content.textContent).toContain('Content');
  });

  it('should render card footer', () => {
    const footer = fixture.nativeElement.querySelector('[snyCardFooter]');
    expect(footer.className).toContain('flex');
    expect(footer.className).toContain('items-center');
  });
});
