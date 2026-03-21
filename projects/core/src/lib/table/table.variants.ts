import { cva } from 'class-variance-authority';

export const tableVariants = cva(
  'w-full caption-bottom text-sm border-collapse',
  {
    variants: {
      variant: {
        default: '',
        striped: '[&_tbody_tr:nth-child(even)]:bg-muted/50',
        bordered: 'border border-border [&_th]:border [&_th]:border-border [&_td]:border [&_td]:border-border',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export const tableCellVariants = cva(
  '',
  {
    variants: {
      density: {
        compact: 'px-2 py-1 text-xs',
        normal: 'px-4 py-3 text-sm',
        comfortable: 'px-6 py-4 text-base',
      },
    },
    defaultVariants: {
      density: 'normal',
    },
  }
);

export type TableVariant = 'default' | 'striped' | 'bordered';
export type TableDensity = 'compact' | 'normal' | 'comfortable';
