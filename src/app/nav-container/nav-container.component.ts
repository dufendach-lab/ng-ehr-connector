import {Component, OnInit, ViewChild} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable, of, pipe} from 'rxjs';
import {filter, first, map, shareReplay, switchMap} from 'rxjs/operators';
import {Router} from "@angular/router";
import {FhirAuthService} from "../fhir-auth.service";
import {AuthService} from "../auth.service";
import { IRegistration } from 'src/Interfaces/IRegistration';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-nav-container',
  templateUrl: './nav-container.component.html',
  styleUrls: ['./nav-container.component.scss']
})
export class NavContainerComponent implements OnInit {

  @ViewChild('drawer') drawer: any;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  readonly isAuth = this.auth.authorized;
  readonly isAuth2 = this.ehrAuth.user;
  userInfo: Observable<IRegistration | undefined>;
  nameConcat = '';

  constructor(private breakpointObserver: BreakpointObserver,
              private router: Router,
              private auth: FhirAuthService,
              private ehrAuth: AuthService,
              private afs: AngularFirestore,
              private afa: AngularFireAuth,
  ) {
    this.userInfo = this.ehrAuth.user.pipe(
      filter(u => u != null),
      switchMap(u => this.afs
        .collection('patients')
        .doc<IRegistration>(u?.uid)
        .get().pipe(map(doc => doc.data()))
      )
    )
  }

  ngOnInit(): void {
    this.userInfo.subscribe(user => {
      if (user) {
        this.nameConcat = user.firstName + ' ' + user.lastName
      }
    })
    
  }

  // Clears session storage and redirects to simulate logout
  logout(): void {
    this.ehrAuth.signout();
    this.auth.logOut();
    this.router.navigate(['/']);
  }

  // Closes sidenav after selection
  closeSideNav() {
    if(this.drawer._mode==="over"){
      this.drawer.close();
    }
  }

  checkAdmin(){
    return this.afa.user.pipe(switchMap((user) => {
      // If there is no user (i.e. no one is logged in), return an observable of "false" - i.e. not allowed to activate
      if (!user) return of(false)
      
     

      // Otherwise, get the user details (TODO: Change this to User Service)
      // If the user has the role admin, then return true otherwise return false again
      return this.afs
        .collection('patients')
        .doc<IRegistration>(user.uid)
        .valueChanges()
        .pipe(
          first(),
          map(iReg => iReg !== undefined && iReg.role === 'Admin')
        )
    }))   
  } 


}
