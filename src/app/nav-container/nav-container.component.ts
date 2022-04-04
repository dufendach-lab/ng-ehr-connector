import {Component, OnInit, ViewChild} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {filter, map, shareReplay, switchMap} from 'rxjs/operators';
import {Router} from "@angular/router";
import {FhirAuthService} from "../fhir-auth.service";
import {AuthService} from "../auth.service";
import { IRegistration } from 'src/Interfaces/IRegistration';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {PatientStateService, PregState} from "../patient-state.service";

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
  isPat = true;

  userState: PregState | undefined;
  colorState: string = '#ca5699';
  controlState = PregState;

  constructor(private breakpointObserver: BreakpointObserver,
              public router: Router,
              private auth: FhirAuthService,
              private ehrAuth: AuthService,
              private afs: AngularFirestore,
              private stateService: PatientStateService
  ) {
    this.userInfo = this.ehrAuth.user.pipe(
      filter(u => u != null),
      switchMap(u => this.afs
        .collection('patients')
        .doc<IRegistration>(u?.uid)
        .get().pipe(map(doc => doc.data()))
      )
    )

    this.stateService.getPatientState().subscribe(data => {
      if (data) {
        this.userState = this.stateService.getStateEnum(data[data.length - 1].pregnancyStatus);
        if (this.userState) {
          this.colorState = this.stateService.setColor(this.userState);
        }
      }
    });


  }

  ngOnInit(): void {
    this.userInfo.subscribe(user => {
      if (user) {
        this.nameConcat = user.firstName + ' ' + user.lastName
        this.isPat = user.roles.includes('Patient');
      }
    })
  }

  /*
  * Clears session storage and redirects to completely logout
  */
  logout(): void {
    this.ehrAuth.signout();
    this.auth.logOut();
    localStorage.clear();
    this.router.navigate(['/launch']);
  }

  closeSideNav() {
    if(this.drawer._mode==="over"){
      this.drawer.close();
    }
  }

  isHomeRoute() {
    if(this.router.url === '/landing' || this.router.url === '/admin') {
      return true;
    } else {
      return false;
    }
  }
}
