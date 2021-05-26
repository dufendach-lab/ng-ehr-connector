// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// git update-index --assume-unchanged .\src\environments\environment.prod.ts

import * as data from '../assets/test-epic-endpoints.json';

export const environment = {
  production: false,
  epicEnv: data,

  firebase: {
    apiKey: "AIzaSyBcBu8AmFMkbb65Ufzjfo9d9kgqsHh_SO8",
    authDomain: "ehr-connector.firebaseapp.com",
    projectId: "ehr-connector",
    storageBucket: "ehr-connector.appspot.com",
    messagingSenderId: "658001155017",
    appId: "1:658001155017:web:92d3e4a601aa72cd81ce18",
    measurementId: "G-ZVKYKQWRPV"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
