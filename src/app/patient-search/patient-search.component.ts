import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFireFunctions } from "@angular/fire/functions";
import { first, map } from 'rxjs/operators';
import { Observable, pipe } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { IRegistration } from 'src/Interfaces/IRegistration';

@Component({
  selector: 'app-patient-search',
  templateUrl: './patient-search.component.html',
  styleUrls: ['./patient-search.component.scss']
})
export class PatientSearchComponent implements OnInit {

  searchResultShow = false;
  searchQuery = "";
  patUID = "";
  patientInfo: Observable<IRegistration | undefined> | undefined;
  isEditMode = false;
  isFirstNameEdit = false;
  isLastNameEdit = false;
  isDoBEdit = false;

  Search = this.fb.group({
    EmailInput: ['', Validators.required],
  })

  constructor( private fb: FormBuilder, private func: AngularFireFunctions, private afs: AngularFirestore) { }

  ngOnInit(): void {
  }

  onSearch_Click(){
    // const curEmail = this.Search.get('EmailInput')?.value.toString();
    // console.log(curEmail);
    // let resu = "not updated";
    // this.func.httpsCallable('userSearchByEmail').call({ text: curEmail }, { text: curEmail })
    // .toPromise().then((res) => {
    //   console.log("This should be correct result");
    //   console.log(res);
    // })
    // .catch ((err) => {
    //   console.log("An error occured");
    //   console.log(err);
    // });
    // console.log("This shouldnt be the only message");

    this.searchResultShow = true;
    this.searchQuery = this.Search.get('EmailInput')?.value.toString();
    this.patUID = this.searchQuery;

    this.patientInfo = this.afs
        .collection('patients')
        .doc<IRegistration>(this.patUID)
        .get().pipe(map(doc => doc.data()))
  }

  Clicked_EditUserInfo(){
    console.log("Edit User Page");
  }
  Clicked_EditPregInfo(){
    console.log("Edit Preg Page");
  }
  Clicked_DeleteUser(){
    console.log("Delete User");
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
  submitUserEdits() {

  }
}
