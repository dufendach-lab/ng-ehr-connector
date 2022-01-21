import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { IRegistration } from 'src/Interfaces/IRegistration';
import { AngularFirestore } from '@angular/fire/compat/firestore';

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
    private afs: AngularFirestore) { }

  //Updates User Info above when a registered person is logged in
  // async updatePatient(patient: IRegistration): Promise<void>{
  //   this.userInfo.pipe(map(client => client = patient));
  // }

  async createPatient(email: string, password: string): Promise<boolean | void>{
    try{
      await this.afa.createUserWithEmailAndPassword(email, password);
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
