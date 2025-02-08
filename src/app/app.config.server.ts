import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from '@app/app.config';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideHttpClient(withFetch(), withInterceptors([])),
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
