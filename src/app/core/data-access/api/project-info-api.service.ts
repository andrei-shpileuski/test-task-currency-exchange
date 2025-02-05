import { inject, Injectable } from '@angular/core';
import { InternalApiService } from '@core/data-access/api/@internal-api.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { currentLanguageStore } from '@core/data-access/state/current-language.store';
import { combineLatest, filter, map, Observable } from 'rxjs';
import {
  IAuthorInfo,
  IAuthorInfoExtended,
} from '@core/entities/interfaces/author-info.interface';
import {
  ITestTaskDescription,
  ITestTaskDescriptionExtended,
} from '@core/entities/interfaces/test-task-description.interface';
import {
  IVacancyInfo,
  IVacancyInfoExtended,
} from '@core/entities/interfaces/vacancy-info.interface';

@Injectable({
  providedIn: 'root',
})
export class ProjectInfoApiService {
  private readonly _internalApi = inject(InternalApiService);
  private readonly _lang$ = toObservable(inject(currentLanguageStore).data);

  public getAuthorInfo(): Observable<IAuthorInfo> {
    return combineLatest([
      this._getAuthorInfo(),
      this._lang$.pipe(filter(Boolean)),
    ]).pipe(
      map(([authorInfo, lang]) => {
        const { name, links } = authorInfo;

        const updatedLinks = links
          .filter((link) => link.isVisible)
          .map((link) => ({
            ...link,
            href: link.href[lang],
          }));

        return { name: name[lang], links: updatedLinks };
      }),
    );
  }

  private _getAuthorInfo(): Observable<IAuthorInfoExtended> {
    return this._internalApi.getInternalJsonData('author-info');
  }

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

  public getVacancyInfo(): Observable<IVacancyInfo> {
    return combineLatest([
      this._getVacancyInfo(),
      this._lang$.pipe(filter(Boolean)),
    ]).pipe(
      map(([vacancy, lang]) => {
        const { title, grade, company } = vacancy;

        return {
          title: title[lang],
          grade: grade[lang],
          company: {
            name: company.name[lang],
          },
        };
      }),
    );
  }

  private _getVacancyInfo(): Observable<IVacancyInfoExtended> {
    return this._internalApi.getInternalJsonData('vacancy-info');
  }
}
