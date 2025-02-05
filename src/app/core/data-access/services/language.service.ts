import { inject, Injectable } from '@angular/core';
import { LanguagesISOEnum } from '@core/entities/enums/languages-iso.enum';
import { TranslateService } from '@ngx-translate/core';
import { LanguageStateService } from '@core/data-access/services/state/language-state.service';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private readonly _translateService = inject(TranslateService);
  private readonly _languageStateService = inject(LanguageStateService);

  public defineCurrentLanguage(): void {
    const currentLanguage = this._translateService
      .defaultLang as LanguagesISOEnum;

    this._languageStateService.setValue(currentLanguage);
  }
}
