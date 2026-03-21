import { cva } from 'class-variance-authority';

export const radioVariants = cva(
  'appearance-none rounded-full border border-border bg-background transition-colors checked:border-primary checked:shadow-[inset_0_0_0_3px] checked:shadow-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
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

export type RadioSize = 'sm' | 'md' | 'lg';
