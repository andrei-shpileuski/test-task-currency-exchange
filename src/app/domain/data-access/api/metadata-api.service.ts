import { inject, Injectable } from '@angular/core';
import { InternalApiService } from '@core/data-access/api/internal-api.service';
import { combineLatest, filter, map, Observable } from 'rxjs';
import {
  IMetadata,
  IMetadataResponse,
} from '@domain/entities/interfaces/metadata.interface';
import { currentLanguageStore } from '@core/data-access/state/current-language.store';
import { toObservable } from '@angular/core/rxjs-interop';
import { authorStore } from '@domain/data-access/state/author.store';
import { vacancyStore } from '@domain/data-access/state/vacancy.store';
import { taskStore } from '@domain/data-access/state/task.store';
import { solutionStore } from '@domain/data-access/state/solution.store';

interface IMetadataReplaceData {
  authorName: string;
  testTaskName: string;
  vacancyTitle: string;
  companyName: string;
}

@Injectable({
  providedIn: 'root',
})
export class MetadataApiService {
  private readonly _internalApi = inject(InternalApiService);
  private readonly _lang$ = toObservable(inject(currentLanguageStore).data);
  private readonly _author$ = toObservable(inject(authorStore).data);
  private readonly _vacancy$ = toObservable(inject(vacancyStore).data);
  private readonly _task$ = toObservable(inject(taskStore).data);
  private readonly _solution$ = toObservable(inject(solutionStore).data);

  public getMetadata(): Observable<IMetadata> {
    return combineLatest([
      this._getMetadata(),
      this._lang$.pipe(filter(Boolean)),
      this._author$.pipe(filter(Boolean)),
      this._task$.pipe(filter(Boolean)),
      this._vacancy$.pipe(filter(Boolean)),
      this._solution$.pipe(filter(Boolean)),
    ]).pipe(
      map(([metadata, lang, author, task, vacancy, solution]) => {
        const replaceData: IMetadataReplaceData = {
          authorName: author.name,
          testTaskName: task.title,
          vacancyTitle: vacancy.title,
          companyName: vacancy.company.name,
        };

        const localizedMetadata = {
          type: metadata.type,
          locale: lang,
          title: this._replaceAll(metadata.title[lang], replaceData),
          description: this._replaceAll(
            metadata.description[lang],
            replaceData,
          ),
          keywords: metadata.keywords[lang],
        };

        return {
          ...localizedMetadata,
          og: {
            ...localizedMetadata,
            siteName: localizedMetadata.title,
            url: solution.siteUrl,
            image: { ...metadata.og.image, url: metadata.og.image.url[lang] },
          },
        };
      }),
    );
  }

  private _replaceAll(text: string, data: IMetadataReplaceData): string {
    return Object.entries(data).reduce(
      (acc, [key, value]) => acc.replace(`{{${key}}}`, value),
      text,
    );
  }

  private _getMetadata(): Observable<IMetadataResponse> {
    return this._internalApi.getInternalJsonData('metadata');
  }
}
