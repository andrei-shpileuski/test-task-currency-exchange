import { inject, Injectable } from '@angular/core';
import { InternalApiService } from '@core/data-access/services/api/internal-api.service';
import { LanguageStateService } from '@core/data-access/services/state/language-state.service';
import { combineLatest, filter, map, Observable } from 'rxjs';
import {
  IMetadata,
  IMetadataExtended,
  IMetadataReplaceData,
} from '@core/entities/interfaces/metadata.interface';
import { AuthorInfoStateService } from '@app/features/task/data-access/services/state/author-info-state.service';
import { VacancyInfoStateService } from '@app/features/task/data-access/services/state/vacancy-info-state.service';
import { TestTaskDescriptionStateService } from '@app/features/task/data-access/services/state/test-task-description-state.service';
import { CLIENT_URL } from '@core/data-access/tokens/client-url.token';

@Injectable({
  providedIn: 'root',
})
export class MetadataApiService {
  private readonly _clientUrl = inject(CLIENT_URL);
  private readonly _internalApi = inject(InternalApiService);
  private readonly _languageStateService = inject(LanguageStateService);
  private readonly _authorInfoStateService = inject(AuthorInfoStateService);
  private readonly _vacancyInfoStateService = inject(VacancyInfoStateService);
  private readonly _testTaskDescriptionStateService = inject(
    TestTaskDescriptionStateService,
  );

  public getAuthorInfo(): Observable<IMetadata> {
    return combineLatest([
      this._getMetadata(),
      this._languageStateService.value$.pipe(filter(Boolean)),
      this._authorInfoStateService.value$.pipe(filter(Boolean)),
      this._testTaskDescriptionStateService.value$.pipe(filter(Boolean)),
      this._vacancyInfoStateService.value$.pipe(filter(Boolean)),
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
