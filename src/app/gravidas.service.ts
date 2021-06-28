import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
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
    if(patID == ""){
      this.afs.collection('Errors').doc('Gravidas').collection('OtherGravidas').doc(Date()).set({message: "Something wrong"});
    }
    else{
      const docName = new Date(gravidas.EstDueDate);
      const docNameString = docName.toISOString().substr(0,10);
      this.patientInfo.collection('patients').doc(patID).collection('gravidas').doc(docNameString).set(gravidas)
    }
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
                gravida.gravidasTitle = (gravida.gravidasTitle) ? gravida.gravidasTitle : gravDate.toISOString().substr(0,10);
              }
              pregs.push(gravida);
            });
            return pregs;
        })
    )
  }

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

  async EditOtherGravidas(preg: IGravidasDetails, patID: string | undefined) : Promise<void>{
    if(patID){
      this.afs.collection('patients').doc(patID).collection('gravidas').doc(preg.gravidasTitle).update(preg);
    }
    else{
      this.afs.collection('Errors').doc('Gravidas').collection('EditGravidas').doc(Date()).set({message: "Something wrong"});
    }
  }

  async DeleteOtherGravidas(preg: IGravidasDetails, patID: string | undefined) : Promise<void>{
    if(patID){
      this.afs.collection('patients').doc(patID).collection('gravidas').doc(preg.gravidasTitle).delete();
    }
    else{
      this.afs.collection('Errors').doc('Gravidas').collection('DeleteGravidas').doc(Date()).set({message: "Something wrong"});
    }
  }
}
