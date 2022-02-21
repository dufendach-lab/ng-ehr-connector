import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from "./auth.service";
import { take, map, tap} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate{

  constructor(public router: Router, private auth: AuthService) {}


  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.auth.testing$.pipe(
      take(1),
      map(user => !!(user && user.roles.includes("Admin"))),
      tap(isStaff => {
        if(!isStaff) {
          this.router.navigate(['../landing'])
          console.error('Access denied - staff only')
        }
      })
    )
  }

}

