import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {AuthService} from "./auth.service";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PatientGuardService implements CanActivate {

  constructor(private router: Router, private auth: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot) {
    if (!this.auth.isLoggedIn) {
      return this.router.parseUrl('/launch');
    }

    return this.auth.isEmployee().pipe(map(isEmployee => {
      if (!isEmployee) {
        return true
      }

      console.warn('Access denied - patients only')
      return this.router.parseUrl('/staff/landing');
    }))

  }
}
