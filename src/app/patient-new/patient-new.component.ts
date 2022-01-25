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
        let auth = {
          email: this.registration.value['email'],
          phone: ("+1" + this.registration.value['password1']),
          password: this.registration.value['phone']
        }
        let regInfo: IRegistration = {
          firstName: this.registration.value['firstname'],
          lastName: this.registration.value['lastname'],
          MotherDoB: this.registration.value['MotherDoB'],
          phone: ("+1" + this.registration.value['password1']),
          roles: ["Patient"],
          docName: ''
        }
        this.reg.createPatient(auth, regInfo).then((result) => {
          console.log(result)
        })
      } catch (e) {
        this.emailInUse = true;
      }
    }
    this.passwordsMatch = false;
  }

}
