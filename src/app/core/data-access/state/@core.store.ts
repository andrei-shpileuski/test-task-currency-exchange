import { inject, Injectable } from '@angular/core';
import { projectInfoStore } from '@core/data-access/state/project-info.store';
import { platformStore } from '@core/data-access/state/platform.store';
import { contentReadyStore } from '@core/data-access/state/content-ready.store';
import { currentLanguageStore } from '@core/data-access/state/current-language.store';
import { metadataStore } from '@core/data-access/state/metadata.store';
import { requestCountStore } from '@core/data-access/state/request-count.store';

@Injectable({
  providedIn: 'root',
})
export class CoreState {
  public projectInfo = inject(projectInfoStore);
  public requestCount = inject(requestCountStore);
  public platform = inject(platformStore);
  public contentReady = inject(contentReadyStore);
  public currentLanguage = inject(currentLanguageStore);
  public metadata = inject(metadataStore);

  public init(): void {
    this.currentLanguage.init();
    this.metadata.init();
    this.platform.init();
    this.projectInfo.init();
    this.contentReady.setFontsLoaded();
    this.contentReady.setTranslationsLoaded();
  }
}
