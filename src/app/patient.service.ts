import { Injectable } from '@angular/core';
import { from, Observable, of, Subject } from 'rxjs';
import { FhirAuthService } from './fhir-auth.service';
import { filter, switchMap } from 'rxjs/operators';

import { fhirclient }from 'fhirclient/lib/types';
import Patient = fhirclient.FHIR.Patient;

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  public readonly patient: Observable<Patient>;

  public readonly patientID = new Subject<string>();

  constructor(
    private auth: FhirAuthService,
  ) {
    this.patient = auth.client.pipe(
      filter(client => client !== null),
      switchMap(client => {
        if (client !== null) {
          const pid = client.getPatientId();
          if (pid !== null) this.patientID.next(pid);

          return from(client.request(`Patient/${client.patient.id}`));
        } else {
          return of(null);
        }
      })
    )
   }
}
