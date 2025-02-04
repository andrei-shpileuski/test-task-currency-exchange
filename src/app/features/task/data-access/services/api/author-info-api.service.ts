import { inject, Injectable } from '@angular/core';
import { InternalApiService } from '@core/data-access/services/api/internal-api.service';
import { combineLatest, filter, map, Observable } from 'rxjs';
import {
  IAuthorInfo,
  IAuthorInfoExtended,
} from '@app/features/task/entities/interfaces/author-info.interface';
import { LanguageStateService } from '@core/data-access/services/state/language-state.service';

@Injectable({
  providedIn: 'root',
})
export class AuthorInfoApiService {
  private readonly _internalApi = inject(InternalApiService);
  private readonly _languageStateService = inject(LanguageStateService);

  public getAuthorInfo(): Observable<IAuthorInfo> {
    return combineLatest([
      this._getAuthorInfo(),
      this._languageStateService.value$.pipe(filter(Boolean)),
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
}
