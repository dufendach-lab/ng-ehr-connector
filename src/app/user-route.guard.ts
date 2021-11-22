import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';
import {IRegistration} from '../Interfaces/IRegistration'

@Injectable({
  providedIn: 'root'
})
export class UserRouteGuard implements CanActivate {
  constructor(public router: Router,
    private afa: AngularFireAuth,
    private afs: AngularFirestore) {}

    canActivate(): Observable<boolean> {
      return this.afa.user.pipe(switchMap((user) => {
        // If there is no user (i.e. no one is logged in), return an observable of "false" - i.e. not allowed to activate
        if (!user) return of(false);
  
        // Otherwise, get the user details (TODO: Change this to User Service)
        // If the user has the role admin, then return true otherwise return false again
        return this.afs
          .collection('patients')
          .doc<IRegistration>(user.uid)
          .valueChanges()
          .pipe(
            first(),
            map(iReg => iReg !== undefined && iReg.role === 'User')
          )
      }))
     
    }
  
}