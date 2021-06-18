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

  async getObservation(code: string): Promise<Observation | Bundle> {
    const client = await this.auth.client.pipe(first(c => c !== null)).toPromise();
    if (client) {
      const patientID = client.getPatientId();
      // console.log(`PID: ${patientID}`);

      const res = await client.request(`/Observation?patient=${patientID}&code=${code}`);
      // console.log(`RESULT: ${res}`);
      // console.log(res);
      return res;

    } else {
      return Promise.reject('client is null');
    }
  }

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

  // ALL OLD BELOW
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
