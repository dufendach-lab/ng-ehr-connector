import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../registration.service';
import { IRegistration } from '../../Interfaces/IRegistration'
import { IGravidasDetails } from '../../Interfaces/IGravidasDetails'
import { AuthService } from '../auth.service';
import { filter, map, switchMap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-landing-info',
  templateUrl: './landing-info.component.html',
  styleUrls: ['./landing-info.component.scss']
})
export class LandingInfoComponent implements OnInit {
  EDD: any;
  gestationalAge: any;
  user = this.logAuth.user;
  registrationInfo: Observable<IRegistration | undefined>;
  gravidasDetails!: Observable<IGravidasDetails[] | undefined>;
  recentGravidas!: IGravidasDetails;
<<<<<<< HEAD
  isAdmin = false;
=======
  isIt: boolean = false;
>>>>>>> a68ada4824fd63b2ff356cc04958ebf00c7a10f9

  constructor(private regService: RegistrationService, private logAuth: AuthService, private afs: AngularFirestore,) {
    this.registrationInfo = this.user.pipe(
    filter(u => u != null),
    switchMap( u => this.afs
      .collection('patients')
      .doc<IRegistration>(u?.uid)
      .get().pipe(map(doc => doc.data()))
      )
    )
  }

  ngOnInit(): void {
    this.registrationInfo.subscribe((user) => { })

    this.gravidasDetails = this.regService.getGravidas();
    this.gravidasDetails.subscribe(gravidas => {
      if(gravidas){
        const lastIndex = gravidas.length - 1;
        this.recentGravidas = gravidas[lastIndex]
        if(lastIndex === -1) { this.isIt = false; } else { this.isIt = true; }
      }
    })

    this.user.subscribe((x) => {
      if(x) {
        x.getIdTokenResult().then((res) => {
          if(res.claims.superAdmin){
            console.log("User is Super Admin");
            this.isAdmin = true;
          }
          else{
            console.log(res.claims);
          }
        })
      }
    })
  }

  gestationalAgeCalc(EstDD: any): string{
    const today = new Date();
    const DD = new Date(EstDD.toDate().getUTCFullYear(), EstDD.toDate().getUTCMonth(), EstDD.toDate().getUTCDay());
    const daysUntilDD = (DD.getTime()-today.getTime()) / (1000 * 60 * 60 * 24 );
    const iGestationalAgeInDays = 280 - daysUntilDD;
	  const fGestationalAgeInWeeks = iGestationalAgeInDays / 7;
	  const iEGAWeeks = Math.floor( fGestationalAgeInWeeks );
	  const iEGADays = ((fGestationalAgeInWeeks % 1)*6).toFixed(0);

    this.gestationalAge = iEGAWeeks.toString() + ' weeks ' + iEGADays.toString() + ' days';
    return this.gestationalAge;
  }
}
