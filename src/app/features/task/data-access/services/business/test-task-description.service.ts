import { inject, Injectable } from '@angular/core';
import { TestTaskDescriptionApiService } from '@app/features/task/data-access/services/api/test-task-description-api.service';
import { TestTaskDescriptionStateService } from '@app/features/task/data-access/services/state/test-task-description-state.service';

@Injectable({
  providedIn: 'root',
})
export class TestTaskDescriptionService {
  private readonly _api = inject(TestTaskDescriptionApiService);
  private readonly _state = inject(TestTaskDescriptionStateService);

  public defineTestTaskDescription(): void {
    this._api
      .getTestTaskDescription()
      .subscribe((res) => this._state.setValue(res));
  }
}
