import { inject, Injectable } from '@angular/core';
import { InternalApiService } from '@core/data-access/services/api/internal-api.service';
import { combineLatest, filter, map, Observable } from 'rxjs';
import {
  IVacancyInfo,
  IVacancyInfoExtended,
} from '@app/features/task/entities/interfaces/vacancy-info.interface';
import { LanguageStateService } from '@core/data-access/services/state/language-state.service';

@Injectable({
  providedIn: 'root',
})
export class VacancyInfoApiService {
  private readonly _internalApi = inject(InternalApiService);
  private readonly _languageStateService = inject(LanguageStateService);

  public getVacancyInfo(): Observable<IVacancyInfo> {
    return combineLatest([
      this._getVacancyInfo(),
      this._languageStateService.value$.pipe(filter(Boolean)),
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
