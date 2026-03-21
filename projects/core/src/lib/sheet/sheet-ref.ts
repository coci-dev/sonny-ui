import type { Observable } from 'rxjs';

interface CdkDialogRefLike<R> {
  close(result?: R): void;
  readonly closed: Observable<R | undefined>;
}

export class SnySheetRef<R = unknown> {
  constructor(private readonly cdkRef: CdkDialogRefLike<R>) {}

  close(result?: R): void {
    this.cdkRef.close(result);
  }

  get closed(): Observable<R | undefined> {
    return this.cdkRef.closed;
  }
}
