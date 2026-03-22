import {
  Directive,
  ElementRef,
  OnDestroy,
  Renderer2,
  computed,
  inject,
  input,
  signal,
  afterNextRender,
} from '@angular/core';
import { cn } from '../core/utils/cn';
import { tooltipVariants, type TooltipPosition } from './tooltip.variants';

let tooltipIdCounter = 0;

@Directive({
  selector: '[snyTooltip]',
  standalone: true,
  exportAs: 'snyTooltip',
  host: {
    '(mouseenter)': 'show()',
    '(mouseleave)': 'hide()',
    '(focus)': 'show()',
    '(blur)': 'hide()',
    '(keydown.escape)': 'hide()',
    '[attr.aria-describedby]': 'isOpen() ? tooltipId : null',
  },
})
export class SnyTooltipDirective implements OnDestroy {
  readonly snyTooltip = input.required<string>();
  readonly tooltipPosition = input<TooltipPosition>('top');
  readonly tooltipDelay = input(300);
  readonly tooltipDisabled = input(false);
  readonly class = input<string>('');

  readonly isOpen = signal(false);
  readonly tooltipId = `sny-tooltip-${++tooltipIdCounter}`;

  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);
  private showTimeout: ReturnType<typeof setTimeout> | null = null;
  private tooltipEl: HTMLElement | null = null;

  constructor() {
    afterNextRender(() => {
      // cleanup handled in ngOnDestroy
    });
  }

  show(): void {
    if (this.tooltipDisabled()) return;
    this.showTimeout = setTimeout(() => {
      this.createTooltip();
      this.isOpen.set(true);
    }, this.tooltipDelay());
  }

  hide(): void {
    if (this.showTimeout) {
      clearTimeout(this.showTimeout);
      this.showTimeout = null;
    }
    this.destroyTooltip();
    this.isOpen.set(false);
  }

  ngOnDestroy(): void {
    this.hide();
  }

  private createTooltip(): void {
    if (this.tooltipEl) return;

    const tooltip = this.renderer.createElement('div') as HTMLElement;
    tooltip.id = this.tooltipId;
    tooltip.setAttribute('role', 'tooltip');
    tooltip.className = cn(
      tooltipVariants({ position: this.tooltipPosition() }),
      'fixed pointer-events-none',
      this.class()
    );
    tooltip.textContent = this.snyTooltip();

    this.renderer.appendChild(document.body, tooltip);
    this.tooltipEl = tooltip;

    this.positionTooltip();
  }

  private positionTooltip(): void {
    if (!this.tooltipEl) return;

    const hostRect = this.el.nativeElement.getBoundingClientRect();
    const tooltipRect = this.tooltipEl.getBoundingClientRect();
    const position = this.tooltipPosition();
    const gap = 8;

    let top = 0;
    let left = 0;

    switch (position) {
      case 'top':
        top = hostRect.top - tooltipRect.height - gap;
        left = hostRect.left + (hostRect.width - tooltipRect.width) / 2;
        break;
      case 'bottom':
        top = hostRect.bottom + gap;
        left = hostRect.left + (hostRect.width - tooltipRect.width) / 2;
        break;
      case 'left':
        top = hostRect.top + (hostRect.height - tooltipRect.height) / 2;
        left = hostRect.left - tooltipRect.width - gap;
        break;
      case 'right':
        top = hostRect.top + (hostRect.height - tooltipRect.height) / 2;
        left = hostRect.right + gap;
        break;
    }

    this.tooltipEl.style.top = `${top}px`;
    this.tooltipEl.style.left = `${left}px`;
  }

  private destroyTooltip(): void {
    if (this.tooltipEl) {
      this.tooltipEl.remove();
      this.tooltipEl = null;
    }
  }
}
