import { inject, Injectable } from '@angular/core';
import { InternalApiService } from '@core/data-access/api/core/internal-api.service';
import { combineLatest, filter, map, Observable } from 'rxjs';
import {
  IAuthorInfo,
  IAuthorInfoExtended,
} from '@core/entities/interfaces/author-info.interface';
import { currentLanguageStore } from '@core/data-access/state/core/current-language.store';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class AuthorInfoApiService {
  private readonly _internalApi = inject(InternalApiService);
  private readonly _lang = toObservable(inject(currentLanguageStore).data);

  public getAuthorInfo(): Observable<IAuthorInfo> {
    return combineLatest([
      this._getAuthorInfo(),
      this._lang.pipe(filter(Boolean)),
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
