import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { getPatientParam } from 'fhirclient/lib/lib';
import { Observable } from 'rxjs';
import { map, pluck, switchMap } from 'rxjs/operators';
import { IRegistration } from 'src/Interfaces/IRegistration';
import { AngularFirestore } from '@angular/fire/firestore';
//import firebase from 'firebase/app';
//import User = firebase.User

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
  //private userDetails = {} as User;

  constructor(private afa: AngularFireAuth, private afs: AngularFirestore) { }

  //Updates User Info above when a registered person is logged in
  async updatePatient(patient: IRegistration): Promise<void>{
    //console.log('update');
    //console.log(this.user);
    this.userInfo.pipe(map(client => client = patient));
  }

  async createPatient(newPatient: IRegistration, email: string, password: string): Promise<void>{
    console.log(newPatient);
    console.log(email);
    console.log(password);
    this.afa.createUserWithEmailAndPassword(email, password)
    // .then(() => {
    //   this.patientInfo.collection('paients').doc(this.patient.pipe(map(x => x?.uid))).set(newPatient)
    // });
    // this.patient.pipe(
    //   map(x => x?.uid.toString())
    // )
    // this.afs.collection('patients')
    //const uniueID;
    //this.patient.pipe(pluck('uid'));
    //this.afs.collection('patients').doc(this.patient.subscribe((u => u?.uid))).set(newPatient);

    this.patient.subscribe((user) => {
      if (user) {
        const uniqueID = user.uid;
        this.patientInfo.collection('patients').doc(uniqueID).set(newPatient)
      }
    })
    //await this.patientInfo.collection('patients').doc(this.userDetails.uid).set(newPatient)
  }

  async getPatient(): Promise<IRegistration> {
    //console.log('get');
    //console.log(this.user);
    this.userInfo.subscribe(dt => this.user)
    return this.user;
  }
}
