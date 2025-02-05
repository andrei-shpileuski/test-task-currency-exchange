import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { FontsService } from '@core/data-access/services/fonts.service';
import { TranslateService } from '@ngx-translate/core';
import { filter, interval, map, take } from 'rxjs';

interface State {
  fontsLoaded: boolean;
  translationsLoaded: boolean;
}

const initialState: State = {
  fontsLoaded: false,
  translationsLoaded: false,
};

export const contentReadyStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods(
    (
      store,
      fontsService = inject(FontsService),
      translateService = inject(TranslateService),
    ) => ({
      setFontsLoaded(): void {
        fontsService.fontsLoaded$.subscribe(() => {
          patchState(store, { fontsLoaded: true });
        });
      },
      setTranslationsLoaded(): void {
        interval(10)
          .pipe(
            map(() => translateService.instant('TRANSLATION_READY')),
            filter((value) => value === 'true'),
            take(1),
          )
          .subscribe(() => {
            patchState(store, { translationsLoaded: true });
          });
      },
    }),
  ),
);
