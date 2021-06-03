import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { getPatientParam } from 'fhirclient/lib/lib';
import { Observable } from 'rxjs';
import { filter, map, pluck, switchMap } from 'rxjs/operators';
import { IRegistration } from 'src/Interfaces/IRegistration';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  user: IRegistration = {
    firstName: 'Jane',
    lastName: 'Doe',
    MotherDoB: new Date(),
    EstDueDate: new Date(),
    Diagnosis: '',
    hospital: ['CCHMC'],
  }
  uid: string = '';
  userInfo = {} as Observable<IRegistration>
  patient = this.afa.user;
  patientInfo = this.afs;

  constructor(private afa: AngularFireAuth, private afs: AngularFirestore) { }

  //Updates User Info above when a registered person is logged in
  async updatePatient(patient: IRegistration): Promise<void>{
    this.userInfo.pipe(map(client => client = patient));
  }

  async createPatient(newPatient: IRegistration, email: string, password: string): Promise<boolean | void>{
    try{
      await this.afa.createUserWithEmailAndPassword(email, password);

      this.patient.subscribe((user) => {
        if (user) {
          const uniqueID = user.uid;
          this.patientInfo.collection('patients').doc(uniqueID).set(newPatient)
        }
      })
      return true;
    }
    catch(e){
      console.log(e.code)
      if(e.code == "auth/email-already-in-use"){
        return false;
        //Promise.reject;
      }
    }
  }

  //FIXME: Finish this function
  async createPatientPhone(newPatient: IRegistration, phone: string): Promise<void>{
    //const appVerifier = this.afa
    //this.afa.signInWithPhoneNumber(phone, window.)

    this.patient.subscribe((user) => {
      if (user) {
        const uniqueID = user.uid;
        this.patientInfo.collection('patients').doc(uniqueID).set(newPatient)
      }
    })
  }

  async createNonRegisteredPatient(newPatient: IRegistration, EmailOrPhone: string) {
    this.afs.collection('patients').doc(EmailOrPhone).set(newPatient);
    //Send auth depending on phone or email
    const email = true;
    if(email){

    }
    else{

    }
  }

  async updateNonRegisteredPatient(EmailOrPhone: string, password: string) {
    //check for @ symbol to determine phone or email
    const email = true;
    if(email){
      this.afa.createUserWithEmailAndPassword(EmailOrPhone, password);
      this.patient.subscribe((user) => {
        if (user) {
          const uniqueID = user.uid;
          const userInfo = this.afs.collection('patients').doc(EmailOrPhone);
          this.patientInfo.collection('patients').doc(uniqueID).set(userInfo);
          this.afs.collection('patients').doc(EmailOrPhone).delete();
        }
      })
    }
    else{

    }
  }

  getPatient(): Observable<IRegistration | undefined> {
    const info  = this.patient.pipe(
      filter(u => u != null),
      switchMap( u => this.afs
        .collection('patients')
        .doc<IRegistration>(u?.uid)
        .get().pipe(map(doc => doc.data()))
      )
    )
    return info;
  }
}
