import { Injectable } from '@angular/core';
import Bundle from 'fhirclient/lib/Client';
import Observation from "fhirclient/lib/Client"
import { first} from 'rxjs/operators';
import { FhirAuthService } from './fhir-auth.service';
import { PatientService } from './patient.service';

@Injectable({
  providedIn: 'root'
})
export class ObservationService {
  constructor(private auth: FhirAuthService, private ps: PatientService) { }
  
  async getObservation(code: string): Promise<Observation | Bundle> {
    const patientID = await this.ps.patientID.pipe(first()).toPromise();
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
