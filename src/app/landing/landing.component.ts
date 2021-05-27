import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import {FhirAuthService} from "../fhir-auth.service";
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { filter, first, map, switchMap } from 'rxjs/operators';
import { LandingInfoComponent } from '../landing-info/landing-info.component';
import {AngularFirestore} from "@angular/fire/firestore";
import {IRegistration} from "../../Interfaces/IRegistration";
import {Observable} from "rxjs";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  isAuthorized = this.fhirAuth.authorized;
  patientData: Observable<IRegistration | undefined>;
  loggedIn = this.RegAuth.getLoginAuth();
  email = '';

  user = this.auth.user;

  constructor(
    private dialog: MatDialog,
    private fhirAuth: FhirAuthService,
    private router: Router,
    private RegAuth: AuthService,
    private afs: AngularFirestore,
    private auth: AuthService,
  ) {
    // this.patientData = this.afs
    //   .collection('patients')
    //   .doc<IRegistration>('TsYOnFQmEq4TQWr0eOnO')
    //   .get().pipe(map(doc => doc.data()));
    this.patientData = this.user.pipe(
      filter(u => u != null),
      switchMap( u => this.afs
        .collection('patients')
        .doc<IRegistration>(u?.uid)
        .get().pipe(map(doc => doc.data()))
      )
    )
  }

  ngOnInit(): void {
    // this.user.pipe(map(x => x.))
    // if(this.patientData){

    // }
    // else{

    // }

    // if(this.loggedIn == 'false'){
    //   this.loginModal();
    // }
  }

  loginModal(){
    // const dialogRef = this.dialog.open(LoginComponent, {
    //   width: '400px',
    //   data: {},
    //   disableClose: true
    // });


    // dialogRef.afterClosed().subscribe(result => {
    //   this.email = result;
    // });
  }
}
