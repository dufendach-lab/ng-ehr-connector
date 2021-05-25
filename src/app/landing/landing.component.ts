import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import {FhirAuthService} from "../fhir-auth.service";
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { first, map } from 'rxjs/operators';
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

  constructor(
    private dialog: MatDialog,
    private fhirAuth: FhirAuthService,
    private router: Router,
    private RegAuth: AuthService,
    private afs: AngularFirestore)
  {
    this.patientData = this.afs
      .collection('patients')
      .doc<IRegistration>('TsYOnFQmEq4TQWr0eOnO')
      .get().pipe(map(doc => doc.data()));
  }

  loggedIn = this.RegAuth.getLoginAuth();
  email= '';

  ngOnInit(): void {
    if(this.loggedIn == 'false'){
      this.loginModal();
    }
  }

  loginModal(){
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '400px',
      data: {},
      disableClose: true
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   this.email = result;
    // });
  }
}
