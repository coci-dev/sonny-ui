import { cva } from 'class-variance-authority';

export const progressTrackVariants = cva(
  'relative w-full overflow-hidden rounded-full bg-secondary',
  {
    variants: {
      size: {
        sm: 'h-1.5',
        md: 'h-2.5',
        lg: 'h-4',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export const progressBarVariants = cva(
  'h-full rounded-full transition-all duration-300 ease-in-out',
  {
    variants: {
      variant: {
        default: 'bg-primary',
        success: 'bg-green-600 dark:bg-green-500',
        warning: 'bg-yellow-500 dark:bg-yellow-400',
        error: 'bg-destructive',
        info: 'bg-blue-600 dark:bg-blue-500',
      },
      indeterminate: {
        true: 'animate-progress-indeterminate w-1/3',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      indeterminate: false,
    },
  }
);

export type ProgressVariant = 'default' | 'success' | 'warning' | 'error' | 'info';
export type ProgressSize = 'sm' | 'md' | 'lg';
