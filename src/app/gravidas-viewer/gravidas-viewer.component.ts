import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../registration.service';
import { IRegistration } from '../../Interfaces/IRegistration'
import { IGravidasDetails } from '../../Interfaces/IGravidasDetails'
import { AuthService } from '../auth.service';
import { filter, map, switchMap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
//import { collection, getDocs } from "firebase/firestore";


@Component({
  selector: 'app-gravidas-viewer',
  templateUrl: './gravidas-viewer.component.html',
  styleUrls: ['./gravidas-viewer.component.scss']
})
export class GravidasViewerComponent implements OnInit {

  EDD: any;
  gestationalAge: any;
  user = this.logAuth.user;
  //registrationInfo: Observable<IRegistration | undefined>;
  gravidasDetails: Observable<IGravidasDetails | undefined>;
  gravTest: any;
  test1: IGravidasDetails[] = [];

  constructor( private regService: RegistrationService, private logAuth: AuthService, private afs: AngularFirestore) {
    this.gravidasDetails = this.user.pipe(
      filter(u => u != null),
      switchMap( u => this.afs
        .collection('patients')
        .doc<IRegistration>(u?.uid)
        .collection('gravidas')
        //FIXME: Replace with the actual thing
        .doc<IGravidasDetails>('2021-11-11')
        .get().pipe(map(doc => doc.data()))
        )
    )

    this.gravTest = this.user.pipe(
      filter(u => u != null),
      switchMap( u => this.afs
        .collection('patients')
        .doc<IRegistration>(u?.uid)
        .collection('gravidas').get()
        .pipe(map(doc => doc.docs.forEach(data => data.data())))
      )
    )


    // this.gravTest = this.user.pipe(
    //   filter(u => u != null),
    //   switchMap( u => this.afs
    //     .collection('patients')
    //     .doc<IRegistration>(u?.uid)
    //     .collection('gravidas').get()
    //     .pipe(map(doc => doc.forEach(doc => {
    //       let data = doc.data()
    //       let temp = {} as IGravidasDetails;
    //       temp.Diagnosis = data.Diagnosis;
    //       temp.EstDueDate = data.EstDueDate
    //       temp.hospital = data.hospital
    //       temp.parity = data.parity

    //       this.test1.push(temp)
    //     })))
    //   )
    // )
   }

  ngOnInit(): void {
    this.gravidasDetails.subscribe((gravidas) => {
      if(gravidas){
        this.EDD = gravidas.EstDueDate;
        this.gestationalAgeCalc(this.EDD);
        //console.log(this.gravidasDetails);
      }
    })
    //this.regService.getGravidas();
  }

  gestationalAgeCalc(EstDD: any){
    const today = new Date();
    const DD = new Date(EstDD.toDate().getUTCFullYear(), EstDD.toDate().getUTCMonth(), EstDD.toDate().getUTCDay());
    const daysUntilDD = (DD.getTime()-today.getTime()) / (1000 * 60 * 60 * 24 );
    const iGestationalAgeInDays = 280 - daysUntilDD;
	  const fGestationalAgeInWeeks = iGestationalAgeInDays / 7;
	  const iEGAWeeks = Math.floor( fGestationalAgeInWeeks );
	  const iEGADays = ((fGestationalAgeInWeeks % 1)*6).toFixed(0);

    this.gestationalAge = iEGAWeeks.toString() + ' weeks ' + iEGADays.toString() + ' days';
  }
}
