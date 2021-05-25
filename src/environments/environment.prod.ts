// git update-index --assume-unchanged .\src\environments\environment.ts

import * as data from '../assets/EpicEndpoints.json';

export const environment = {
  production: true,
  epicEnv: data,

  firebase: {
    apiKey: '',
    authDomain: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
    measurementId: ''
  }
};
