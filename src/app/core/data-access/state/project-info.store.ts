import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { take } from 'rxjs';
import { ITestTaskDescription } from '@core/entities/interfaces/test-task-description.interface';
import { IVacancyInfo } from '@core/entities/interfaces/vacancy-info.interface';
import { IAuthorInfo } from '@core/entities/interfaces/author-info.interface';
import { ProjectInfoApiService } from '@core/data-access/api/project-info-api.service';

interface State {
  author: IAuthorInfo | null;
  vacancy: IVacancyInfo | null;
  testTask: ITestTaskDescription | null;
}

const initialState: State = {
  author: null,
  vacancy: null,
  testTask: null,
};

export const projectInfoStore = signalStore(
  { providedIn: 'root' },
  withState<State>(initialState),
  withMethods(
    (store, projectInfoApiService = inject(ProjectInfoApiService)) => ({
      init(): void {
        this.defineAuthorInfo();
        this.defineTestTaskDescription();
        this.defineVacancyInfo();
      },
      defineAuthorInfo(): void {
        projectInfoApiService
          .getAuthorInfo()
          .pipe(take(1))
          .subscribe((authorInfo) => patchState(store, { author: authorInfo }));
      },
      defineTestTaskDescription(): void {
        projectInfoApiService
          .getTestTaskDescription()
          .pipe(take(1))
          .subscribe((task) => patchState(store, { testTask: task }));
      },
      defineVacancyInfo(): void {
        projectInfoApiService
          .getVacancyInfo()
          .pipe(take(1))
          .subscribe((vacancy) => patchState(store, { vacancy: vacancy }));
      },
    }),
  ),
);
