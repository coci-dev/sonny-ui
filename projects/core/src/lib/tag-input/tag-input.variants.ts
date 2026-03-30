import { cva } from 'class-variance-authority';

export const tagInputContainerVariants = cva(
  'flex flex-wrap gap-1.5 border border-border rounded-md bg-background px-2 cursor-text transition-colors focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2',
  {
    variants: {
      size: {
        sm: 'min-h-[36px] py-1 text-xs',
        md: 'min-h-[40px] py-1.5 text-sm',
        lg: 'min-h-[44px] py-2 text-base',
      },
    },
    defaultVariants: { size: 'md' },
  }
);

export const tagVariants = cva(
  'inline-flex items-center gap-1 rounded-md font-medium',
  {
    variants: {
      size: {
        sm: 'px-1.5 py-0.5 text-xs',
        md: 'px-2 py-0.5 text-sm',
        lg: 'px-2.5 py-1 text-sm',
      },
    },
    defaultVariants: { size: 'md' },
  }
);

export type TagInputSize = 'sm' | 'md' | 'lg';
