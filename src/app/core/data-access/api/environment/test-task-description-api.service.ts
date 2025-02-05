import { inject, Injectable } from '@angular/core';
import { InternalApiService } from '@core/data-access/api/core/internal-api.service';
import { combineLatest, filter, map, Observable } from 'rxjs';
import {
  ITestTaskDescription,
  ITestTaskDescriptionExtended,
} from '@core/entities/interfaces/test-task-description.interface';
import { toObservable } from '@angular/core/rxjs-interop';
import { currentLanguageStore } from '@core/data-access/state/core/current-language.store';

@Injectable({
  providedIn: 'root',
})
export class TestTaskDescriptionApiService {
  private readonly _internalApi = inject(InternalApiService);
  private readonly _lang$ = toObservable(inject(currentLanguageStore).data);

  public getTestTaskDescription(): Observable<ITestTaskDescription> {
    return combineLatest([
      this._getTestTaskDescription(),
      this._lang$.pipe(filter(Boolean)),
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
