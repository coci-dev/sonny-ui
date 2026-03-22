import { cva } from 'class-variance-authority';

export const ratingVariants = cva(
  'inline-flex items-center gap-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded',
  {
    variants: {
      size: {
        sm: '[&_svg]:w-4 [&_svg]:h-4',
        md: '[&_svg]:w-5 [&_svg]:h-5',
        lg: '[&_svg]:w-7 [&_svg]:h-7',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export type RatingSize = 'sm' | 'md' | 'lg';
export type RatingVariant = 'star' | 'heart';
