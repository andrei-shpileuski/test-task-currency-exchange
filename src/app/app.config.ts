import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {
  PreloadAllModules,
  provideRouter,
  withComponentInputBinding,
  withPreloading,
  withViewTransitions,
} from '@angular/router';
import { routes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import {
  HttpClient,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideAnimations } from '@angular/platform-browser/animations';
import { requestTrackerInterceptor } from '@core/data-access/interceptors/request-tracker.interceptor';
import { provideTranslateService, TranslateLoader } from '@ngx-translate/core';
import { API_URL } from '@core/data-access/tokens/api-url.token';
import { environment } from '@env/environment';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LanguagesISOEnum } from '@core/entities/enums/languages-iso.enum';
import { CLIENT_URL } from '@core/data-access/tokens/client-url.token';

const httpLoaderFactory: (http: HttpClient) => TranslateHttpLoader = (
  http: HttpClient,
) => new TranslateHttpLoader(http, './i18n/', '.json');

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideClientHydration(withEventReplay()),
    provideRouter(
      routes,
      withPreloading(PreloadAllModules), //todo
      withViewTransitions(),
      withComponentInputBinding(),
    ),
    provideAnimations(),
    provideAnimationsAsync(), //todo
    provideHttpClient(withInterceptors([requestTrackerInterceptor])),
    provideTranslateService({
      defaultLanguage: LanguagesISOEnum.English,
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    { provide: API_URL, useValue: environment.apiUrl },
    { provide: CLIENT_URL, useValue: environment.url },
  ],
};
