import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { IRegistration } from 'src/Interfaces/IRegistration';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireFunctions } from "@angular/fire/compat/functions";
import {take} from "rxjs/operators";

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

  createPatient(email: string, password: string, phoneNumber: string) {
    return new Promise( (resolve) => {
      const creating = this.aff.httpsCallable('createUser');
      creating({email, password, phoneNumber}).pipe(take(1)).subscribe((val) => {
        const res = val.uid;
        resolve(res);
      });
    })
  }

  async createPatientInfo(uid: any, newPatient: IRegistration): Promise<void> {
      await this.afs.collection('patients').doc(uid).set(newPatient);
      const role = ["Patient"]
      await this.afs.collection('users').doc(uid).set({role});
  }

  deletePatient(uid: string) {
    this.afs.collection('patients').doc(uid).collection('gravidas').get().pipe(take(1)).subscribe(async (item) => {
      await this.afs.collection('patients').doc(uid).collection('gravidas').doc(item.docs[0].id).delete();
    });
    this.afs.collection('patients').doc(uid).delete();
    this.afs.collection('users').doc(uid).delete();
    const deleting = this.aff.httpsCallable('deleteUser');
    deleting({uid}).pipe().subscribe(() => {});
  }
}
