import { inject, Injectable } from '@angular/core';
import { VacancyInfoApiService } from '@app/features/task/data-access/services/api/vacancy-info-api.service';
import { VacancyInfoStateService } from '@app/features/task/data-access/services/state/vacancy-info-state.service';

@Injectable({
  providedIn: 'root',
})
export class VacancyInfoService {
  private readonly _api = inject(VacancyInfoApiService);
  private readonly _state = inject(VacancyInfoStateService);

  public defineVacancyInfo(): void {
    this._api.getVacancyInfo().subscribe((res) => this._state.setValue(res));
  }
}
