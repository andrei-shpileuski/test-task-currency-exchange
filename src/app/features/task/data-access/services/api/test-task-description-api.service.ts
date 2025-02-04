import { inject, Injectable } from '@angular/core';
import { InternalApiService } from '@core/data-access/services/api/internal-api.service';
import { combineLatest, filter, map, Observable } from 'rxjs';
import {
  ITestTaskDescription,
  ITestTaskDescriptionExtended,
} from '@app/features/task/entities/interfaces/test-task-description.interface';
import { LanguageStateService } from '@core/data-access/services/state/language-state.service';

@Injectable({
  providedIn: 'root',
})
export class TestTaskDescriptionApiService {
  private readonly _internalApi = inject(InternalApiService);
  private readonly _languageStateService = inject(LanguageStateService);

  public getTestTaskDescription(): Observable<ITestTaskDescription> {
    return combineLatest([
      this._getTestTaskDescription(),
      this._languageStateService.value$.pipe(filter(Boolean)),
    ]).pipe(
      map(([task, lang]) => {
        const { title, text } = task;

        return {
          title: title[lang],
          text: text[lang],
          repositoryLink: task.repositoryLink,
        };
      }),
    );
  }

  private _getTestTaskDescription(): Observable<ITestTaskDescriptionExtended> {
    return this._internalApi.getInternalJsonData('test-task-description');
  }
}
