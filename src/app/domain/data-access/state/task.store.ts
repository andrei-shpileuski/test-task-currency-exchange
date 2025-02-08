import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { take } from 'rxjs';
import { ITask } from '@domain/entities/interfaces/task.interface';
import { TaskApiService } from '@domain/data-access/api/task-api.service';

export const taskStore = signalStore(
  { providedIn: 'root' },
  withState<{ data: ITask | null }>({ data: null }),
  withMethods((store, taskApiService = inject(TaskApiService)) => ({
    defineData(): void {
      taskApiService
        .getTask()
        .pipe(take(1))
        .subscribe((task: ITask) => patchState(store, { data: task }));
    },
  })),
);
