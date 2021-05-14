import { Injectable } from '@angular/core';
import { first} from 'rxjs/operators';
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
    const patientID = await this.auth.patientId.pipe(first()).toPromise();
    console.log(`PID: ${patientID}`);
    const client = await this.auth.client.pipe(first()).toPromise();
    if (client) {
      const res = await client.request(`/Observation?patient=${patientID}&code=${code}`);
      console.log(`RESULT: ${res}`);
      console.log(res);
      return res;

    } else {
      return Promise.reject('client is null');
    }
  }
}
