import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import { provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { initializeApp } from 'firebase/app';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

const firebaseConfig = {
  apiKey: "AIzaSyDkm3-SbRx8c0V3qg4XuQynP_LuRLmCFgo",
  authDomain: "money-management-cd6af.firebaseapp.com",
  projectId: "money-management-cd6af",
  storageBucket: "money-management-cd6af.firebasestorage.app",
  messagingSenderId: "884792627068",
  appId: "1:884792627068:web:2921766c55a82e970edef9"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideCharts(withDefaultRegisterables())
  ]
};
