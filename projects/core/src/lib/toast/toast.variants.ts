import { cva } from 'class-variance-authority';

export const toastVariants = cva(
  'group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-sm border p-6 pr-8 shadow-lg transition-all',
  {
    variants: {
      variant: {
        default: 'bg-background border-border text-foreground',
        destructive: 'bg-destructive border-destructive text-destructive-foreground',
        success: 'bg-green-600 border-green-600 text-white',
        warning: 'bg-yellow-500 border-yellow-500 text-white',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export type ToastVariant = 'default' | 'destructive' | 'success' | 'warning';
export type ToastPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';

export interface ToastAction {
  label: string;
  onClick: () => void;
}

export interface ToastConfig {
  title: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
  action?: ToastAction;
}

export interface ToastData extends ToastConfig {
  id: string;
}
