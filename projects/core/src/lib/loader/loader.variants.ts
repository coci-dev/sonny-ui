import { cva } from 'class-variance-authority';

export const loaderVariants = cva(
  'inline-flex items-center justify-center text-current',
  {
    variants: {
      size: {
        sm: 'h-4 w-4',
        md: 'h-6 w-6',
        lg: 'h-8 w-8',
        xl: 'h-12 w-12',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export type LoaderSize = 'sm' | 'md' | 'lg' | 'xl';
export type LoaderVariant = 'spinner' | 'dots' | 'bars';
