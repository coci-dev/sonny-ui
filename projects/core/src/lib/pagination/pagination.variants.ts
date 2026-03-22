import { cva } from 'class-variance-authority';

export const paginationItemVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-background hover:bg-accent hover:text-accent-foreground',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        sm: 'h-8 w-8 text-xs',
        md: 'h-9 w-9',
        lg: 'h-10 w-10',
      },
      active: {
        true: 'bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      active: false,
    },
  }
);

export type PaginationVariant = 'default' | 'outline' | 'ghost';
export type PaginationSize = 'sm' | 'md' | 'lg';
