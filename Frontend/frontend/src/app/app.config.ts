import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { subadminAuthInterceptor } from './SubAdmin/interceptors/subadminAuth.interceptor';
import { authInterceptor } from './Admin/interceptors/adminAuth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), provideAnimationsAsync(), 
    provideHttpClient(), 
    provideHttpClient(withInterceptors([authInterceptor, subadminAuthInterceptor]))]
};
