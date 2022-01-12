import { Injectable } from '@angular/core';
// import { AngularFireAuth } from '@angular/fire/compat/auth';
// import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
// import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate{

  constructor(public router: Router,
    // private afa: AngularFireAuth,
    // private afs: AngularFirestore
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    let role = "";
    // this.afa.user.pipe(
    //   switchMap((user) => {
    //     if(user){
    //       this.afs
    //         .collection('patients')
    //         .doc(user.uid)
    //     }
    //   }
    // ));
    if(role == "Admin"){
      return true;
    }
    else{
      return true;
    }
  }
}
