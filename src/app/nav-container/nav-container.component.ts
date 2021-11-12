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

  /**
   * Clears session storage and redirects to simulate logout
   */
  logout(): void {
    this.ehrAuth.signout();
    this.auth.logOut();
    this.router.navigate(['/']);
  }

  /**
   * Closes sidenav after selection
   */
  closeSideNav() {
    if(this.drawer._mode==="over"){
      this.drawer.close();
    }
  }




  checkAdmin() : boolean{ 
    if((this.router.url).includes('admin')){
      return true;
    }
    else {
      return false
    }
    
  } 

  checkUser(){
    if((this.router.url).includes('u')){
      return true;
    }
    else {
      return false
    }   
  }

}
