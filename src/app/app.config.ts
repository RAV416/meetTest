import {
  ApplicationConfig,
  importProvidersFrom,
} from '@angular/core';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { provideRouter } from '@angular/router';

import { AngularFireModule } from '@angular/fire/compat';
import { firebase } from '../environments/firebase';
import { routes } from './app.routes';

import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { provideStoreDevtools } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom([
      AngularFirestoreModule,
      AngularFireAuthModule,
      AngularFireModule.initializeApp(firebase.firebaseConfig),
    ]),
    provideStoreDevtools({ maxAge: 25 }),
  ],
};
