import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../registration.service';
import { IRegistration } from '../../Interfaces/IRegistration'
import { IGravidasDetails } from '../../Interfaces/IGravidasDetails'
import { AuthService } from '../auth.service';
import { filter, map, switchMap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
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
  allGravidas: Observable<IGravidasDetails[]> | undefined;
  gravTest: any;
  test1: IGravidasDetails[] = [];
  isAdminNav = false;
  adminNavID!: string | null;
  dueDateEdit = false;
  diagnosisEdit = false;
  parityEdit = false;

  constructor( private regService: RegistrationService, private logAuth: AuthService, private afs: AngularFirestore, private route: Router, private actRoute: ActivatedRoute,) {
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
   }

  ngOnInit(): void {
    this.gravidasDetails.subscribe((gravidas) => {
      if(gravidas){
        this.EDD = gravidas.EstDueDate;
        this.gestationalAgeCalc(this.EDD);
        //console.log(this.gravidasDetails);
      }
    })
    this.allGravidas = this.regService.getGravidas();

    // this.allGravidas.subscribe((gravida) => {
    //   if(gravida){
    //     console.log("Gravidas")
    //     console.log(gravida)
    //   }
    // })

    this.actRoute.paramMap.subscribe((routeParams) => {
      const nav = (routeParams.get('id') == '' || routeParams.get('id')==null) ? "" : routeParams.get('id');
      if(nav != ""){
        this.isAdminNav = true;
        this.allGravidas = this.regService.getOtherGravidas(nav!);
      }
      this.adminNavID = nav;
      console.log(this.adminNavID);
      console.log(this.isAdminNav);
    })
  }

  gestationalAgeCalc(EstDD: any | Date): string{
    const today = new Date();
    if(!this.isAdminNav){
      const DD = new Date(EstDD.toDate().getUTCFullYear(), EstDD.toDate().getUTCMonth(), EstDD.toDate().getUTCDay());
      const daysUntilDD = (DD.getTime()-today.getTime()) / (1000 * 60 * 60 * 24 );
      const iGestationalAgeInDays = 280 - daysUntilDD;
	    const fGestationalAgeInWeeks = iGestationalAgeInDays / 7;
	    const iEGAWeeks = Math.floor( fGestationalAgeInWeeks );
	    const iEGADays = ((fGestationalAgeInWeeks % 1)*6).toFixed(0);

      this.gestationalAge = iEGAWeeks.toString() + ' weeks ' + iEGADays.toString() + ' days';
      return this.gestationalAge;
    }
    else{
      const DD = new Date(EstDD.getUTCFullYear(), EstDD.getUTCMonth(), EstDD.getUTCDay());
      const daysUntilDD = (DD.getTime()-today.getTime()) / (1000 * 60 * 60 * 24 );
      const iGestationalAgeInDays = 280 - daysUntilDD;
	    const fGestationalAgeInWeeks = iGestationalAgeInDays / 7;
	    const iEGAWeeks = Math.floor( fGestationalAgeInWeeks );
	    const iEGADays = ((fGestationalAgeInWeeks % 1)*6).toFixed(0);

      this.gestationalAge = iEGAWeeks.toString() + ' weeks ' + iEGADays.toString() + ' days';
      return this.gestationalAge;
    }

  }

  Clicked_SubmitChanges(preg: IGravidasDetails){
    const userID = this.adminNavID?.toString()
    this.afs.collection('patients').doc(userID).collection('gravidas').doc(preg.gravidasTitle).update(preg);
    this.dueDateEdit = false;
    this.diagnosisEdit = false;
    this.parityEdit = false;
  }
  Clicked_DeletePreg(preg: IGravidasDetails){
    const userID = this.adminNavID?.toString()
    this.afs.collection('patients').doc(userID).collection('gravidas').doc(preg.gravidasTitle).delete();
    this.dueDateEdit = false;
    this.diagnosisEdit = false;
    this.parityEdit = false;
  }
}
