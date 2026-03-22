import { Component, signal } from '@angular/core';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { SnyStatDirective, SnyStatTitleDirective, SnyStatValueDirective, SnyStatDescriptionDirective, type StatDescriptionVariant } from './stat.directives';

@Component({
  standalone: true,
  imports: [SnyStatDirective, SnyStatTitleDirective, SnyStatValueDirective, SnyStatDescriptionDirective],
  template: `
    <div snyStat>
      <div snyStatTitle>Total Revenue</div>
      <div snyStatValue>$45,231</div>
      <div snyStatDescription [variant]="descVariant()">+20.1% from last month</div>
    </div>
  `,
})
class TestHostComponent {
  descVariant = signal<StatDescriptionVariant>('default');
}

describe('SnyStatDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TestHostComponent] }).compileComponents();
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should render stat sections', () => {
    expect(fixture.nativeElement.querySelector('[snyStat]')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('[snyStatTitle]')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('[snyStatValue]')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('[snyStatDescription]')).toBeTruthy();
  });

  it('should apply success variant to description', () => {
    fixture.componentInstance.descVariant.set('success');
    fixture.detectChanges();
    const desc = fixture.nativeElement.querySelector('[snyStatDescription]');
    expect(desc.className).toContain('text-green-600');
  });

  it('should apply error variant to description', () => {
    fixture.componentInstance.descVariant.set('error');
    fixture.detectChanges();
    const desc = fixture.nativeElement.querySelector('[snyStatDescription]');
    expect(desc.className).toContain('text-destructive');
  });

  it('should have auto-generated id on title', () => {
    const title = fixture.nativeElement.querySelector('[snyStatTitle]');
    expect(title.id).toContain('sny-stat-title-');
  });

  it('should set aria-labelledby on value pointing to title id', () => {
    const title = fixture.nativeElement.querySelector('[snyStatTitle]');
    const value = fixture.nativeElement.querySelector('[snyStatValue]');
    expect(value.getAttribute('aria-labelledby')).toBe(title.id);
  });
});
