import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afa: AngularFireAuth) { }

  user = this.afa.user

  //Check creditionals against backend to see if account exist
  checkCreditionals(email: string, pword: string) {
    return this.afa.signInWithEmailAndPassword(email, pword);
  }

  //Signs user out of firebase authenication
  signout(){
    this.afa.signOut();
  }

}
