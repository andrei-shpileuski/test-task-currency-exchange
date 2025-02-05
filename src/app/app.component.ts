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
import { AuthorInfoService } from '@app/features/task/data-access/services/business/author-info.service';
import { VacancyInfoService } from '@app/features/task/data-access/services/business/vacancy-info.service';
import { TestTaskDescriptionService } from '@app/features/task/data-access/services/business/test-task-description.service';
import { MetadataService } from '@core/data-access/services/metadata.service';
import { PlatformService } from '@core/data-access/services/platform.service';
import { ProgressBarComponent } from '@app/ui-kit/progress-bar/progress-bar.component';
import { RequestTrackerStateService } from '@core/data-access/services/state/request-tracker-state.service';
import { LanguageService } from '@core/data-access/services/language.service';
import { ContentReadyStore } from '@core/data-access/services/state/example.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, HeaderComponent, ProgressBarComponent],
  providers: [ContentReadyStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  private readonly _authorInfoService = inject(AuthorInfoService);
  private readonly _vacancyInfoService = inject(VacancyInfoService);
  private readonly _testTaskDescriptionService = inject(
    TestTaskDescriptionService,
  );
  private readonly _languageService = inject(LanguageService);
  private readonly _metadataService = inject(MetadataService);
  private readonly _platformService = inject(PlatformService);
  private readonly _requestTrackerStateService = inject(
    RequestTrackerStateService,
  );
  private readonly _contentReadyStore = inject(ContentReadyStore);

  public loading: Signal<boolean> =
    this._requestTrackerStateService.isInProgress;

  public contentReady = computed(
    () =>
      !!this._contentReadyStore.fontsLoaded() &&
      !!this._contentReadyStore.translationsLoaded(),
  );

  public ngOnInit(): void {
    this.init();
  }

  private init(): void {
    this._languageService.defineCurrentLanguage();
    this._metadataService.defineMetadata();
    this._platformService.definePlatform();
    this._contentReadyStore.setFontsLoaded();
    this._contentReadyStore.setTranslationsLoaded();
    this.defineInitialData();
  }

  private defineInitialData(): void {
    this._authorInfoService.defineAuthorInfo();
    this._testTaskDescriptionService.defineTestTaskDescription();
    this._vacancyInfoService.defineVacancyInfo();
  }
}
