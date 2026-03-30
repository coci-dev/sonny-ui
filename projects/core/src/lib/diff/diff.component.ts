import { ChangeDetectionStrategy, Component, computed, input, model, signal } from '@angular/core';
import { cn } from '../core/utils/cn';

@Component({
  selector: 'sny-diff',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': '"relative overflow-hidden select-none w-full"',
    '(pointerdown)': 'onPointerDown($event)',
    '(pointermove)': 'onPointerMove($event)',
    '(pointerup)': 'onPointerUp()',
    '(keydown)': 'onKeydown($event)',
  },
  template: `
    <div class="relative w-full" [style.aspect-ratio]="'16/9'">
      <div class="absolute inset-0">
        <ng-content select="[snyDiffAfter]" />
      </div>
      <div class="absolute inset-0 overflow-hidden" [style.width.%]="value()">
        <ng-content select="[snyDiffBefore]" />
      </div>
      <div
        class="absolute top-0 bottom-0 w-1 bg-foreground cursor-col-resize z-10"
        [style.left.%]="value()"
        role="slider"
        tabindex="0"
        [attr.aria-valuenow]="value()"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-label="Comparison slider"
      >
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-foreground/80 flex items-center justify-center text-background text-xs">
          ⇔
        </div>
      </div>
    </div>
  `,
})
export class SnyDiffComponent {
  readonly value = model(50);
  readonly orientation = input<'horizontal' | 'vertical'>('horizontal');
  readonly class = input<string>('');

  readonly isDragging = signal(false);

  onPointerDown(event: PointerEvent): void {
    this.isDragging.set(true);
    (event.target as HTMLElement).setPointerCapture?.(event.pointerId);
    this.updateValue(event);
  }

  onPointerMove(event: PointerEvent): void {
    if (!this.isDragging()) return;
    this.updateValue(event);
  }

  onPointerUp(): void {
    this.isDragging.set(false);
  }

  onKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        this.value.update((v) => Math.max(0, v - 5));
        break;
      case 'ArrowRight':
        event.preventDefault();
        this.value.update((v) => Math.min(100, v + 5));
        break;
    }
  }

  private updateValue(event: PointerEvent): void {
    const target = (event.currentTarget as HTMLElement).closest('sny-diff');
    if (!target) return;
    const rect = target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    this.value.set(Math.round(pct));
  }
}
