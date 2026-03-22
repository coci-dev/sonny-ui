import { cva } from 'class-variance-authority';

export const tooltipVariants = cva(
  'z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95',
  {
    variants: {
      position: {
        top: 'slide-in-from-bottom-2',
        bottom: 'slide-in-from-top-2',
        left: 'slide-in-from-right-2',
        right: 'slide-in-from-left-2',
      },
    },
    defaultVariants: {
      position: 'top',
    },
  }
);

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';
