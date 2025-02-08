import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { filter, interval, map, take } from 'rxjs';
import { FontsManagerService } from '@core/data-access/managers/fonts-manager.service';

interface IState {
  fontsLoaded: boolean;
  translationsLoaded: boolean;
}

const initialState: IState = {
  fontsLoaded: false,
  translationsLoaded: false,
};

export const contentReadyStore = signalStore(
  { providedIn: 'root' },
  withState<IState>(initialState),
  withComputed((state) => ({
    ready: computed(() => state.translationsLoaded() && state.fontsLoaded()),
  })),
  withMethods(
    (
      store,
      fontsService = inject(FontsManagerService),
      translateService = inject(TranslateService),
    ) => ({
      defineFontsLoaded(): void {
        fontsService.fontsLoaded$.subscribe(() => {
          patchState(store, { fontsLoaded: true });
        });
      },
      defineTranslationsLoaded(): void {
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
