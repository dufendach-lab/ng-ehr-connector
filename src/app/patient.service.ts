import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { FhirAuthService } from './fhir-auth.service';
import { filter, switchMap } from 'rxjs/operators';
import Client from 'fhirclient/lib/Client';
import Patient from "fhirclient/lib/Client"

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  public readonly patient: Observable<Patient>;

  patientID: string|null = null;

  constructor(
    private auth: FhirAuthService,
  ) {
    this.patient = auth.client.pipe(
      filter(client => client !== null),
      switchMap(client => {
        if (client !== null) {
          this.patientID = client.getPatientId();
          return from(client.request(`Patient/${client.patient.id}`));
        } else {
          return of(null);
        }
      })
    )
   }
}
