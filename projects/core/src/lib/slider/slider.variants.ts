import { cva } from 'class-variance-authority';

export const sliderTrackVariants = cva(
  'relative w-full rounded-full bg-secondary cursor-pointer',
  {
    variants: {
      size: {
        sm: 'h-1.5',
        md: 'h-2',
        lg: 'h-3',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export const sliderThumbSize: Record<string, string> = {
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
};

export type SliderSize = 'sm' | 'md' | 'lg';
