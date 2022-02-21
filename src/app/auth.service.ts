import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { IRegistration } from 'src/Interfaces/IRegistration'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afa: AngularFireAuth, private afs: AngularFirestore) {
    this.testing$ = this.afa.authState.pipe(switchMap(user => {
      if(user) {
        return this.afs.collection<IRegistration>('patients').doc(user.uid).valueChanges()
      } else {
        return of(null)
      }
    }))
  }

  user = this.afa.user
  testing$: Observable<IRegistration | null | undefined>;

  /*
  * Signs in to firebase with email & password
  */
  checkCreditionals(email: string, pword: string) {
    return this.afa.signInWithEmailAndPassword(email, pword);
  }

  /*
  * Signs in to firebase with phone number
  */
  phoneLogin (phoneNum: string, appVerifier: any) {
    return this.afa.signInWithPhoneNumber(phoneNum, appVerifier);
  }

  /*
  * Signs user out of firebase auth
  */
  signout(){
    this.afa.signOut().then(() => {
      console.log('Signed out of firebase authentication');
    }, (error) => {
      console.error('Error signing out of firebase authentication', error)
    })
  }

  /*
  * Gets all patients from firestore 'patient' collection
  * Used in admin-list component
  */
  GetAllPats():  Observable<IRegistration[]> {
    return this.afa.user.pipe( // Pipe from the "user" object because first need a signed-in user
      switchMap((user) => {
        if (user) {
          return this.afs
            .collection<IRegistration>('patients').auditTrail().pipe(
              map(actions => actions.map(a => {
                const data = a.payload.doc.data() as IRegistration;
                data.docName = a.payload.doc.id;
                return data;
              }))
            )
        }
        return Promise.reject(new Error('User not defined'));
      }),
      map(regPatient => { // This map converts a Firestore Timestamp to a JavaScript Date object
        const patients: IRegistration[] = [];
        regPatient.forEach(curPat => {
          if(curPat.MotherDoB){
            // const momDoB = curPat.MotherDoB.toDate();
            // curPat.MotherDoB = momDoB;
          }
          patients.push(curPat);
        });
        return patients;
      })
    )
  }

  /*
  * Role based authentication helper functions
  * Used in route guard services
  */
  isPatient(user: IRegistration): boolean {
    const allowed = ['Patient']
    return this.checkAuth(user, allowed);
  }

  isEmployee(user: IRegistration): boolean {
    const allowed = ['Admin', 'Staff']
    return this.checkAuth(user, allowed)
  }

  // determines if user has matching role
  private checkAuth(user: IRegistration, allowedRoles: string[]): boolean {
    if(!user) { return false }
    for(const role of allowedRoles) {
      if(user.roles[role]) {
        return true
      }
    }
    return false
  }
}
