import { cva } from 'class-variance-authority';

export const cardVariants = cva(
  'rounded-sm text-card-foreground',
  {
    variants: {
      variant: {
        default: 'bg-card border border-border',
        outline: 'border-2 border-border bg-transparent',
        elevated: 'bg-card shadow-lg',
        ghost: 'bg-transparent',
      },
      padding: {
        none: '',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'none',
    },
  }
);

export type CardVariant = 'default' | 'outline' | 'elevated' | 'ghost';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';
