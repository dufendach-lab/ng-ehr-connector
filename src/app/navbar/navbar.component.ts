import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable, pipe } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { FhirAuthService } from '../fhir-auth.service';
import { RegistrationService } from '../registration.service';
import { IRegistration } from 'src/Interfaces/IRegistration';
import { LandingInfoComponent } from '../landing-info/landing-info.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  readonly isAuth = this.auth.authorized;
  readonly isAuth2 = this.logAuth.user;
  userInfo: Observable<IRegistration | undefined>;
  nameConcat = '';
  constructor(private router: Router, private auth: FhirAuthService, private logAuth: AuthService, private afs: AngularFirestore, private regService: RegistrationService)
  {
    this.userInfo = this.logAuth.user.pipe(
    filter(u => u != null),
    switchMap( u => this.afs
      .collection('patients')
      .doc<IRegistration>(u?.uid)
      .get().pipe(map(doc => doc.data()))
      )
    )
  }

  ngOnInit(): void {
    this.userInfo.subscribe(user =>{
     if(user){
       this.nameConcat = user.firstName + ' ' + user.lastName
     }
    })
  }

  // Clears session storage and redirects to simulate logout
  logout(): void {
    this.logAuth.signout();
    this.auth.logOut();
    this.router.navigate(['/']);
  }

}
