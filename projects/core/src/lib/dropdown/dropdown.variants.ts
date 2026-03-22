import { cva } from 'class-variance-authority';

export const dropdownContentVariants = cva(
  'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md',
  {
    variants: {},
    defaultVariants: {},
  }
);

export const dropdownItemVariants = cva(
  'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors data-[active]:bg-accent data-[active]:text-accent-foreground',
  {
    variants: {
      variant: {
        default: '',
        destructive:
          'text-destructive data-[active]:bg-destructive/10 data-[active]:text-destructive',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export type DropdownItemVariant = 'default' | 'destructive';
