import { inject, Injectable } from '@angular/core';
import { filter, from, switchMap, take } from 'rxjs';
import { FontsLoadedStateService } from '@core/data-access/services/state/fonts-loaded-state.service';
import { PlatformStateService } from '@core/data-access/services/state/platform-state.service';

@Injectable({
  providedIn: 'root',
})
export class FontsService {
  private readonly _fontsLoadedState = inject(FontsLoadedStateService);
  private readonly _platformStateService = inject(PlatformStateService);

  public constructor() {
    this._platformStateService.isBrowser$
      .pipe(
        filter(Boolean),
        switchMap(() => from(document.fonts.ready).pipe(filter(Boolean))),
        take(1),
      )
      .subscribe(() => {
        this._fontsLoadedState.setValue(true);
      });
  }
}
