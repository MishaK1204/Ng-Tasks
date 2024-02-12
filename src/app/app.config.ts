import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideAnimations} from "@angular/platform-browser/animations";
import {HttpClientModule, provideHttpClient, withInterceptors} from "@angular/common/http";
import {appInterceptor} from "./interceptors/app.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimations(), HttpClientModule, provideHttpClient(withInterceptors([appInterceptor]))]
};
