import { cva } from 'class-variance-authority';

export const comboboxTriggerVariants = cva(
  'inline-flex w-full items-center justify-between whitespace-nowrap rounded-sm border border-border bg-background px-3 py-2 text-sm ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      size: {
        sm: 'h-9 text-xs',
        md: 'h-10 text-sm',
        lg: 'h-11 text-base',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export type ComboboxSize = 'sm' | 'md' | 'lg';
