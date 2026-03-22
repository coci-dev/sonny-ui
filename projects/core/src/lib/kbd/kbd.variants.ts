import { cva } from 'class-variance-authority';

export const kbdVariants = cva(
  'pointer-events-none inline-flex select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono font-medium text-muted-foreground',
  {
    variants: {
      size: {
        sm: 'h-5 text-[10px]',
        md: 'h-6 text-xs',
        lg: 'h-7 text-sm',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export type KbdSize = 'sm' | 'md' | 'lg';
