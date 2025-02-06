import { inject, Injectable } from '@angular/core';
import { platformStore } from '@core/data-access/state/platform.store';
import { contentReadyStore } from '@core/data-access/state/content-ready.store';
import { currentLanguageStore } from '@core/data-access/state/current-language.store';
import { requestCountStore } from '@core/data-access/state/request-count.store';

@Injectable({
  providedIn: 'root',
})
export class CoreStateService {
  public currentLanguage = inject(currentLanguageStore);
  public platform = inject(platformStore);
  public contentReady = inject(contentReadyStore);
  public requestCount = inject(requestCountStore);

  public init(): void {
    this.currentLanguage.init();
    this.platform.init();
    this.contentReady.setFontsLoaded();
    this.contentReady.setTranslationsLoaded();
  }
}
