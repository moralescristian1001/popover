
import { OverlayRef } from '@angular/cdk/overlay';

import { Subject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

export class DialogRef<T, R = any> {
  private readonly onCloseSubject = new Subject<R>();

  onClose: Observable<R> = this.onCloseSubject.asObservable();

  componentInstance: T;

  constructor(private overlayRef: OverlayRef) {
    overlayRef.keydownEvents()
      .pipe(filter(event => event.code === 'Escape'))
      .subscribe(() => this.close());
    overlayRef.backdropClick().subscribe(() => this.close());
  }

  close(dialogResult?: R): void {
    this.onCloseSubject.next(dialogResult);
    this.overlayRef.dispose();
  }
}
