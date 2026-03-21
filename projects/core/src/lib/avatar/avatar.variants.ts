import { cva } from 'class-variance-authority';

export const avatarVariants = cva(
  'relative inline-flex shrink-0 items-center justify-center overflow-hidden bg-muted',
  {
    variants: {
      size: {
        sm: 'h-8 w-8 text-xs',
        md: 'h-10 w-10 text-sm',
        lg: 'h-12 w-12 text-base',
        xl: 'h-16 w-16 text-lg',
      },
      variant: {
        circle: 'rounded-full',
        rounded: 'rounded-md',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'circle',
    },
  }
);

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';
export type AvatarVariant = 'circle' | 'rounded';
