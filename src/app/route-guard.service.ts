import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate{

  constructor(public router: Router) {}


  canActivate(route: ActivatedRouteSnapshot): boolean {
    console.log(localStorage.getItem('UserRole'));
    if(localStorage.getItem('UserRole') == 'Admin') {
      console.log('ACCESS GRANTED');
      return true;
    } else if (localStorage.getItem('UserRole') == 'Moderator') {
      console.log('ACCESS GRANTED');
      return true;
    } else {
      this.router.navigateByUrl('/landing');
      return false;
    }
  }

}

