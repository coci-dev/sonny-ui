import { cva } from 'class-variance-authority';

export const buttonGroupVariants = cva(
  'inline-flex [&>*:not(:first-child):not(:last-child)]:rounded-none [&>*:first-child:not(:last-child)]:rounded-r-none [&>*:last-child:not(:first-child)]:rounded-l-none [&>*:not(:first-child)]:-ml-px',
  {
    variants: {
      orientation: {
        horizontal: 'flex-row',
        vertical: 'flex-col [&>*:not(:first-child):not(:last-child)]:rounded-none [&>*:first-child:not(:last-child)]:rounded-b-none [&>*:first-child:not(:last-child)]:rounded-r-sm [&>*:last-child:not(:first-child)]:rounded-t-none [&>*:last-child:not(:first-child)]:rounded-l-sm [&>*:not(:first-child)]:-mt-px [&>*:not(:first-child)]:ml-0',
      },
    },
    defaultVariants: {
      orientation: 'horizontal',
    },
  }
);

export type ButtonGroupOrientation = 'horizontal' | 'vertical';
