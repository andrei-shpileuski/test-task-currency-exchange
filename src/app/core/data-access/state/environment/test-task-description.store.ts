import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { take } from 'rxjs';
import { ITestTaskDescription } from '@core/entities/interfaces/test-task-description.interface';
import { TestTaskDescriptionApiService } from '@core/data-access/api/environment/test-task-description-api.service';

interface State {
  data: ITestTaskDescription | null;
}

const initialState: State = {
  data: null,
};

export const testTaskDescriptionStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, api = inject(TestTaskDescriptionApiService)) => ({
    define(): void {
      api
        .getTestTaskDescription()
        .pipe(take(1))
        .subscribe((task) => patchState(store, { data: task }));
    },
  })),
);
