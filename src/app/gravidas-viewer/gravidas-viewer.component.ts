import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../registration.service';
import { IRegistration } from '../../Interfaces/IRegistration'
import { IGravidasDetails } from '../../Interfaces/IGravidasDetails'
import { AuthService } from '../auth.service';
import { filter, map, switchMap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { GravidasService } from '../gravidas.service';

@Component({
  selector: 'app-gravidas-viewer',
  templateUrl: './gravidas-viewer.component.html',
  styleUrls: ['./gravidas-viewer.component.scss']
})
export class GravidasViewerComponent implements OnInit {

  EDD: any;
  gestationalAge: any;
  user = this.logAuth.user;
  gravidasDetails: Observable<IGravidasDetails | undefined>;
  allGravidas: Observable<IGravidasDetails[]> | undefined;
  isAdminNav = false;
  adminNavID!: string | null;
  dueDateEdit = false;
  diagnosisEdit = false;
  parityEdit = false;

  constructor(
    private logAuth: AuthService,
    private afs: AngularFirestore,
    private actRoute: ActivatedRoute,
    private gravService: GravidasService,) {
    this.gravidasDetails = this.user.pipe(
      filter(u => u != null),
      switchMap( u => this.afs
        .collection('patients')
        .doc<IRegistration>(u?.uid)
        .collection('gravidas')
        .doc<IGravidasDetails>('XXXX-XX-XX')
        .get().pipe(map(doc => doc.data()))
        )
    )
   }

  ngOnInit(): void {
    this.gravidasDetails.subscribe((gravidas) => {
      if(gravidas){
        this.EDD = gravidas.EstDueDate;
        this.gestationalAgeCalc(this.EDD);
      }
    })
    this.allGravidas = this.gravService.getGravidas();

    this.actRoute.paramMap.subscribe((routeParams) => {
      const nav = (routeParams.get('id') == '' || routeParams.get('id')==null) ? "" : routeParams.get('id');
      if(nav != ""){
        this.isAdminNav = true;
        this.allGravidas = this.gravService.getOtherGravidas(nav!);
      }
      this.adminNavID = nav;
    })
  }

  gestationalAgeCalc(EstDD: any | Date): string{
    const today = new Date();
    const DD = new Date(EstDD.getUTCFullYear(), EstDD.getUTCMonth(), EstDD.getUTCDay());
    const daysUntilDD = (DD.getTime()-today.getTime()) / (1000 * 60 * 60 * 24 );
    const iGestationalAgeInDays = 280 - daysUntilDD;
	  const fGestationalAgeInWeeks = iGestationalAgeInDays / 7;
	  const iEGAWeeks = Math.floor( fGestationalAgeInWeeks );
	  const iEGADays = ((fGestationalAgeInWeeks % 1)*6).toFixed(0);

    this.gestationalAge = iEGAWeeks.toString() + ' weeks ' + iEGADays.toString() + ' days';
    return this.gestationalAge;
  }

  Clicked_SubmitChanges(preg: IGravidasDetails){
    const userID = this.adminNavID?.toString();
    this.gravService.EditOtherGravidas(preg, userID);
    this.dueDateEdit = false;
    this.diagnosisEdit = false;
    this.parityEdit = false;
  }
  Clicked_DeletePreg(preg: IGravidasDetails){
    const userID = this.adminNavID?.toString()
    this.gravService.DeleteOtherGravidas(preg, userID);
    this.dueDateEdit = false;
    this.diagnosisEdit = false;
    this.parityEdit = false;
  }
}
