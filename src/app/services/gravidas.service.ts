import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IGravidasDetails } from 'src/Interfaces/IGravidasDetails'

@Injectable({
  providedIn: 'root'
})
export class GravidasService {

  patient = this.afa.user;
  patientInfo = this.afs;

  constructor(
    private afa: AngularFireAuth,
    private afs: AngularFirestore) { }

  // Create a new pregnancy for a user based off their firebase uID
  async createPregnancy(gravidas: IGravidasDetails, patID: string) : Promise<void> {
    const docName = new Date(gravidas.EstDueDate);
    const docNameString = docName.toISOString().substr(0,10);
    gravidas.gravidasTitle = docNameString;

    await this.patientInfo.collection('patients').doc(patID).collection('gravidas').doc(docNameString).set(gravidas);
  }

  // Gets all pregnancies for other user based on their firebase uID
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
                gravida.gravidasTitle = (gravida.gravidasTitle) ? gravida.gravidasTitle : gravDate.toISOString().substr(0,10);
              }
              pregs.push(gravida);
            });
            return pregs;
        })
    )
  }

  //Gets all pregnancies for currently signed in user
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
        const pregs: IGravidasDetails[] = [];
        gravidas.forEach(gravida => {
          if(gravida.EstDueDate){
            const gravDate = gravida.EstDueDate.toDate();
            gravida.EstDueDate = gravDate;
            gravida.gravidasTitle = (gravida.gravidasTitle) ? gravida.gravidasTitle : gravDate.toISOString().substr(0,10);
          }
          pregs.push(gravida);
        });
        return pregs;
      })
    )
  }

  // Updates pregnancy birthday for the currently signed in user
  async changeGravidasBirth(gravidas: IGravidasDetails) : Promise<void> {
    const docName = new Date(gravidas.EstDueDate.seconds * 1000);
    const docNameString = docName.toISOString().substr(0,10);
    this.patient.subscribe((user) => {
      if (user) {
        const uniqueID = user.uid;
        this.patientInfo.collection('patients').doc(uniqueID).collection('gravidas').doc(docNameString).update({givenBirth: gravidas.givenBirth})
      }
    })
  }

  // Updates pregnancy information for another user based on their firebase uID
  async EditOtherGravidas(preg: IGravidasDetails, patID: string | undefined) : Promise<void>{
    if(patID){
      await this.afs.collection('patients').doc(patID).collection('gravidas').doc(preg.gravidasTitle).update(preg);
    }
    else{
      await this.afs.collection('Errors').doc('Gravidas').collection('EditGravidas').doc(Date()).set({message: "Something wrong"});
    }
  }

  // Deletes pregnancy information for another user based on their firebase uID
  async DeleteOtherGravidas(preg: IGravidasDetails, patID: string | undefined) : Promise<void>{
    if(patID){
      this.afs.collection('patients').doc(patID).collection('gravidas').doc(preg.gravidasTitle).delete();
    }
    else{
      this.afs.collection('Errors').doc('Gravidas').collection('DeleteGravidas').doc(Date()).set({message: "Something wrong"});
    }
  }

  async changeGravidasStatus(gravidas: IGravidasDetails) : Promise<void> {
    const docName = gravidas.gravidasTitle;
    this.patient.subscribe((user) => {
      if (user) {
        const uniqueID = user.uid;
        this.patientInfo.collection('patients').doc(uniqueID).collection('gravidas').doc(docName).update({givenBirth: gravidas.givenBirth})
      }
    })
  }

  async changeDocDate(gravidas: IGravidasDetails): Promise<void> {
    const now = new Date(Date.now() + (1.8144e9));
    const newName = now.toISOString().substr(0,10);

    this.patient.subscribe((user) => {
      if(user) {
        this.patientInfo.collection('patients').doc(user.uid).collection('gravidas').doc(gravidas.gravidasTitle).get().subscribe(d => {
          let data = d.data();
          if(d && data) {
            data.gravidasTitle = newName;
            this.patientInfo.collection('patients').doc(user.uid).collection('gravidas').doc(newName).set(data);
          }
        });
      }
    })
  }

  async deleteDocDate(gravidas: IGravidasDetails): Promise<void> {
    if(gravidas) {
      this.patient.subscribe((user) => {
        if(user) {
          this.patientInfo.collection('patients').doc(user.uid).collection('gravidas').doc(gravidas.gravidasTitle).delete();
        }
      })
    }
  }
}
