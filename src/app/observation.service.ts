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
      console.log(res);
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
      console.log(`RESULT: ${res}`);
      console.log(res);
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
      console.log(`RESULT: ${res}`);
      console.log(res);
      return res;

    } else {
      return Promise.reject('client is null');
    }
  }

  // // Only works on open-epic - no data on smartIT and 403 error on DSTU2
  // async getMedStatement(): Promise<Observation | Bundle> {
  //   const client = await this.auth.client.pipe(first(c => c !== null)).toPromise();
  //   if (client) {
  //     const patientID = client.getPatientId();
  //     console.log(`PID: ${patientID}`);

  //     const res = await client.request(`/MedicationStatement?patient=${patientID}`);
  //     console.log(`RESULT: ${res}`);
  //     console.log(res);
  //     return res;

  //   } else {
  //     return Promise.reject('client is null');
  //   }
  // }

  // // Works on all endpoints
  // async getImmunization(): Promise<Observation | Bundle> {
  //   const client = await this.auth.client.pipe(first(c => c !== null)).toPromise();
  //   if (client) {
  //     const patientID = client.getPatientId();
  //     console.log(`PID: ${patientID}`);

  //     const res = await client.request(`/Immunization?patient=${patientID}`);
  //     console.log(`RESULT: ${res}`);
  //     console.log(res);
  //     return res;

  //   } else {
  //     return Promise.reject('client is null');
  //   }
  // }

  // // Works on all endpoints
  // async getConditions(): Promise<Observation | Bundle> {
  //   const client = await this.auth.client.pipe(first(c => c !== null)).toPromise();
  //   if (client) {
  //     const patientID = client.getPatientId();
  //     console.log(`PID: ${patientID}`);

  //     const res = await client.request(`/Condition?patient=${patientID}`);
  //     console.log(`RESULT: ${res}`);
  //     console.log(res);
  //     return res;

  //   } else {
  //     return Promise.reject('client is null');
  //   }
  // }

  // // Works for all 3 - no data on DSTU2
  // async getProcedures(): Promise<Observation | Bundle> {
  //   const client = await this.auth.client.pipe(first(c => c !== null)).toPromise();
  //   if (client) {
  //     const patientID = client.getPatientId();
  //     console.log(`PID: ${patientID}`);

  //     const res = await client.request(`/Procedure?patient=${patientID}`);
  //     console.log(`RESULT: ${res}`);
  //     console.log(res);
  //     return res;

  //   } else {
  //     return Promise.reject('client is null');
  //   }
  // }

  // async getDocuments(): Promise<Observation | Bundle> {
  //   const client = await this.auth.client.pipe(first(c => c !== null)).toPromise();
  //   if (client) {
  //     const patientID = client.getPatientId();
  //     console.log(`PID: ${patientID}`);

  //     const res = await client.request(`/DocumentReference?patient=${patientID}`);
  //     console.log(`RESULT: ${res}`);
  //     console.log(res);
  //     return res;

  //   } else {
  //     return Promise.reject('client is null');
  //   }
  // }

}
