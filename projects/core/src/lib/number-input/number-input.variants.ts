import { cva } from 'class-variance-authority';

export const numberInputVariants = cva(
  'inline-flex items-center border border-border rounded-md bg-background transition-colors focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2',
  {
    variants: {
      size: {
        sm: 'h-9 text-xs',
        md: 'h-10 text-sm',
        lg: 'h-11 text-base',
      },
    },
    defaultVariants: { size: 'md' },
  }
);

export type NumberInputSize = 'sm' | 'md' | 'lg';
