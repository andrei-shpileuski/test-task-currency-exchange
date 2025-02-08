import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { computed, inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { filter, from, interval, map, Observable, switchMap, take } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { platformStore } from '@core/data-access/state/platform.store';

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
      fontsService = inject(FontsService),
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
