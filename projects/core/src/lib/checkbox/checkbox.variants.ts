import { cva } from 'class-variance-authority';

export const checkboxVariants = cva(
  'peer appearance-none shrink-0 rounded-sm border border-border bg-background transition-colors checked:bg-primary checked:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      size: {
        sm: 'h-3.5 w-3.5',
        md: 'h-4 w-4',
        lg: 'h-5 w-5',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export type CheckboxSize = 'sm' | 'md' | 'lg';
