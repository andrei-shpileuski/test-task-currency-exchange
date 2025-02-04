import { Injectable } from '@angular/core';
import { BaseStateService } from '@core/data-access/services/state/base-state.service';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class RequestTrackerStateService extends BaseStateService<number> {
  public isInProgress$ = this.value$.pipe(map((value) => !!value));
  public isInProgress = toSignal(this.isInProgress$, { initialValue: false });

  public requestSent(): void {
    this._value$.next((this._value$.value || 0) + 1);
  }

  public requestDone(): void {
    this._value$.next((this._value$.value || 0) - 1);
  }
}
