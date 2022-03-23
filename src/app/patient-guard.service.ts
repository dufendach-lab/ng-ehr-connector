import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from "./auth.service";
import {take, map, tap, first} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PatientGuardService implements CanActivate{

  constructor(public router: Router, private auth: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot) {
    return this.auth.testing$.pipe(
      first(),
      map(user => {
        if (user && user.roles.includes("Patient")) {
          return true;
        }

        console.warn('Access denied - patients only');
        return this.router.parseUrl('admin');
      })
    );

  }

}
