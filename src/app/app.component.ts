import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '@core/ui/components/header/header.component';
import { AuthorInfoService } from '@app/features/task/data-access/services/business/author-info.service';
import { VacancyInfoService } from '@app/features/task/data-access/services/business/vacancy-info.service';
import { TestTaskDescriptionService } from '@app/features/task/data-access/services/business/test-task-description.service';
import { TranslateService } from '@ngx-translate/core';
import { LanguageStateService } from '@core/data-access/services/state/language-state.service';
import { MetadataService } from '@core/data-access/services/metadata.service';
import { PlatformService } from '@core/data-access/services/platform.service';
import { LanguagesISOEnum } from '@core/entities/enums/languages-iso.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, HeaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  private readonly _authorInfoService = inject(AuthorInfoService);
  private readonly _vacancyInfoService = inject(VacancyInfoService);
  private readonly _testTaskDescriptionService = inject(
    TestTaskDescriptionService,
  );
  private readonly _translateService = inject(TranslateService);
  private readonly _languageStateService = inject(LanguageStateService);
  private readonly _metadataService = inject(MetadataService);
  private readonly _platformService = inject(PlatformService);

  public ngOnInit(): void {
    this.init();
  }

  private init(): void {
    this.defineLanguage();
    this.defineInitialData();
    this._metadataService.applyMetadata();
    this._platformService.definePlatform();
  }

  private defineInitialData(): void {
    this._authorInfoService.defineAuthorInfo();
    this._testTaskDescriptionService.defineTestTaskDescription();
    this._vacancyInfoService.defineVacancyInfo();
  }

  private defineLanguage(): void {
    const currentLanguage = this._translateService
      .defaultLang as LanguagesISOEnum;

    this._languageStateService.setValue(currentLanguage);
  }
}
