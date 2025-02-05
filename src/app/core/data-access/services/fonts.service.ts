import { inject, Injectable } from '@angular/core';
import { filter, from, map, Observable, switchMap, take } from 'rxjs';
import { platformStore } from '@core/data-access/state/core/platform.store';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class FontsService {
  private readonly _isBrowser$ = toObservable(inject(platformStore).isBrowser);

  public fontsLoaded$: Observable<boolean> = this._isBrowser$.pipe(
    filter(Boolean),
    switchMap(() =>
      from(document.fonts.ready).pipe(filter(Boolean), map(Boolean)),
    ),
    take(1),
  );
}
