import { inject, Injectable } from '@angular/core';
import { filter, from, map, Observable, switchMap, take } from 'rxjs';
import { PlatformStateService } from '@core/data-access/services/state/platform-state.service';

@Injectable({
  providedIn: 'root',
})
export class FontsService {
  private readonly _platformStateService = inject(PlatformStateService);

  public fontsLoaded$: Observable<boolean> =
    this._platformStateService.isBrowser$.pipe(
      filter(Boolean),
      switchMap(() =>
        from(document.fonts.ready).pipe(filter(Boolean), map(Boolean)),
      ),
      take(1),
    );
}
