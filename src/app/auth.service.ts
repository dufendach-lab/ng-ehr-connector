import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  //Register new users
  registration(userName: string, passWord:string) :void{

  }
  //Check creditionals against backend
  checkCreditionals() :void{

  }

  //If authenticated then allow for own information
  authorizeInfo() :void{

  }

  //Allow authentication as admin
  adminAuth() :void{

  }

}
