import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { LanguagesISOEnum } from '@core/entities/enums/languages-iso.enum';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';

interface State {
  data: LanguagesISOEnum | null;
}

const initialState: State = {
  data: null,
};

export const currentLanguageStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, _translateService = inject(TranslateService)) => ({
    init(): void {
      of(_translateService.defaultLang as LanguagesISOEnum).subscribe(
        (lang) => {
          patchState(store, { data: lang });
        },
      );
    },
  })),
);
