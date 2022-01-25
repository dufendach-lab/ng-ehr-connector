import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { IRegistration } from 'src/Interfaces/IRegistration';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireFunctions } from "@angular/fire/compat/functions";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  uid: string = '';
  userInfo = {} as Observable<IRegistration>
  patient = this.afa.user;
  patientInfo = this.afs;

  constructor(
    private afa: AngularFireAuth,
    private afs: AngularFirestore,
    private aff: AngularFireFunctions) { }

  //Updates User Info above when a registered person is logged in
  // async updatePatient(patient: IRegistration): Promise<void>{
  //   this.userInfo.pipe(map(client => client = patient));
  // }

  async createPatient(authStuff: any, newPat: IRegistration): Promise<boolean | void>{
    try {
      let creating = this.aff.httpsCallable('/createUser');
      creating({authStuff, newPat});
    }
    catch(error: any){
      if(error.code == "auth/email-already-in-use"){
        return false;
      }
    }
  }

  async createPatientInfo(newPatient: IRegistration): Promise<void> {
    this.patient.subscribe((user) => {
        if (user) {
          const uniqueID = user.uid;
          this.patientInfo.collection('patients').doc(uniqueID).set(newPatient)

          const accessLevel = {
            role: {
              Admin: false,
              Staff: false,
              Patient: true
            }
          };
          this.afs.collection('users').doc(uniqueID).set(accessLevel);
        }
      })
  }
}
