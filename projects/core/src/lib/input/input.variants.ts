import { cva } from 'class-variance-authority';

export const inputVariants = cva(
  'flex w-full rounded-sm border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border-input',
        error: 'border-destructive focus-visible:ring-destructive',
        success: 'border-green-500 focus-visible:ring-green-500',
      },
      inputSize: {
        sm: 'h-9 text-xs',
        md: 'h-10',
        lg: 'h-11 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      inputSize: 'md',
    },
  }
);

export const labelVariants = cva(
  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
  {
    variants: {
      variant: {
        default: '',
        error: 'text-destructive',
        success: 'text-green-600',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export type InputVariant = 'default' | 'error' | 'success';
export type InputSize = 'sm' | 'md' | 'lg';
