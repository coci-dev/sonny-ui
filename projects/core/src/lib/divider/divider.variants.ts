import { cva } from 'class-variance-authority';

export const dividerVariants = cva('shrink-0 bg-border', {
  variants: {
    orientation: {
      horizontal: 'h-[1px] w-full',
      vertical: 'h-full w-[1px]',
    },
    variant: {
      solid: '',
      dashed: 'border-dashed',
      dotted: 'border-dotted',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
    variant: 'solid',
  },
});

export type DividerOrientation = 'horizontal' | 'vertical';
export type DividerVariant = 'solid' | 'dashed' | 'dotted';
