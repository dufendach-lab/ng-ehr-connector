import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { filter, map, pluck, switchMap } from 'rxjs/operators';
import { IRegistration } from 'src/Interfaces/IRegistration';
import { AngularFirestore } from '@angular/fire/firestore';
import { IGravidasDetails } from 'src/Interfaces/IGravidasDetails'
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  user: IRegistration = {
    firstName: 'Jane',
    lastName: 'Doe',
    MotherDoB: new Date(),
    phone: '+11111111111'
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

  async createPatient(email: string, password: string): Promise<boolean | void>{
    try{
      await this.afa.createUserWithEmailAndPassword(email, password);
    }
    catch(e){
      console.log(e.code)
      if(e.code == "auth/email-already-in-use"){
        return false;
      }
    }
  }

  async createPatientInfo(newPatient: IRegistration): Promise<void> {
    this.patient.subscribe((user) => {
        if (user) {
          const uniqueID = user.uid;
          this.patientInfo.collection('patients').doc(uniqueID).set(newPatient)
        }
      })
  }

  async createGravidas(gravidas: IGravidasDetails) : Promise<void> {
    const docName = new Date(gravidas.EstDueDate);
    const docNameString = docName.toISOString().substr(0,10);
    this.patient.subscribe((user) => {
      if (user) {
        const uniqueID = user.uid;
        this.patientInfo.collection('patients').doc(uniqueID).collection('gravidas').doc(docNameString).set(gravidas)
      }
    })
  }

  async createOtherGravidas(gravidas: IGravidasDetails, patID: string) : Promise<void> {
    const docName = new Date(gravidas.EstDueDate);
    const docNameString = docName.toISOString().substr(0,10);
    this.patientInfo.collection('patients').doc(patID).collection('gravidas').doc(docNameString).set(gravidas)
  }

  async changeGravidasStatus(gravidas: IGravidasDetails) : Promise<void> {
    const docName = gravidas.gravidasTitle;
    console.log(docName);
    this.patient.subscribe((user) => {
      if (user) {
        const uniqueID = user.uid;
        this.patientInfo.collection('patients').doc(uniqueID).collection('gravidas').doc(docName).update({givenBirth: gravidas.givenBirth})
      }
    })
  }

  async changeDocDate(gravidas: IGravidasDetails): Promise<void> {
    const name = new Date(gravidas.EstDueDate.seconds * 1000);
    const docNameString = name.toISOString().substr(0,10);
    const now = new Date(Date.now() + (1.8144e9));
    const newName = now.toISOString().substr(0,10);

    this.patient.subscribe((user) => {
      if(user) {
        const id = user.uid;
        this.patientInfo.collection('patients').doc(id).collection('gravidas').doc(docNameString).get().subscribe(d => {
          const data = d.data();
          if(d && data) {
            this.patientInfo.collection('patients').doc(id).collection('gravidas').doc(newName).set(data);
          }
        });
      }
    })
  }

  async deleteDocDate(gravidas: IGravidasDetails): Promise<void> {
    if(gravidas) {
      const name = new Date(gravidas.EstDueDate.seconds * 1000);
      const docNameString = name.toISOString().substr(0,10);
      this.patient.subscribe((user) => {
        if(user) {
          const id = user.uid;
          this.patientInfo.collection('patients').doc(id).collection('gravidas').doc(docNameString).delete();
        }
      })
    }
  }

  // async getGravidas(): Observable<IGravidasDetails[]> {
  //   let uID = "";
  //   this.patient.subscribe(user => {
  //     if(user){
  //       uID = user.uid;
  //     }
  //   })

  //   // const dbRef = this.afs.collection('patients').doc(uID).collection('gravidas');
  //   // const snapShot = await dbRef.get();
  //   // snapShot.forEach(doc => {
  //   //   console.log(doc.forEach(docu => {
  //   //     console.log(docu.data());
  //   //   }))
  //   // })

  //   //const snapShot = await this.afs.collection('patients').doc(uID).collection('gravidas').get();
  //   return this.afs.collection()
  // }

  getGravidas(): Observable<IGravidasDetails[]> {
    return this.afa.user.pipe( // Pipe from the "user" object because first need a signed-in user
      switchMap((user) => {
        if (user) {
          return this.afs
            .collection('patients')
            .doc(user.uid) // User ID is obtained from the piped user
            .collection<IGravidasDetails>('gravidas')
            .valueChanges() // This is the Observable that can be returned
        }
        return Promise.reject(new Error('User not defined'));
      }),
      map(gravidas => { // This map converts a Firestore Timestamp to a JavaScript Date object
        const exercises: IGravidasDetails[] = [];
        gravidas.forEach(gravida => {
          exercises.push(gravida);
        });
        return exercises;
      })
    )
  }

  getOtherGravidas(patID: string): Observable<IGravidasDetails[]> {
    return this.afa.user.pipe(
      switchMap((user) => {
        if(user) {
          return this.afs
            .collection('patients')
            .doc(patID)
            .collection<IGravidasDetails>('gravidas')
            .valueChanges()
      }
      return Promise.reject(new Error('User not defined'));
      }),
        map(gravidas => {
          const pregs: IGravidasDetails[] = [];
            gravidas.forEach(gravida => {
              if(gravida.EstDueDate){
                const gravDate = gravida.EstDueDate.toDate();
                gravida.EstDueDate = gravDate;
                gravida.gravidasTitle = gravDate.toISOString().substr(0,10);
              }
              pregs.push(gravida);
            });
            return pregs;
        })
    )
    // return this.afs
    //         .collection('patients')
    //         .doc(patID) // User ID is obtained from the piped user
    //         .collection<IGravidasDetails>('gravidas')
    //         .valueChanges() // This is the Observable that can be returned

    //   map(gravidas => { // This map converts a Firestore Timestamp to a JavaScript Date object
    //     const exercises: IGravidasDetails[] = [];
    //     gravidas.forEach(gravida => {
    //       exercises.push(gravida);
    //     });
    //     return exercises;
    //   })
    // )
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
