import { ChangeDetectionStrategy, Component, computed, input, model } from '@angular/core';
import { cn } from '../core/utils/cn';
import {
  paginationItemVariants,
  type PaginationVariant,
  type PaginationSize,
} from './pagination.variants';

function computePageRange(
  totalPages: number,
  currentPage: number,
  siblingCount: number,
  boundaryCount: number
): (number | 'ellipsis')[] {
  const range = (start: number, end: number) =>
    Array.from({ length: end - start + 1 }, (_, i) => start + i);

  const startPages = range(1, Math.min(boundaryCount, totalPages));
  const endPages = range(Math.max(totalPages - boundaryCount + 1, boundaryCount + 1), totalPages);

  const siblingsStart = Math.max(
    Math.min(currentPage - siblingCount, totalPages - boundaryCount - siblingCount * 2 - 1),
    boundaryCount + 2
  );
  const siblingsEnd = Math.min(
    Math.max(currentPage + siblingCount, boundaryCount + siblingCount * 2 + 2),
    endPages.length > 0 ? endPages[0] - 2 : totalPages - 1
  );

  const result: (number | 'ellipsis')[] = [...startPages];

  if (siblingsStart > boundaryCount + 2) {
    result.push('ellipsis');
  } else if (boundaryCount + 1 < totalPages - boundaryCount) {
    result.push(boundaryCount + 1);
  }

  result.push(...range(siblingsStart, siblingsEnd));

  if (siblingsEnd < totalPages - boundaryCount - 1) {
    result.push('ellipsis');
  } else if (totalPages - boundaryCount > boundaryCount) {
    result.push(totalPages - boundaryCount);
  }

  result.push(...endPages);

  return [...new Set(result)].sort((a, b) => {
    if (a === 'ellipsis') return 0;
    if (b === 'ellipsis') return 0;
    return a - b;
  });
}

@Component({
  selector: 'sny-pagination',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'role': 'navigation',
    'aria-label': 'Pagination',
  },
  template: `
    <div class="flex items-center gap-1">
      <button
        [class]="navBtnClass()"
        [disabled]="!hasPrev()"
        [attr.aria-label]="'Go to previous page'"
        (click)="prev()"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
      </button>

      @for (page of pages(); track $index) {
        @if (page === 'ellipsis') {
          <span class="flex h-9 w-9 items-center justify-center" aria-hidden="true">...</span>
        } @else {
          <button
            [class]="pageClass(page)"
            [attr.aria-label]="'Page ' + page"
            [attr.aria-current]="page === currentPage() ? 'page' : null"
            (click)="goToPage(page)"
          >
            {{ page }}
          </button>
        }
      }

      <button
        [class]="navBtnClass()"
        [disabled]="!hasNext()"
        [attr.aria-label]="'Go to next page'"
        (click)="next()"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
      </button>
    </div>
  `,
})
export class SnyPaginationComponent {
  readonly currentPage = model(1);
  readonly totalPages = input.required<number>();
  readonly siblingCount = input(1);
  readonly boundaryCount = input(1);
  readonly size = input<PaginationSize>('md');
  readonly variant = input<PaginationVariant>('default');
  readonly class = input<string>('');

  readonly pages = computed(() =>
    computePageRange(this.totalPages(), this.currentPage(), this.siblingCount(), this.boundaryCount())
  );

  readonly hasPrev = computed(() => this.currentPage() > 1);
  readonly hasNext = computed(() => this.currentPage() < this.totalPages());

  goToPage(page: number | 'ellipsis'): void {
    if (page === 'ellipsis') return;
    this.currentPage.set(page);
  }

  prev(): void {
    if (this.hasPrev()) this.currentPage.update((p) => p - 1);
  }

  next(): void {
    if (this.hasNext()) this.currentPage.update((p) => p + 1);
  }

  pageClass(page: number): string {
    return cn(
      paginationItemVariants({
        variant: this.variant(),
        size: this.size(),
        active: page === this.currentPage(),
      })
    );
  }

  navBtnClass(): string {
    return cn(
      paginationItemVariants({ variant: this.variant(), size: this.size(), active: false })
    );
  }
}
