import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {from, Observable, Subject} from "rxjs";
import {map, shareReplay} from "rxjs/operators";
import { IRegistration } from 'src/Interfaces/IRegistration';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //private LoginAuth: boolean = false;
  constructor(private afa: AngularFireAuth) { }

  user = this.afa.user  //{} as Observable<IRegistration | string>;
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
    // const loginStatus = this.LoginAuth
    // if(this.LoginAuth == false){
    //   return false;
    // }
    // else if(this.LoginAuth == true){
    //   return true;
    // }
    // else{
    //   return false
    // }
  }

  //Allow authentication as admin
  adminAuth() :void{

  }

}
