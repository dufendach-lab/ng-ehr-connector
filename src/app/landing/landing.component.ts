import {Component, OnInit} from '@angular/core';
import {FhirAuthService} from "../fhir-auth.service";
import { AuthService } from '../auth.service';
import {Observable} from "rxjs";
import { RegistrationService } from '../registration.service';
import { IGravidasDetails } from 'src/Interfaces/IGravidasDetails';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { GravidasService } from '../gravidas.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  gravidasDetails!: Observable<IGravidasDetails[] | undefined>;
  hasBirthed: boolean = false;

  isAuthorized = this.fhirAuth.authorized;
  loggedIn = this.RegAuth.getLoginAuth();
  email = '';

  user = this.auth.user;

  constructor(
    private fhirAuth: FhirAuthService,
    private RegAuth: AuthService,
    private auth: AuthService,
    private regService: RegistrationService,
    public dialog: MatDialog,
    private gravService: GravidasService,
  ) {}

  ngOnInit(): void {
    this.gravidasDetails = this.gravService.getGravidas();
    this.gravidasDetails.subscribe(gravidas => {
      if(gravidas){
        const lastIndex = gravidas.length - 1;
        this.hasBirthed = gravidas[lastIndex].givenBirth;
      }
    })
  }

  openDialog() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: false
    });

    dialogRef.afterClosed().subscribe(res => {
      if(res) {
        this.changeBirthStatus();
        this.submitBasicInfo(res);
      }
    })
  }

  changeBirthStatus() {
    this.gravidasDetails.subscribe(grav => {
      if(grav) {
        grav[grav.length - 1].givenBirth = true;
        this.gravService.changeGravidasBirth(grav[grav.length - 1]);
      }
    });
  }

  // Takes in the first data received about the birth!
  submitBasicInfo(info): void {
    console.log("🚀 ~ file: landing.component.ts ~ line 66 ~ LandingComponent ~ submitBasicInfo ~ info", info)
  }

}
