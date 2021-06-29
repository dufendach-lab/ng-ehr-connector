import {Component, OnInit} from '@angular/core';
import {FhirAuthService} from "../fhir-auth.service";
import { AuthService } from '../auth.service';
import {Observable} from "rxjs";
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
  loggedIn = this.gravAuth.getLoginAuth();
  email = '';

  user = this.auth.user;

  constructor(
    private fhirAuth: FhirAuthService,
    private gravAuth: AuthService,
    private auth: AuthService,
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
        this.submitBasicInfo(res);
      }
    })
  }

  changeBirthStatus() {
    this.gravidasDetails.subscribe(grav => {
      if(grav) {
        const ltg = grav.length - 1;
        grav[ltg].givenBirth = true;
        this.gravService.changeGravidasStatus(grav[ltg]);
      }
    });
  }

  changeEDD() {
    this.gravidasDetails.subscribe(grav => {
      if(grav) {
        const lgt = grav.length-1;
        this.gravService.changeDocDate(grav[lgt]);
        this.gravService.deleteDocDate(grav[lgt-1]);
      }
    });
  }

  // Takes in the first data received about the birth!
  submitBasicInfo(info): void {
    console.log(info);
    switch (info.status) {
      case "born" || "died":
        this.changeBirthStatus();
        break;
      case "notborn":
        this.changeEDD();
        break;
      default:
        break;
    }
  }
}
