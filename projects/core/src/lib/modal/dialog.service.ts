import { Injectable, inject, InjectionToken } from '@angular/core';
import { Dialog, DialogRef as CdkDialogRef } from '@angular/cdk/dialog';
import type { ComponentType } from '@angular/cdk/overlay';
import { SnyDialogRef } from './dialog-ref';
import { DEFAULT_DIALOG_CONFIG, type SnyDialogConfig } from './dialog.types';

export const SNY_DIALOG_DATA = new InjectionToken<unknown>('SNY_DIALOG_DATA');

@Injectable({ providedIn: 'root' })
export class SnyDialogService {
  private readonly cdkDialog = inject(Dialog);

  open<T, R = unknown>(
    component: ComponentType<T>,
    config: SnyDialogConfig = {}
  ): SnyDialogRef<R> {
    const merged = { ...DEFAULT_DIALOG_CONFIG, ...config };

    // CDK's disableClose controls both backdrop and ESC together.
    // To support independent closeOnBackdrop / closeOnEsc, we disable both
    // at the CDK level and handle them manually.
    const disableClose = !merged.closeOnBackdrop || !merged.closeOnEsc;

    const cdkRef: CdkDialogRef<R, T> = this.cdkDialog.open(component, {
      width: merged.width,
      maxWidth: merged.maxWidth,
      disableClose,
      hasBackdrop: true,
      backdropClass: 'sny-dialog-backdrop',
      panelClass: 'sny-dialog-panel',
      ariaLabelledBy: merged.ariaLabelledBy,
      ariaDescribedBy: merged.ariaDescribedBy,
      data: merged.data,
      providers: merged.data != null
        ? [{ provide: SNY_DIALOG_DATA, useValue: merged.data }]
        : [],
    });

    // When CDK disableClose is true, manually handle backdrop/ESC based on config
    if (disableClose) {
      if (merged.closeOnBackdrop) {
        const sub = cdkRef.backdropClick.subscribe(() => cdkRef.close());
        cdkRef.closed.subscribe(() => sub.unsubscribe());
      }
      if (merged.closeOnEsc) {
        const sub = cdkRef.keydownEvents.subscribe(event => {
          if (event.key === 'Escape') {
            cdkRef.close();
          }
        });
        cdkRef.closed.subscribe(() => sub.unsubscribe());
      }
    }

    return new SnyDialogRef<R>(cdkRef);
  }

  closeAll(): void {
    this.cdkDialog.closeAll();
  }
}
