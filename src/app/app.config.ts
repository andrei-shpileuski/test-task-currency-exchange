import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
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
import { CLIENT_URL } from '@core/data-access/tokens/client-url.token';
import { httpLoaderFactory } from '@core/data-access/factories/http-loader.factory';
import { routes } from '@app/app.routes';
import { defaultLanguage } from '@core/entities/constants/default-language.const';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideClientHydration(withEventReplay()),
    provideRouter(
      routes,
      withPreloading(PreloadAllModules),
      withViewTransitions(),
      withComponentInputBinding(),
    ),
    provideAnimations(),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([requestTrackerInterceptor])),
    provideTranslateService({
      defaultLanguage: defaultLanguage,
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
