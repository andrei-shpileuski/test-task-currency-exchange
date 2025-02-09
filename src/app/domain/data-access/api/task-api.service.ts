import { inject, Injectable } from '@angular/core';
import { InternalApiService } from '@core/data-access/api/internal-api.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { currentLanguageStore } from '@core/data-access/state/current-language.store';
import { combineLatest, filter, map, Observable } from 'rxjs';
import {
  ITask,
  ITaskResponse,
} from '@domain/entities/interfaces/task.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskApiService {
  private readonly _internalApi = inject(InternalApiService);
  private readonly _lang$ = toObservable(inject(currentLanguageStore).data);

  public getTask(): Observable<ITask> {
    return combineLatest([
      this._getTask(),
      this._lang$.pipe(filter(Boolean)),
    ]).pipe(
      map(([task, lang]) => {
        const { title, text } = task;

        return {
          ...task,
          title: title[lang],
          text: text[lang],
        };
      }),
    );
  }

  private _getTask(): Observable<ITaskResponse> {
    return this._internalApi.getInternalJsonData('task');
  }
}
