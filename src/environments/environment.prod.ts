// git update-index --assume-unchanged .\src\environments\environment.ts

import * as data from '../assets/EpicEndpoints.json';

export const environment = {
  production: true,
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
