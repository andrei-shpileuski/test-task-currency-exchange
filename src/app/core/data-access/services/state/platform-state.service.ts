import { Injectable } from '@angular/core';
import { BaseStateService } from '@core/data-access/services/state/base-state.service';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class PlatformStateService extends BaseStateService<
  'browser' | 'server'
> {
  public isBrowser$ = this.value$.pipe(map((value) => value === 'browser'));
  public isBrowser = toSignal(this.isBrowser$, { requireSync: true });
}
