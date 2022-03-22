import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {AuthService} from "./auth.service";
import {first, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PatientGuardService implements CanActivate {

  constructor(private router: Router, private auth: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot) {

    return this.auth.testing$.pipe(
      first(),
      map(user => {
        if (user && user.roles.includes('Patient')) {
          return true
        }

        console.warn('Access denied - patients only')
        return this.router.parseUrl('/staff/landing');
      })
    )

  }
}
