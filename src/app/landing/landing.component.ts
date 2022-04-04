import {Component, OnInit} from '@angular/core';
import {FhirAuthService} from "../fhir-auth.service";
import {AuthService} from '../auth.service';
import {Observable} from "rxjs";
import {IGravidasDetails} from 'src/Interfaces/IGravidasDetails';
import {MatDialog} from '@angular/material/dialog';
import {GravidasService} from '../gravidas.service';
import {TooltipPosition} from '@angular/material/tooltip';
import {Router} from "@angular/router";
import {filter, map, shareReplay, switchMap} from "rxjs/operators";
import {IRegistration} from "../../Interfaces/IRegistration";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {IFruit} from "../../Interfaces/IFruit";
import * as maFruits from "../../assets/fruits.json";
import {PatientStateService, PregState} from "../patient-state.service";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})

export class LandingComponent implements OnInit {

  controlState = PregState;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  gravidasDetails!: Observable<IGravidasDetails[] | undefined>;
  pregState: PregState | undefined;
  stateColor: string = '';
  position: TooltipPosition = "below";
  isAuthorized = this.fhirAuth.authorized;
  userInfo;
  name;
  user = this.auth.user;
  diagnosis: string | null = null;
  eDD;
  gestAge = '';
  iEGAWeeks: number = 0;
  twinA = {} as IFruit;
  twinB = {} as IFruit;
  fruits: IFruit[] = maFruits;

  constructor(
    private fhirAuth: FhirAuthService,
    private auth: AuthService,
    private afs: AngularFirestore,
    public dialog: MatDialog,
    private gravService: GravidasService,
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private stateService: PatientStateService
  ) {
    this.gravService.getGravidas().subscribe(gravidas => {
      if(gravidas){
        const lastIndex = gravidas.length - 1;
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
    this.stateService.getPatientState().subscribe(data => {
      if (data) {
        this.pregState = this.stateService.getStateEnum(data[data.length - 1].pregnancyStatus);
        if(this.pregState || this.pregState == 0) { // Check for 0 or else it will be false
          this.stateColor = this.stateService.setColor(this.pregState);
        }
      }
    });

    this.twinA = this._getFruit(4);
    this.twinB = this._getFruit(3);
  }

  ngOnInit(): void {}

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
    // this.momsFruits = this.fruits[this.iEGAWeeks - 16]; // Set fruit
    let gestational = this.iEGAWeeks.toString() + ' weeks & ' + iEGADays.toString() + ' days';
    return gestational;
  }

  routeToLaunch() {
    this.router.navigate(['/launch'])
    return null;
  }

  private _getFruit(wgt1: number) {
    const arr = Array.from(this.fruits);
    const num = arr.reduce((prev, curr) => Math.abs(curr.weight - wgt1) < Math.abs(prev.weight - wgt1) ? curr : prev);
    const fruit = arr.find(obj => obj.weight === num.weight);
    if(fruit) {
      return fruit;
    } else {
      return {
        weight: 0,
        fruit: '',
        length: '',
        type: '',
        imgUrl: ''
      }
    }
  }
}
