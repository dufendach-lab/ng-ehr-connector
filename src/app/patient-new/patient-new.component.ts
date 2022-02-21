import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, Validators} from "@angular/forms";
import {RegistrationService} from "../registration.service";
import {IRegistration} from "../../Interfaces/IRegistration";

@Component({
  selector: 'app-patient-new',
  templateUrl: './patient-new.component.html',
  styleUrls: ['./patient-new.component.scss']
})
export class PatientNewComponent implements OnInit {

  registration = this.fb.group({
    firstname: ['' , Validators.required],
    lastname: ['', Validators.required],
    MotherDoB: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', Validators.required],
    password1: ['', Validators.required],
    password2: ['', Validators.required],
  })

  emailInUse = false;
  hide1 = true;
  hide2 = true;
  passwordsMatch = true;
  regInfo = {} as IRegistration;

  constructor(private router: Router,
              private fb: FormBuilder,
              private reg: RegistrationService) {
  }

  ngOnInit(): void {
  }

  /*
  * OnSubmit - Takes the form info and creates a patient.
  * Will soon be scrapped as registration will move to cloud function.
  *
  * */
  onSubmit() {
    if(this.registration.value['password1'] === this.registration.value['password2']) {
      try {
        this.reg.createPatient(this.registration.value['email'], this.registration.value['password1'], ('+1' + this.registration.value['phone'])).then((result) => {
          if(result) {
            this.regInfo.firstName = this.registration.value['firstname'];
            this.regInfo.lastName = this.registration.value['lastname'];
            this.regInfo.MotherDoB = this.registration.value['MotherDoB'];
            this.regInfo.phone = ('+1' + this.registration.value['phone']);
            this.regInfo.roles = ["Patient"];
            this.reg.createPatientInfo(result, this.regInfo).then(() => {
              this.router.navigate(['/admin-list']);
            });
          }
        });
      } catch (e) {
        this.emailInUse = true;
      }
    } else {
      this.passwordsMatch = false;
    }
  }

}
