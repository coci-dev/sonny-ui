import { cva } from 'class-variance-authority';

export const toggleVariants = cva(
  'inline-flex items-center justify-center rounded-sm text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-transparent hover:bg-muted hover:text-muted-foreground',
        outline: 'border border-border bg-transparent hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        sm: 'h-9 px-2.5',
        md: 'h-10 px-3',
        lg: 'h-11 px-5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export type ToggleVariant = 'default' | 'outline';
export type ToggleSize = 'sm' | 'md' | 'lg';
