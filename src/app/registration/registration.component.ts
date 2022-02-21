import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {FhirAuthService} from "../fhir-auth.service";
import { Router } from '@angular/router';
import {AuthService} from "../auth.service";


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  login = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  })

  constructor(
    private fb: FormBuilder,
    private fhirService: FhirAuthService,
    private auth: AuthService,
    private router: Router,
    ) {
  }

  ngOnInit(): void { }

  tempLogin() {
    this.auth.checkCreditionals(this.login.value['email'], this.login.value['password'])
      .then(() => {
        this.router.navigate(['']);
      });
  }

}
