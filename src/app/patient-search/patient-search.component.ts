import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFireFunctions } from "@angular/fire/functions";
import { first, map } from 'rxjs/operators';
import { Observable, pipe } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { IRegistration } from 'src/Interfaces/IRegistration';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';

interface IRoleLevel {
  role:string;
}

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
  patientRole!: Observable<IRoleLevel | undefined>;
  curPatientRole: string = '';
  isEditMode = false;
  isFirstNameEdit = false;
  isLastNameEdit = false;
  isDoBEdit = false;
  isAccessLevelEdit = false;
  patientUserInfo = {} as IRegistration;
  patientRoleInfo = {} as IRoleLevel;

  Search = this.fb.group({
    EmailInput: ['', Validators.required],
  })


  constructor( private fb: FormBuilder, private func: AngularFireFunctions, private afs: AngularFirestore, private afa: AngularFireAuth, private actRoute: ActivatedRoute,) {   }

  ngOnInit(): void {

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

    this.patientRole = this.afs
        .collection('users')
        .doc<IRoleLevel>(this.patUID)
        .get().pipe(map(doc => doc.data()))

    this.patientRole.subscribe((role) => {
      if(role){
        this.patientRoleInfo = {
          role: (role.role == '') ? "User" : role.role,
        } as IRoleLevel
      }
      else{
        this.patientRoleInfo = {
          role: "User",
        } as IRoleLevel;
        this.afs.collection('users').doc(this.patUID).set(this.patientRoleInfo);
      }
    })

    this.patientInfo.subscribe((info) => {
      if(info){
        this.patientUserInfo = {
          firstName: info.firstName,
          lastName: info.lastName,
          MotherDoB: info.MotherDoB.toDate(),
          role: (info.role == '') ? "User" : info.role,
        } as IRegistration;
      }
    })
  }

  Clicked_EditUserInfo(){
    console.log("Edit User Page");
  }
  Clicked_EditPregInfo(){
    console.log("Edit Preg Page");
  }
  Clicked_DeleteUser(){

  }

  editFirstNameClick(){
    this.isFirstNameEdit = !this.isFirstNameEdit;
    console.log("First Name Icon clicked");
  }
  editLastNameClick(){
    this.isLastNameEdit = !this.isLastNameEdit;
    console.log("Last Name Icon clicked");
  }
  editDoBClick(){
    this.isDoBEdit = !this.isDoBEdit;
    console.log("DoB Icon clicked");
  }
  editAccessLevel(){
    this.isAccessLevelEdit = !this.isAccessLevelEdit;
    console.log("DoB Icon clicked");
  }
  submitUserEdits() {
    this.afs.collection('users').doc(this.patUID).update(this.patientRoleInfo);
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

    this.patientRole = this.afs
        .collection('users')
        .doc<IRoleLevel>(this.patUID)
        .get().pipe(map(doc => doc.data()))
  }
}
