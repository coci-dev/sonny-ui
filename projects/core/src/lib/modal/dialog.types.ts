export interface SnyDialogConfig {
  width?: string;
  maxWidth?: string;
  closeOnBackdrop?: boolean;
  closeOnEsc?: boolean;
  data?: unknown;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
}

export const DEFAULT_DIALOG_CONFIG: SnyDialogConfig = {
  width: '28rem',
  maxWidth: '90vw',
  closeOnBackdrop: true,
  closeOnEsc: true,
};
