import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { take } from 'rxjs';
import { IVacancy } from '@app/domain/entities/interfaces/vacancy.interface';
import { VacancyApiService } from '@app/domain/data-access/api/vacancy-api.service';

export const vacancyStore = signalStore(
  { providedIn: 'root' },
  withState<{ data: IVacancy | null }>({ data: null }),
  withMethods((store, vacancyApiService = inject(VacancyApiService)) => ({
    defineData(): void {
      vacancyApiService
        .getVacancy()
        .pipe(take(1))
        .subscribe((vacancy: IVacancy) => patchState(store, { data: vacancy }));
    },
  })),
);
