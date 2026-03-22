import { cva } from 'class-variance-authority';

export const fieldsetVariants = cva('space-y-4', {
  variants: {
    variant: {
      default: '',
      bordered: 'rounded-lg border border-border p-4',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export type FieldsetVariant = 'default' | 'bordered';
