import { Injectable } from '@angular/core';
import { BaseStateService } from '@core/data-access/services/state/base-state.service';
import { IVacancyInfo } from '@app/features/task/entities/interfaces/vacancy-info.interface';

@Injectable({
  providedIn: 'root',
})
export class VacancyInfoStateService extends BaseStateService<IVacancyInfo> {}
