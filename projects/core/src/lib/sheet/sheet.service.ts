import { Injectable, inject, InjectionToken, Injector } from '@angular/core';
import { Dialog, DialogRef as CdkDialogRef } from '@angular/cdk/dialog';
import { type ComponentType, createGlobalPositionStrategy, type GlobalPositionStrategy } from '@angular/cdk/overlay';
import { SnySheetRef } from './sheet-ref';
import { DEFAULT_SHEET_CONFIG, SHEET_PANEL_CLASS, type SheetSide, type SnySheetConfig } from './sheet.types';

export const SNY_SHEET_DATA = new InjectionToken<unknown>('SNY_SHEET_DATA');

interface SheetOverlayConfig {
  positionStrategy: GlobalPositionStrategy;
  width?: string;
  maxWidth?: string;
  height?: string;
  maxHeight?: string;
}

@Injectable({ providedIn: 'root' })
export class SnySheetService {
  private readonly cdkDialog = inject(Dialog);
  private readonly injector = inject(Injector);

  open<T, R = unknown>(component: ComponentType<T>, config: SnySheetConfig = {}): SnySheetRef<R> {
    const merged = { ...DEFAULT_SHEET_CONFIG, ...config };
    const side = merged.side ?? 'right';
    const disableClose = !merged.closeOnBackdrop || !merged.closeOnEsc;
    const overlay = this._getOverlayConfig(side);

    const cdkRef: CdkDialogRef<R, T> = this.cdkDialog.open(component, {
      disableClose,
      hasBackdrop: true,
      backdropClass: 'sny-dialog-backdrop',
      panelClass: ['sny-sheet-panel', SHEET_PANEL_CLASS[side]],
      positionStrategy: overlay.positionStrategy,
      width: overlay.width,
      maxWidth: overlay.maxWidth,
      height: overlay.height,
      maxHeight: overlay.maxHeight,
      ariaLabelledBy: merged.ariaLabelledBy,
      ariaDescribedBy: merged.ariaDescribedBy,
      data: merged.data,
      providers: merged.data != null
        ? [{ provide: SNY_SHEET_DATA, useValue: merged.data }]
        : [],
    });

    if (disableClose) {
      if (merged.closeOnBackdrop) {
        const sub = cdkRef.backdropClick.subscribe(() => cdkRef.close());
        cdkRef.closed.subscribe(() => sub.unsubscribe());
      }
      if (merged.closeOnEsc) {
        const sub = cdkRef.keydownEvents.subscribe(event => {
          if (event.key === 'Escape') cdkRef.close();
        });
        cdkRef.closed.subscribe(() => sub.unsubscribe());
      }
    }

    return new SnySheetRef<R>(cdkRef);
  }

  closeAll(): void {
    this.cdkDialog.closeAll();
  }

  private _getOverlayConfig(side: SheetSide): SheetOverlayConfig {
    const strategy = createGlobalPositionStrategy(this.injector);

    switch (side) {
      case 'right':
        return {
          positionStrategy: strategy.top('0').right('0'),
          width: '75%',
          maxWidth: '24rem',
          height: '100vh',
          maxHeight: '100vh',
        };
      case 'left':
        return {
          positionStrategy: strategy.top('0').left('0'),
          width: '75%',
          maxWidth: '24rem',
          height: '100vh',
          maxHeight: '100vh',
        };
      case 'top':
        return {
          positionStrategy: strategy.top('0').centerHorizontally(),
          width: '100vw',
          maxWidth: '100vw',
        };
      case 'bottom':
        return {
          positionStrategy: strategy.bottom('0').centerHorizontally(),
          width: '100vw',
          maxWidth: '100vw',
        };
    }
  }
}
