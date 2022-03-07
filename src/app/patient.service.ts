import { Injectable } from '@angular/core';
import { from, Observable, of, Subject } from 'rxjs';
import { FhirAuthService } from './fhir-auth.service';
import {filter, first, switchMap, take} from 'rxjs/operators';
import {fhirclient} from 'fhirclient/lib/types';
import Patient = fhirclient.FHIR.Patient;
import {AngularFireFunctions} from "@angular/fire/compat/functions";
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  public readonly patient: Observable<Patient>;

  public readonly patientID = new Subject<string>();

  constructor(
    private auth: FhirAuthService,
    private aff: AngularFireFunctions,
    private afs: AngularFirestore
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

  updatePatientInfo(uid: string, phoneNumber: string) {
   return new Promise( (resolve, reject) => {
     const updating = this.aff.httpsCallable('updateUser');

     updating({uid, phoneNumber}).pipe(first()).subscribe((val) => {
       if(val.uid) {
         resolve('Success');
       } else {
         reject('Failed to update');
       }
     });
   })
  }
  async updateStoreName(uid: any, fName: string, lName: string) {
    const firstName = fName, lastName = lName;
    await this.afs.collection('patients').doc(uid).update({firstName, lastName});
  }
}
