import { cva } from 'class-variance-authority';

export type SidebarSide = 'left' | 'right';

export const sidebarVariants = cva(
  'flex flex-col h-full bg-background border-border transition-all duration-300 ease-in-out overflow-hidden',
  {
    variants: {
      side: {
        left: 'border-r',
        right: 'border-l',
      },
    },
    defaultVariants: { side: 'left' },
  }
);

export const sidebarItemVariants = cva(
  'flex items-center gap-3 rounded-md text-sm transition-colors cursor-pointer w-full',
  {
    variants: {
      active: {
        true: 'bg-accent text-accent-foreground font-medium',
        false: 'hover:bg-accent/50 hover:text-accent-foreground text-foreground',
      },
      collapsed: {
        true: 'justify-center px-2 py-2',
        false: 'px-3 py-2',
      },
    },
    defaultVariants: { active: false, collapsed: false },
  }
);
