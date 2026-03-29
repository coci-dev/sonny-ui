import { cva } from 'class-variance-authority';

export const otpCellVariants = cva(
  'text-center font-mono font-semibold border border-border bg-background rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      size: {
        sm: 'h-9 w-9 text-sm',
        md: 'h-11 w-11 text-lg',
        lg: 'h-14 w-14 text-2xl',
      },
    },
    defaultVariants: { size: 'md' },
  }
);

export type OtpInputSize = 'sm' | 'md' | 'lg';
export type OtpInputType = 'number' | 'alphanumeric';
