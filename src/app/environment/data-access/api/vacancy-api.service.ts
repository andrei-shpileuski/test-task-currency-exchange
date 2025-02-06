import { inject, Injectable } from '@angular/core';
import { combineLatest, filter, map, Observable } from 'rxjs';
import {
  IVacancy,
  IVacancyRaw,
} from '@app/environment/entities/interfaces/vacancy.interface';
import { InternalApiService } from '@core/data-access/api/internal-api.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { currentLanguageStore } from '@core/data-access/state/current-language.store';

@Injectable({
  providedIn: 'root',
})
export class VacancyApiService {
  private readonly _internalApi = inject(InternalApiService);
  private readonly _lang$ = toObservable(inject(currentLanguageStore).data);

  public getVacancy(): Observable<IVacancy> {
    return combineLatest([
      this._getVacancy(),
      this._lang$.pipe(filter(Boolean)),
    ]).pipe(
      map(([vacancy, lang]) => {
        const { title, grade, company } = vacancy;

        return {
          title: title[lang],
          grade: grade[lang],
          company: {
            name: company.name[lang],
          },
        };
      }),
    );
  }

  private _getVacancy(): Observable<IVacancyRaw> {
    return this._internalApi.getInternalJsonData('vacancy');
  }
}
