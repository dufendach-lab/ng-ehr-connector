import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from "@angular/forms";
import {AuthService} from "../auth.service";
import {PatientService} from "../patient.service";
import {IRegistration} from "../../Interfaces/IRegistration";
import {map} from "rxjs/operators";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {getAuth, updateEmail} from "firebase/auth";

@Component({
  selector: 'app-patient-edit',
  templateUrl: './patient-edit.component.html',
  styleUrls: ['./patient-edit.component.scss']
})
export class PatientEditComponent implements OnInit {

  ptEditForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
  });

  ptEmailForm = new FormGroup({
    email: new FormControl(''),
    phone: new FormControl('')
  });

  auth = getAuth();
  user = this.logAuth.user;
  ptInfo: any;
  patId: string | undefined;
  hasChanged: boolean = false;
  ptPhone: any;
  ptEmail: any;
  dialogOption: string = '';

  constructor(private afs: AngularFirestore,
              private logAuth: AuthService,
              private pt: PatientService,) {

    this.user.pipe().subscribe(val => {
      this.patId = val?.uid;
      this.ptInfo = this.afs
        .collection('patients')
        .doc<IRegistration>(this.patId)
        .get().pipe(map(doc => doc.data())).subscribe(info => {
          if (info) {
            this.ptEditForm.controls['firstName'].setValue(info.firstName);
            this.ptEditForm.controls['lastName'].setValue(info.lastName);
          }
        })
    })

    this.ptEmail = this.auth.currentUser?.email;
    this.ptPhone = this.auth.currentUser?.phoneNumber?.substring(2, 12);
    this.ptEmailForm.controls['email'].setValue(this.ptEmail);
    this.ptEmailForm.controls['phone'].setValue(this.ptPhone);
  }

  ngOnInit(): void {

    this.ptEmailForm.get('email')?.valueChanges.subscribe(() =>{
      this.hasChanged = true;
    });
    this.ptEmailForm.get('phone')?.valueChanges.subscribe(() => {
      this.hasChanged = true;
    })

  }

  submitForm() {
    let em = this.ptEmailForm.controls['email'].value;
    let ph = this.ptEmailForm.controls['phone'].value;

    if(this.auth.currentUser && this.patId) {
      if(em == this.ptEmail) {
        this.pt.updatePatientInfo(this.patId, ph).then(val => {
          console.log(val);
        });
      } else if (ph == this.ptPhone) {
        updateEmail(this.auth.currentUser, em).then(() => {
          console.log('Successfully updated your email');
          this.hasChanged = false;
        }).catch((e) => {
          console.log('Error updating email: ', e);
        });
      } else {
        this.pt.updatePatientInfo(this.patId, ph).then(val => {
          console.log(val);
        });
        updateEmail(this.auth.currentUser, em).then(() => {
          console.log('Successfully updated your email');
          this.hasChanged = false;
        }).catch((e) => {
          console.log('Error updating email: ', e);
        });
      }
    } else {
      console.log('Missing Auth ID');
    }

  }

  onSubmit() {
    let fn = this.ptEditForm.controls['firstName'].value;
    let ln = this.ptEditForm.controls['lastName'].value;

    if(this.patId) {
      this.pt.updateStoreName(this.patId, fn, ln).then(() => {
        console.log('Successfully updated users name.');
      }).catch((e) => {
        console.log('Failed to update users name. Reason: ', e);
      })
    }
  }

}
