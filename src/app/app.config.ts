import { ApplicationConfig, provideZoneChangeDetection, isDevMode, Injector, APP_INITIALIZER } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideClientHydration, DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { authReducer } from './state/auth/auth.reducer';
import { AuthEffects } from './state/auth/auth.effects';

// A function to handle icon registration using APP_INITIALIZER
export function registerIcons(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
  return () => {
    // This logic can be expanded to register multiple icons
    try {
      iconRegistry.addSvgIcon(
        'google-logo',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/google-logo.svg')
      );
    } catch (err) {
      console.error('Failed to load SVG icon:', err);
    }
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    // Core Angular Providers
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideAnimations(),
    provideHttpClient(withFetch()),

    // NgRx State Management Providers
    provideStore(),
    provideState({ name: 'auth', reducer: authReducer }),
    provideEffects([AuthEffects]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),

    // App Initializer for pre-loading tasks like registering icons
    {
      provide: APP_INITIALIZER,
      useFactory: registerIcons,
      deps: [MatIconRegistry, DomSanitizer],
      multi: true,
    },
  ]
};

