import { Injectable } from '@angular/core';
import {first} from 'rxjs/operators';
import { FhirAuthService } from './fhir-auth.service';

import { fhirclient }from 'fhirclient/lib/types';
import Bundle = fhirclient.FHIR.Bundle;
import Observation = fhirclient.FHIR.Observation;

@Injectable({
  providedIn: 'root'
})
export class ObservationService {
  constructor(private auth: FhirAuthService) { }

  // Used for loinc code testing - Ready for actual use when real patients are acquired
  async getObservation(): Promise<Observation | Bundle> {
    const client = await this.auth.client.pipe(first(c => c !== null)).toPromise();
    if (client) {
      const patientID = client.getPatientId();
      // console.log(`PID: ${patientID}`);

      const res = await client.request(`/Observation?patient=${patientID}&code=46582-3`);
      console.log(`RESULT: ${res}`);
      console.log(res);
      return res;
      // Not working: 89269-5, 85353-1, 76689-9, 76516-4
      // Empty: 52482-7, 8339-4, 3137-7, 11984-2, 11502-2, 73761-9, 57129-9, 73757-7, 72147-2, 63893-2, 64710-7, 68328-4
      // Fully working: 8302-2 (body height)
    } else {
      return Promise.reject('client is null');
    }
  }

  // Used to get observations based on category name (vitals, laboratory)
  async getObservationByCategory(category: string): Promise<Observation | Bundle> {
    const client = await this.auth.client.pipe(first(c => c !== null)).toPromise();
    if (client) {
      const patientID = client.getPatientId();
      console.log(`PID: ${patientID}`);

      const res = await client.request(`/Observation?patient=${patientID}&category=${category}`);
      // console.log(`RESULT: ${res}`);
      // console.log(res);
      return res;

    } else {
      return Promise.reject('client is null');
    }
  }

  // Used to retrieve different patient data types (Medication, Procedures, Conditions)
  async getData(type: string) : Promise<Observation | Bundle> {
    const client = await this.auth.client.pipe(first(c => c !== null)).toPromise();
    if (client) {
      const patientID = client.getPatientId();
      console.log(`PID: ${patientID}`);

      const res = await client.request(`/${type}?patient=${patientID}`);
      // console.log(`RESULT: ${res}`);
      // console.log(res);
      return res;

    } else {
      return Promise.reject('client is null');
    }
  }

}
