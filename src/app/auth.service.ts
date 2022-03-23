import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {Observable, of} from 'rxjs';
import {first, map, switchMap} from 'rxjs/operators';
import {IRegistration, Role} from 'src/Interfaces/IRegistration'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly user = this.afa.user
  readonly testing$: Observable<IRegistration | null | undefined>;

  isLoggedIn;

  constructor(private afa: AngularFireAuth, private afs: AngularFirestore) {
    this.testing$ = this.afa.authState.pipe(switchMap(user => {
      if (user) {
        this.isLoggedIn = true;
        return this.afs.collection<IRegistration>('patients').doc(user.uid).valueChanges()
      } else {
        this.isLoggedIn = false;
        return of(null)
      }
    }))

    this.testing$.pipe(first()).subscribe(); // hack to be sure this is called at least once
  }


  /*
  * Signs in to firebase with email & password
  */
  checkCreditionals(email: string, pword: string) {
    return this.afa.signInWithEmailAndPassword(email, pword);
  }

  /*
  * Signs in to firebase with phone number
  */
  phoneLogin(phoneNum: string, appVerifier: any) {
    return this.afa.signInWithPhoneNumber(phoneNum, appVerifier);
  }

  /*
  * Signs user out of firebase auth
  */
  signout() {
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
  GetAllPats(): Observable<IRegistration[]> {
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
          if (curPat.MotherDoB) {
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
  isPatient() {
    return this.hasRole(['Patient'])
  }

  isEmployee() {
    return this.hasRole(['Admin', 'Staff'])
  }

  // determines if user has matching role
  hasRole(allowedRoles: Role[]) {
    return this.testing$.pipe(
      map(user => user?.roles && user.roles.some(r=> allowedRoles.indexOf(r) >= 0))
    );
  }
}
