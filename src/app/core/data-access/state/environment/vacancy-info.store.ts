import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { take } from 'rxjs';
import { IVacancyInfo } from '@core/entities/interfaces/vacancy-info.interface';
import { VacancyInfoApiService } from '@core/data-access/api/environment/vacancy-info-api.service';

interface State {
  data: IVacancyInfo | null;
}

const initialState: State = {
  data: null,
};

export const vacancyInfoStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, api = inject(VacancyInfoApiService)) => ({
    define(): void {
      api
        .getVacancyInfo()
        .pipe(take(1))
        .subscribe((vacancy) => patchState(store, { data: vacancy }));
    },
  })),
);
