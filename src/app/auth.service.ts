import { Injectable } from '@angular/core';
import {from, Observable, Subject} from "rxjs";
import {map, shareReplay} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //private LoginAuth: boolean = false;
  constructor() { }

  //Register new users
  registration(userName: string, passWord:string) :void{

  }
  //Check creditionals against backend
  checkCreditionals() :void{

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
