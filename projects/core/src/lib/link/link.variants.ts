import { cva } from 'class-variance-authority';

export const linkVariants = cva(
  'inline-flex items-center gap-1 underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded',
  {
    variants: {
      variant: {
        default: 'text-foreground underline hover:text-foreground/80',
        primary: 'text-primary underline hover:text-primary/80',
        secondary: 'text-muted-foreground underline hover:text-foreground',
        hover: 'text-foreground no-underline hover:underline',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export type LinkVariant = 'default' | 'primary' | 'secondary' | 'hover';
