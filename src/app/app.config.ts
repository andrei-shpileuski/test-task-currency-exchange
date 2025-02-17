import {
  ApplicationConfig,
  LOCALE_ID,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import {
  PreloadAllModules,
  provideRouter,
  withComponentInputBinding,
  withPreloading,
  withViewTransitions,
} from '@angular/router';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import {
  HttpClient,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { requestTrackerInterceptor } from '@core/data-access/interceptors/request-tracker.interceptor';
import { provideTranslateService, TranslateLoader } from '@ngx-translate/core';
import { API_URL } from '@core/data-access/tokens/api-url.token';
import { environment } from '@env/environment';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { httpLoaderFactory } from '@core/data-access/factories/http-loader.factory';
import { routes } from '@app/app.routes';
import { defaultLanguage } from '@core/entities/constants/default-language.const';
import localeRu from '@angular/common/locales/ru';
import { registerLocaleData } from '@angular/common';
import { LanguagesISOEnum } from '@core/entities/enums/languages-iso.enum';

if (defaultLanguage === LanguagesISOEnum.Russian) registerLocaleData(localeRu);

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideClientHydration(withEventReplay()),
    provideAnimations(),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([requestTrackerInterceptor])),
    provideRouter(
      routes,
      withPreloading(PreloadAllModules),
      withViewTransitions(),
      withComponentInputBinding(),
    ),
    provideTranslateService({
      defaultLanguage: defaultLanguage,
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    { provide: LOCALE_ID, useValue: defaultLanguage },
    { provide: API_URL, useValue: environment.apiUrl },
  ],
};
