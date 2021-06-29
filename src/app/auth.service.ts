import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afa: AngularFireAuth) { }

  user = this.afa.user
  //Register new users
  registration(userName: string, passWord:string) :void{

  }

  //Check creditionals against backend
  checkCreditionals(email: string, pword: string) {
    return this.afa.signInWithEmailAndPassword(email, pword);
  }

  //Makes Login Auth True after it hasben verfied
  setLoginAuth(val: string) :void{
    //this.LoginAuth = val;
    sessionStorage.setItem('LoginAuth', val)
  }

  getLoginAuth() :string | null{
    const status = (sessionStorage.getItem('LoginAuth')? sessionStorage.getItem('LoginAuth') : 'false')
    //Done for data validation
    if((status != 'true')&&(status == 'false')){
      return 'false';
    }
    else{
      return status;
    }
    //return this.LoginAuth;
  }

  signout(){
    this.afa.signOut();
  }

  //If authenticated then allow for own information
  authorizeInfo() :void{
  }

  //Allow authentication as admin
  adminAuth() :void{

  }

}
