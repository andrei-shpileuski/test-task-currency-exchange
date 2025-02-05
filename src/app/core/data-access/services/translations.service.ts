import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { filter, interval, map, Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TranslationsService {
  private readonly _translateService = inject(TranslateService);

  public translationsLoaded$: Observable<boolean> = interval(10).pipe(
    map(() => this._translateService.instant('TRANSLATION_READY')),
    filter((value) => value === 'true'),
    take(1),
  );
}
