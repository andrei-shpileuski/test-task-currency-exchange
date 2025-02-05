import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  Signal,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '@core/ui/components/header/header.component';
import { ProgressBarComponent } from '@app/ui-kit/progress-bar/progress-bar.component';
import { contentReadyStore } from '@core/data-access/state/core/content-ready.store';
import { currentLanguageStore } from '@core/data-access/state/core/current-language.store';
import { metadataStore } from '@core/data-access/state/core/metadata.store';
import { platformStore } from '@core/data-access/state/core/platform.store';
import { requestCountStore } from '@core/data-access/state/core/request-count.store';
import { authorInfoStore } from '@core/data-access/state/environment/author-info.store';
import { testTaskDescriptionStore } from '@core/data-access/state/environment/test-task-description.store';
import { vacancyInfoStore } from '@core/data-access/state/environment/vacancy-info.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, HeaderComponent, ProgressBarComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  private readonly _authorInfoStore = inject(authorInfoStore);
  private readonly _vacancyInfoStore = inject(vacancyInfoStore);
  private readonly _testTaskDescriptionStore = inject(testTaskDescriptionStore);
  private readonly _platformStore = inject(platformStore);
  private readonly _requestCountStore = inject(requestCountStore);
  private readonly _contentReadyStore = inject(contentReadyStore);
  private readonly _currentLanguageStore = inject(currentLanguageStore);
  private readonly _metadataStore = inject(metadataStore);

  public loading: Signal<boolean> = this._requestCountStore.loading;

  public contentReady = computed(
    () =>
      !!this._contentReadyStore.fontsLoaded() &&
      !!this._contentReadyStore.translationsLoaded(),
  );

  public ngOnInit(): void {
    this.init();
  }

  private init(): void {
    this._currentLanguageStore.init();
    this._metadataStore.init();
    this._platformStore.init();
    this._contentReadyStore.setFontsLoaded();
    this._contentReadyStore.setTranslationsLoaded();

    this.defineInitialData();
  }

  private defineInitialData(): void {
    this._authorInfoStore.define();
    this._testTaskDescriptionStore.define();
    this._vacancyInfoStore.define();
  }
}
