import { cva } from 'class-variance-authority';

export const statusVariants = cva('inline-block rounded-full', {
  variants: {
    variant: {
      default: 'bg-primary',
      success: 'bg-green-500',
      warning: 'bg-yellow-500',
      error: 'bg-destructive',
      info: 'bg-blue-500',
      neutral: 'bg-muted-foreground',
    },
    size: {
      xs: 'h-1.5 w-1.5',
      sm: 'h-2 w-2',
      md: 'h-2.5 w-2.5',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});

export type StatusVariant = 'default' | 'success' | 'warning' | 'error' | 'info' | 'neutral';
export type StatusSize = 'xs' | 'sm' | 'md';
