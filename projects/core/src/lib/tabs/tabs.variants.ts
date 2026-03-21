import { cva } from 'class-variance-authority';

export const tabsListVariants = cva(
  'inline-flex h-10 items-center justify-center rounded-sm bg-muted p-1 text-muted-foreground',
  {
    variants: {},
    defaultVariants: {},
  }
);

export const tabsTriggerVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {},
    defaultVariants: {},
  }
);
