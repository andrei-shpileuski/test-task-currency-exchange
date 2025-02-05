import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { filter, interval, map, take } from 'rxjs';
import { TranslationsLoadedStateService } from '@core/data-access/services/state/translations-loaded-state.service';

@Injectable({
  providedIn: 'root',
})
export class TranslationsService {
  private readonly _translateService = inject(TranslateService);
  private readonly _translationsLoadedStateService = inject(
    TranslationsLoadedStateService,
  );

  public defineIsTranslationsLoaded(): void {
    interval(10)
      .pipe(
        map(() => this._translateService.instant('TRANSLATION_READY')),
        filter((value) => value === 'true'),
        take(1),
      )
      .subscribe(() => {
        this._translationsLoadedStateService.setValue(true);
      });
  }
}
