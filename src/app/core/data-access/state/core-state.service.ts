import { inject, Injectable } from '@angular/core';
import { platformStore } from '@core/data-access/state/platform.store';
import { contentReadyStore } from '@core/data-access/state/content-ready.store';
import { currentLanguageStore } from '@core/data-access/state/current-language.store';
import { requestCountStore } from '@core/data-access/state/request-count.store';

@Injectable({
  providedIn: 'root',
})
export class CoreStateService {
  public readonly currentLanguage = inject(currentLanguageStore);
  public readonly platform = inject(platformStore);
  public readonly contentReady = inject(contentReadyStore);
  public readonly requestCount = inject(requestCountStore);

  public init(): void {
    this.currentLanguage.init();
    this.platform.init();
    this.contentReady.defineFontsLoaded();
    this.contentReady.defineTranslationsLoaded();
  }
}
