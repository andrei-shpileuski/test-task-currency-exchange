import { Injectable } from '@angular/core';
import { BaseStateService } from '@core/data-access/services/state/base-state.service';
import { ITestTaskDescription } from '@app/features/task/entities/interfaces/test-task-description.interface';

@Injectable({
  providedIn: 'root',
})
export class TestTaskDescriptionStateService extends BaseStateService<ITestTaskDescription> {}
