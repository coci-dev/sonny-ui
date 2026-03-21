import { cva } from 'class-variance-authority';

export const skeletonVariants = cva(
  'animate-pulse bg-muted block',
  {
    variants: {
      variant: {
        line: 'rounded-sm',
        circular: 'rounded-full aspect-square',
        rounded: 'rounded-lg',
      },
      size: {
        sm: 'h-4',
        md: 'h-6',
        lg: 'h-8',
        xl: 'h-12',
      },
    },
    defaultVariants: {
      variant: 'line',
      size: 'md',
    },
  }
);

export type SkeletonVariant = 'line' | 'circular' | 'rounded';
export type SkeletonSize = 'sm' | 'md' | 'lg' | 'xl';
