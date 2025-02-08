import { inject, Injectable } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { platformStore } from '@core/data-access/state/platform.store';
import { filter, from, map, Observable, switchMap, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FontsManagerService {
  private readonly _isBrowser$ = toObservable(inject(platformStore).isBrowser);

  public fontsLoaded$: Observable<boolean> = this._isBrowser$.pipe(
    filter(Boolean),
    switchMap(() =>
      from(document.fonts.ready).pipe(filter(Boolean), map(Boolean)),
    ),
    take(1),
  );
}
