import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFireFunctions } from "@angular/fire/compat/functions";
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IRegistration } from 'src/Interfaces/IRegistration';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {ActivatedRoute, Router} from '@angular/router';
import {RegistrationService} from "../../../services/registration.service";

@Component({
  selector: 'app-patient-search',
  templateUrl: './patient-search.component.html',
  styleUrls: ['./patient-search.component.scss']
})

export class PatientSearchComponent implements OnInit {

  searchResultShow = false;
  searchQuery = "";
  patUID = "";
  patientInfo!: Observable<IRegistration | undefined>;
  curPatientRole: string = '';
  isEditMode = false;
  isFirstNameEdit = false;
  isLastNameEdit = false;
  isDoBEdit = false;
  isAccessLevelEdit = false;
  patientUserInfo = {} as IRegistration;

  Search = this.fb.group({
    EmailInput: ['', Validators.required],
  })


  constructor( private fb: FormBuilder,
               private func: AngularFireFunctions,
               private afs: AngularFirestore,
               private afa: AngularFireAuth,
               private actRoute: ActivatedRoute,
               private regService: RegistrationService,
               private router: Router) {
    this.actRoute.paramMap.subscribe((routeParams) => {
      const nav = (routeParams.get('id') == '' || routeParams.get('id')==null) ? "" : routeParams.get('id');
      if(nav != "" && nav){
        this.patUID = nav;
      }
    })

    this.patientInfo = this.afs
      .collection('patients')
      .doc<IRegistration>(this.patUID)
      .get().pipe(map(doc => doc.data()))

    this.patientInfo.subscribe((info) => {
      if(info){
        this.patientUserInfo = {
          firstName: info.firstName,
          lastName: info.lastName,
          MotherDoB: info.MotherDoB.toDate(),
          roles: info.roles,
        } as IRegistration;
      }
    })
  }

  ngOnInit(): void { }

  Clicked_DeleteUser(){
    this.regService.deletePatient(this.patUID);
    this.router.navigate(['admin/patient/list']);
  }

  editFirstNameClick(){
    this.isFirstNameEdit = !this.isFirstNameEdit;
  }
  editLastNameClick(){
    this.isLastNameEdit = !this.isLastNameEdit;
  }
  editDoBClick(){
    this.isDoBEdit = !this.isDoBEdit;
  }
  editAccessLevel(){
    this.isAccessLevelEdit = !this.isAccessLevelEdit;
  }
  submitUserEdits() {
    const role = this.patientUserInfo.roles;
    this.afs.collection('users').doc(this.patUID).update({role});
    this.afs.collection('patients').doc(this.patUID).update(this.patientUserInfo);
    this.isEditMode = false;
    this.isFirstNameEdit = false;
    this.isLastNameEdit = false;
    this.isDoBEdit = false;
    this.isAccessLevelEdit = false;
    this.patientInfo = this.afs
        .collection('patients')
        .doc<IRegistration>(this.patUID)
        .get().pipe(map(doc => doc.data()));
  }
}
