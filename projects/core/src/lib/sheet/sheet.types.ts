export type SheetSide = 'left' | 'right' | 'top' | 'bottom';

export interface SnySheetConfig {
  side?: SheetSide;
  closeOnBackdrop?: boolean;
  closeOnEsc?: boolean;
  data?: unknown;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
}

export const DEFAULT_SHEET_CONFIG: SnySheetConfig = {
  side: 'right',
  closeOnBackdrop: true,
  closeOnEsc: true,
};

export const SHEET_PANEL_CLASS: Record<SheetSide, string> = {
  right: 'sny-sheet-right',
  left: 'sny-sheet-left',
  top: 'sny-sheet-top',
  bottom: 'sny-sheet-bottom',
};
