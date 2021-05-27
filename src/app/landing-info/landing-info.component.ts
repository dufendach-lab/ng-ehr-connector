import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../registration.service';
import { IRegistration } from '../../Interfaces/IRegistration'
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
  constructor(private regService: RegistrationService, private logAuth: AuthService, private afs: AngularFirestore,) { this.registrationInfo = this.user.pipe(
    filter(u => u != null),
    switchMap( u => this.afs
      .collection('patients')
      .doc<IRegistration>(u?.uid)
      .get().pipe(map(doc => doc.data()))
      )
    )
  }

  ngOnInit(): void {
    // this.regService.userInfo.subscribe(dt => this.getRegistrationInfo());
    // console.log(this.registrationInfo.pipe(map (x=> {
    //   console.log(x?.EstDueDate.toDate())
    //   console.log(x?.MotherDoB.toDate())
    // })))
    //this.getRegistrationInfo();
    this.registrationInfo.subscribe((user) => {
      if(user){
        this.EDD = user.EstDueDate;//user.EstDueDate.toDate()
        this.gestationalAgeCalc(this.EDD);
      }
    })
  }

  gestationalAgeCalc(EstDD: any){
    const today = new Date();
    // today.getUTCFullYear();
    // today.getUTCMonth();
    // today.getUTCDay();
    const DD = new Date(EstDD.toDate().getUTCFullYear(), EstDD.toDate().getUTCMonth(), EstDD.toDate().getUTCDay());
    const daysUntilDD = (DD.getTime()-today.getTime()) / (1000 * 60 * 60 * 24 );
    const iGestationalAgeInDays = 280 - daysUntilDD;
	  const fGestationalAgeInWeeks = iGestationalAgeInDays / 7;
	  const iEGAWeeks = Math.floor( fGestationalAgeInWeeks );
	  const iEGADays = ((fGestationalAgeInWeeks % 1)*7).toFixed(0);

    this.gestationalAge = iEGAWeeks.toString() + ' weeks ' + iEGADays.toString() + ' days';
    console.log(this.gestationalAge);
  }

  getRegistrationInfo(): void{
    // console.log("getting reg");
    // this.registrationInfo = this.regService.user;
    // console.log(this.registrationInfo);
    this.registrationInfo = this.user.pipe(
      filter(u => u != null),
      switchMap( u => this.afs
        .collection('patients')
        .doc<IRegistration>(u?.uid)
        .get().pipe(map(doc => doc.data()))
      )
    )
  }

}
