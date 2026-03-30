import { ChangeDetectionStrategy, Component, inject, input, computed } from '@angular/core';
import { SnyToastService } from './toast.service';
import { toastVariants, type ToastPosition, type ToastVariant } from './toast.variants';
import { cn } from '../core/utils/cn';

@Component({
  selector: 'sny-toaster',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="containerClass()" role="region" aria-label="Notifications" tabindex="-1">
      @for (toast of visibleToasts(); track toast.id) {
        <div
          [class]="toastClasses[toast.variant ?? 'default']"
          role="alert"
          aria-live="polite"
          aria-atomic="true"
        >
          <div class="grid gap-1">
            <div class="text-sm font-semibold">{{ toast.title }}</div>
            @if (toast.description) {
              <div class="text-sm opacity-90">{{ toast.description }}</div>
            }
          </div>
          <div class="flex items-center gap-2">
            @if (toast.action) {
              <button
                class="inline-flex h-8 shrink-0 items-center justify-center rounded-sm border bg-transparent px-3 text-sm font-medium transition-colors hover:bg-secondary"
                (click)="toast.action!.onClick()"
              >
                {{ toast.action!.label }}
              </button>
            }
            <button
              class="absolute right-2 top-2 rounded-sm p-1 opacity-0 transition-opacity hover:opacity-100 group-hover:opacity-100 focus:opacity-100"
              aria-label="Close"
              (click)="dismiss(toast.id)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          </div>
        </div>
      }
    </div>
  `,
})
export class SnyToasterComponent {
  private readonly toastService = inject(SnyToastService);

  readonly position = input<ToastPosition>('bottom-right');
  readonly maxToasts = input(5);

  readonly visibleToasts = computed(() =>
    this.toastService.toasts().slice(-this.maxToasts())
  );

  readonly containerClass = computed(() => {
    const pos = this.position();
    const base = 'fixed z-[100] flex max-h-screen w-full flex-col-reverse gap-2 p-4 sm:max-w-[420px]';
    const posMap: Record<ToastPosition, string> = {
      'top-right': 'top-0 right-0',
      'top-left': 'top-0 left-0',
      'bottom-right': 'bottom-0 right-0',
      'bottom-left': 'bottom-0 left-0',
      'top-center': 'top-0 left-1/2 -translate-x-1/2',
      'bottom-center': 'bottom-0 left-1/2 -translate-x-1/2',
    };
    return cn(base, posMap[pos]);
  });

  /** Pre-computed toast classes by variant — avoids method calls in the template. */
  readonly toastClasses: Record<ToastVariant, string> = {
    default: cn(toastVariants({ variant: 'default' })),
    destructive: cn(toastVariants({ variant: 'destructive' })),
    success: cn(toastVariants({ variant: 'success' })),
    warning: cn(toastVariants({ variant: 'warning' })),
  };

  dismiss(id: string): void {
    this.toastService.dismiss(id);
  }
}
