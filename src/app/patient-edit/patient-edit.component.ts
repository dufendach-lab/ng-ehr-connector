import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from "@angular/forms";
import {AuthService} from "../auth.service";
import {PatientService} from "../patient.service";
import {Router} from "@angular/router";
import {IRegistration} from "../../Interfaces/IRegistration";
import {map} from "rxjs/operators";
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Component({
  selector: 'app-patient-edit',
  templateUrl: './patient-edit.component.html',
  styleUrls: ['./patient-edit.component.scss']
})
export class PatientEditComponent implements OnInit {

  ptEditForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    phoneNum: new FormControl(''),
  });

  user = this.logAuth.user;
  ptInfo: any;
  patId: string | undefined = '';
  isCalling: boolean = false;
  pone: string = '';

  constructor(private afs: AngularFirestore,
              private logAuth: AuthService,
              private pt: PatientService,
              private router: Router) {

    this.user.pipe().subscribe(val => {
      this.patId = val?.uid;
      this.ptInfo = this.afs
        .collection('patients')
        .doc<IRegistration>(this.patId)
        .get().pipe(map(doc => doc.data())).subscribe(info => {
          if(info) {
            this.ptEditForm.controls['firstName'].setValue(info.firstName);
            this.ptEditForm.controls['lastName'].setValue(info.lastName);
            this.ptEditForm.controls['phoneNum'].setValue(info.phone.substring(2,12));
            this.pone = info.phone.substring(2,12);
          }
        })
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.isCalling = true;
    let pn = ("+1" + this.ptEditForm.controls['phoneNum'].value)
    let fn = this.ptEditForm.controls['firstName'].value;
    let ln = this.ptEditForm.controls['lastName'].value;

    if(this.patId) {
      this.pt.updateStoreNumber(this.patId, pn, fn, ln).then(() => {

        if(this.pone === pn) {
          this.pt.updatePatientInfo(this.patId!, pn).then((val) => {

            console.log(val);
            this.router.navigate(['']);

          }).catch((e) => {
            console.log('Failed to update user', e);
          })
        } else {
          console.log('Updated profile but not auth number');
          this.router.navigate(['']);
        }
      })
    }
  }

}
