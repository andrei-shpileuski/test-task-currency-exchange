import { inject, Injectable } from '@angular/core';
import { InternalApiService } from '@core/data-access/api/internal-api.service';
import { combineLatest, filter, map, Observable } from 'rxjs';
import {
  IMetadata,
  IMetadataExtended,
  IMetadataReplaceData,
} from './metadata.interface';
import { CLIENT_URL } from '@core/data-access/tokens/client-url.token';
import { currentLanguageStore } from '@core/data-access/state/current-language.store';
import { toObservable } from '@angular/core/rxjs-interop';
import { authorStore } from '@app/environment/data-access/state/author.store';
import { vacancyStore } from '@app/environment/data-access/state/vacancy.store';
import { taskStore } from '@app/environment/data-access/state/task.store';

@Injectable({
  providedIn: 'root',
})
export class MetadataApiService {
  private readonly _clientUrl = inject(CLIENT_URL);
  private readonly _internalApi = inject(InternalApiService);
  private readonly _lang$ = toObservable(inject(currentLanguageStore).data);
  private readonly _author$ = toObservable(inject(authorStore).data);
  private readonly _vacancy$ = toObservable(inject(vacancyStore).data);
  private readonly _task$ = toObservable(inject(taskStore).data);

  public getMetadata(): Observable<IMetadata> {
    return combineLatest([
      this._getMetadata(),
      this._lang$.pipe(filter(Boolean)),
      this._author$.pipe(filter(Boolean)),
      this._task$.pipe(filter(Boolean)),
      this._vacancy$.pipe(filter(Boolean)),
    ]).pipe(
      map(([metadataExtended, lang, author, task, vacancy]): IMetadata => {
        const replaceData: IMetadataReplaceData = {
          authorName: author.name,
          testTaskName: task.title,
          vacancyTitle: vacancy.title,
          companyName: vacancy.company.name,
        };

        return {
          type: metadataExtended.type,
          locale: metadataExtended.locale[lang],
          title: this.replaceAll(metadataExtended.title[lang], replaceData),
          description: this.replaceAll(
            metadataExtended.description[lang],
            replaceData,
          ),
          keywords: metadataExtended.keywords[lang],
          og: {
            type: metadataExtended.type,
            locale: metadataExtended.locale[lang],
            title: this.replaceAll(metadataExtended.title[lang], replaceData),
            description: this.replaceAll(
              metadataExtended.description[lang],
              replaceData,
            ),
            siteName: this.replaceAll(
              metadataExtended.title[lang],
              replaceData,
            ),
            url: this._clientUrl,
            image: {
              width: metadataExtended.og.image.width,
              height: metadataExtended.og.image.height,
              type: metadataExtended.og.image.type,
              url: metadataExtended.og.image.url[lang],
            },
          },
        };
      }),
    );
  }

  private replaceAll(text: string, replaceData: IMetadataReplaceData): string {
    return text
      .replace('{{authorName}}', replaceData.authorName)
      .replace('{{testTaskName}}', replaceData.testTaskName)
      .replace('{{vacancyTitle}}', replaceData.vacancyTitle)
      .replace('{{companyName}}', replaceData.companyName);
  }

  private _getMetadata(): Observable<IMetadataExtended> {
    return this._internalApi.getInternalJsonData('metadata');
  }
}
