import {Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import {FhirAuthService} from "../fhir-auth.service";
import { Router } from '@angular/router';
import {AuthService} from "../auth.service";
import {ResetPasswordComponent} from "../reset-password/reset-password.component";
import {MatDialog} from "@angular/material/dialog";


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  login = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  constructor(
    private fhirService: FhirAuthService,
    private auth: AuthService,
    private router: Router,
    private dialog: MatDialog
    ) {
  }

  ngOnInit(): void { }

  tempLogin() {
    this.auth.checkCreditionals(this.login.controls['email'].value, this.login.controls['password'].value)
      .then(() => {
        this.router.navigate(['']);
      });
  }

  passReset() {
    const dialogRef = this.dialog.open(ResetPasswordComponent, {
      width: '300px',
      data: false
    });
  }

}
