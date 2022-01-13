import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import {filter, map, switchMap} from 'rxjs/operators';
import { IRegistration } from 'src/Interfaces/IRegistration'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  role: string = '';

  constructor(private afa: AngularFireAuth, private afs: AngularFirestore) {
    this.setRoles();
  }

  user = this.afa.user

  //Check creditionals against backend to see if account exist
  checkCreditionals(email: string, pword: string) {
    return this.afa.signInWithEmailAndPassword(email, pword);
  }

  //Signs user out of firebase authenication
  signout(){
    this.afa.signOut();
  }

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

  setRoles() {
    let userInfo: Observable<IRegistration | undefined>
    userInfo = this.user.pipe(
      filter(u => u != null),
      switchMap(u => this.afs
        .collection('patients')
        .doc<IRegistration>(u?.uid)
        .get().pipe(map(doc => doc.data()))
      )
    )
    userInfo.subscribe(user => {
      if (user) {
        this.role = user.role;
        if(this.role == 'Admin' || this.role == 'Moderator') {
          localStorage.setItem('UserRole', 'Admin');
        } else {
          localStorage.setItem('UserRole', 'User');
        }
      }
    })
  }

}
