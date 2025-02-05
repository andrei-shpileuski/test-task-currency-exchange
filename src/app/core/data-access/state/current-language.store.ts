import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { LanguagesISOEnum } from '@core/entities/enums/languages-iso.enum';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';

export const currentLanguageStore = signalStore(
  { providedIn: 'root' },
  withState<{ data: LanguagesISOEnum | null }>({ data: null }),
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
