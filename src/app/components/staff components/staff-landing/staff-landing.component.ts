import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FhirAuthService} from "../../../services/fhir-auth.service";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-staff-landing',
  templateUrl: './staff-landing.component.html',
  styleUrls: ['./staff-landing.component.scss']
})
export class StaffLandingComponent implements OnInit {

  constructor(public router: Router,
              private auth: FhirAuthService,
              private ehrAuth: AuthService,) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.ehrAuth.signout();
    this.auth.logOut();
    localStorage.clear();
    this.router.navigate(['/launch']);
  }
}
