import { cva } from 'class-variance-authority';

export const alertVariants = cva(
  'relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground',
  {
    variants: {
      variant: {
        default:
          'bg-background text-foreground border-border',
        destructive:
          'border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive bg-destructive/10',
        success:
          'border-green-500/50 text-green-700 dark:text-green-400 dark:border-green-500 [&>svg]:text-green-600 bg-green-50 dark:bg-green-950/30',
        warning:
          'border-yellow-500/50 text-yellow-700 dark:text-yellow-400 dark:border-yellow-500 [&>svg]:text-yellow-600 bg-yellow-50 dark:bg-yellow-950/30',
        info: 'border-blue-500/50 text-blue-700 dark:text-blue-400 dark:border-blue-500 [&>svg]:text-blue-600 bg-blue-50 dark:bg-blue-950/30',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export type AlertVariant = 'default' | 'destructive' | 'success' | 'warning' | 'info';
