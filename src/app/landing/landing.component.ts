import {Component, OnInit} from '@angular/core';
import {FhirAuthService} from "../fhir-auth.service";
import { AuthService } from '../auth.service';
import {Observable} from "rxjs";
import { IGravidasDetails } from 'src/Interfaces/IGravidasDetails';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { GravidasService } from '../gravidas.service';
import { TooltipPosition } from '@angular/material/tooltip';
import {Router} from "@angular/router";
import {filter, map, shareReplay, switchMap} from "rxjs/operators";
import {IRegistration} from "../../Interfaces/IRegistration";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {IFruit} from "../../Interfaces/IFruit";
import * as maFruits from "../../assets/fruits.json";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})

export class LandingComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  gravidasDetails!: Observable<IGravidasDetails[] | undefined>;
  hasBirthed: boolean = false;
  position: TooltipPosition = "below";
  isAuthorized = this.fhirAuth.authorized;
  email = '';
  userInfo;
  name;
  user = this.auth.user;
  diagnosis: string | null = null;
  eDD;
  gestAge = '';
  iEGAWeeks: number = 0;
  momsFruits = {} as IFruit;
  fruits: IFruit[] = maFruits;

  constructor(
    private fhirAuth: FhirAuthService,
    private auth: AuthService,
    private afs: AngularFirestore,
    public dialog: MatDialog,
    private gravService: GravidasService,
    private router: Router,
    private breakpointObserver: BreakpointObserver
  ) {
    this.gravService.getGravidas().subscribe(gravidas => {
      if(gravidas){
        const lastIndex = gravidas.length - 1;
        this.hasBirthed = gravidas[lastIndex].givenBirth;
        this.diagnosis = gravidas[lastIndex].Diagnosis;
        this.eDD = gravidas[lastIndex].EstDueDate;
        this.gestAge = this.gestationalAgeCalc(this.eDD);
      }
    })
    this.userInfo = this.auth.user.pipe(
      filter(u => u != null),
      switchMap(u => this.afs
        .collection('patients')
        .doc<IRegistration>(u?.uid)
        .get().pipe(map(doc => doc.data()))
      )
    )
    this.userInfo.subscribe(user => {
      if (user) {
        this.name = user.firstName + ' ' + user.lastName
      }
    })
  }

  ngOnInit(): void { }

  /*
  * Dialog for confirming birth
  */
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

  /*
  * Changes birth status to true after submitBasicInfo
  */
  changeBirthStatus() {
    this.gravService.getGravidas().subscribe(grav => {
      if(grav) {
        const ltg = grav.length - 1;
        grav[ltg].givenBirth = true;
        this.gravService.changeGravidasStatus(grav[ltg]);
      }
    });
  }

  /*
  * Pushes EDD back a week if baby still in hospital
  */
  changeEDD() {
    this.gravService.getGravidas().subscribe(grav => {
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
    if(info.status === "born" && info.inHospital === "yes") {
      this.changeEDD();
      this.changeBirthStatus();
    } else if(info.status === "born" || info.status === "died") {
      this.changeBirthStatus();
    } else {
      this.changeEDD();
    }
  }

  /*
  * Calculates gestational age in format of weeks & days
  * Also sets momsFruits based on the week
  */
  gestationalAgeCalc(EstDD: any): string{
    const today = new Date();
    const DD = new Date(EstDD.getUTCFullYear(), EstDD.getUTCMonth(), EstDD.getUTCDay());
    const daysUntilDD = (DD.getTime()-today.getTime()) / (1000 * 60 * 60 * 24 );
    const iGestationalAgeInDays = 280 - daysUntilDD;
    const fGestationalAgeInWeeks = iGestationalAgeInDays / 7;
    this.iEGAWeeks = Math.floor( fGestationalAgeInWeeks );
    const iEGADays = ((fGestationalAgeInWeeks % 1)*6).toFixed(0);
    this.momsFruits = this.fruits[this.iEGAWeeks - 16]; // Set fruit
    let gestational = this.iEGAWeeks.toString() + ' weeks & ' + iEGADays.toString() + ' days';
    return gestational;
  }

  routeToLaunch() {
    this.router.navigate(['/launch'])
    return null;
  }
}
