import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {AuthService} from "./auth.service";
import {first, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {

  constructor(private router: Router, private auth: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot) {
    return this.auth.testing$.pipe(
      first(),
      map(user => {
        if (user && user.roles.includes("Admin")) {
          return true;
        }

        console.warn('Access denied - staff only')
        return this.router.parseUrl('/landing');
      })
    )
  }
}

