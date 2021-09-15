import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {IRegistration} from '../Interfaces/IRegistration'

@Injectable({
  providedIn: 'root'
})
export class UserRouteGuard implements CanActivate {
  constructor(public router: Router,
    private afa: AngularFireAuth,
    private afs: AngularFirestore) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {



    return true;
  }
  
}
