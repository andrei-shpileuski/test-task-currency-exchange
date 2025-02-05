import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { inject } from '@angular/core';
import { FontsService } from '@core/data-access/services/fonts.service';
import { TranslationsService } from '@core/data-access/services/translations.service';

interface State {
  fontsLoaded: boolean;
  translationsLoaded: boolean;
}

const initialState: State = {
  fontsLoaded: false,
  translationsLoaded: false,
};

export const ContentReadyStore = signalStore(
  withState(initialState),
  withMethods(
    (
      store,
      fontsService = inject(FontsService),
      translationService = inject(TranslationsService),
    ) => ({
      setFontsLoaded(): void {
        fontsService.fontsLoaded$.subscribe(() => {
          patchState(store, { fontsLoaded: true });
        });
      },
      setTranslationsLoaded(): void {
        translationService.translationsLoaded$.subscribe(() => {
          patchState(store, { translationsLoaded: true });
        });
      },
    }),
  ),
  withHooks({}),
);
