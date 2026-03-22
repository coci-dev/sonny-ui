import { cva } from 'class-variance-authority';

export const textareaVariants = cva(
  'flex w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border-input',
        error:
          'border-destructive focus-visible:ring-destructive text-destructive placeholder:text-destructive/60',
      },
      textareaSize: {
        sm: 'min-h-[60px] text-xs',
        md: 'min-h-[80px] text-sm',
        lg: 'min-h-[120px] text-base',
      },
      resize: {
        none: 'resize-none',
        vertical: 'resize-y',
        horizontal: 'resize-x',
        both: 'resize',
      },
    },
    defaultVariants: {
      variant: 'default',
      textareaSize: 'md',
      resize: 'vertical',
    },
  }
);

export type TextareaVariant = 'default' | 'error';
export type TextareaSize = 'sm' | 'md' | 'lg';
export type TextareaResize = 'none' | 'vertical' | 'horizontal' | 'both';
