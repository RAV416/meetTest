import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { provideRouter } from '@angular/router';

import { AngularFireModule } from '@angular/fire/compat';
import { firebase } from '../environments/firebase';
import { routes } from './app.routes';
import {
  provideNativeDateAdapter,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    
    importProvidersFrom([
      AngularFirestoreModule,
      AngularFireAuthModule,
      AngularFireModule.initializeApp(firebase.firebaseConfig),
    ]),
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'pl' }, 
  ],
};
