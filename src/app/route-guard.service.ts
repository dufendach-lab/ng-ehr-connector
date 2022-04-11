import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from "./auth.service";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate, CanActivateChild {

  constructor(private router: Router, private auth: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot) {
    return this.auth.isEmployee().pipe(map(isEmployee => {
      if (isEmployee) {
        return true
      }

      console.warn('Access denied - staff only')
      return this.router.parseUrl('/landing');
    }))
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot)  {
    return this.canActivate(childRoute);
  }
}

