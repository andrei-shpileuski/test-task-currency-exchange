import { inject, Injectable } from '@angular/core';
import { InternalApiService } from '@core/data-access/api/core/internal-api.service';
import { combineLatest, filter, map, Observable } from 'rxjs';
import {
  IVacancyInfo,
  IVacancyInfoExtended,
} from '@core/entities/interfaces/vacancy-info.interface';
import { currentLanguageStore } from '@core/data-access/state/core/current-language.store';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class VacancyInfoApiService {
  private readonly _internalApi = inject(InternalApiService);
  private readonly _lang$ = toObservable(inject(currentLanguageStore).data);

  public getVacancyInfo(): Observable<IVacancyInfo> {
    return combineLatest([
      this._getVacancyInfo(),
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

  private _getVacancyInfo(): Observable<IVacancyInfoExtended> {
    return this._internalApi.getInternalJsonData('vacancy-info');
  }
}
