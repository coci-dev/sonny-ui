import { Injectable, inject } from '@angular/core';
import { SnyDialogService } from '../modal/dialog.service';
import type { SnyDialogRef } from '../modal/dialog-ref';
import { SnyCommandPaletteComponent } from './command-palette.component';
import type { CommandPaletteConfig } from './command-palette.types';

@Injectable({ providedIn: 'root' })
export class SnyCommandPaletteService {
  private readonly dialogService = inject(SnyDialogService);
  private isOpen = false;

  open(config: CommandPaletteConfig): SnyDialogRef<void> | null {
    if (this.isOpen) return null;
    this.isOpen = true;

    const ref = this.dialogService.open<SnyCommandPaletteComponent, void>(
      SnyCommandPaletteComponent,
      {
        width: config.width ?? '32rem',
        data: config,
      }
    );

    ref.closed.subscribe(() => {
      this.isOpen = false;
    });

    return ref;
  }

  close(): void {
    if (this.isOpen) {
      this.dialogService.closeAll();
    }
  }
}
