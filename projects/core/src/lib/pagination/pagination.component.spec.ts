import { Component, signal } from '@angular/core';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { SnyPaginationComponent } from './pagination.component';

@Component({
  standalone: true,
  imports: [SnyPaginationComponent],
  template: `<sny-pagination [(currentPage)]="currentPage" [totalPages]="totalPages()" />`,
})
class TestHostComponent {
  currentPage = signal(1);
  totalPages = signal(10);
}

describe('SnyPaginationComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TestHostComponent] }).compileComponents();
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    host = fixture.nativeElement.querySelector('sny-pagination');
  });

  it('should render with navigation role', () => {
    expect(host.getAttribute('role')).toBe('navigation');
  });

  it('should render page buttons', () => {
    const buttons = host.querySelectorAll('button');
    expect(buttons.length).toBeGreaterThan(2); // at least prev + page + next
  });

  it('should mark current page with aria-current', () => {
    const currentBtn = host.querySelector('[aria-current="page"]');
    expect(currentBtn).toBeTruthy();
    expect(currentBtn!.textContent?.trim()).toBe('1');
  });

  it('should navigate to next page', () => {
    const nextBtn = host.querySelector('[aria-label="Go to next page"]') as HTMLButtonElement;
    nextBtn.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.currentPage()).toBe(2);
  });

  it('should disable prev on first page', () => {
    const prevBtn = host.querySelector('[aria-label="Go to previous page"]') as HTMLButtonElement;
    expect(prevBtn.disabled).toBe(true);
  });

  it('should disable next on last page', () => {
    fixture.componentInstance.currentPage.set(10);
    fixture.detectChanges();
    const nextBtn = host.querySelector('[aria-label="Go to next page"]') as HTMLButtonElement;
    expect(nextBtn.disabled).toBe(true);
  });
});
