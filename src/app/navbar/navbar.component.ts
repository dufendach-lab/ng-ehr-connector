import { Component, OnInit } from '@angular/core';
import { waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { fhirclient } from 'fhirclient/lib/types';
import { Observable } from 'rxjs';
import { FhirAuthService } from '../fhir-auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isAuth: Observable<boolean | null>;

  constructor(private router: Router, private auth: FhirAuthService) {
    this.isAuth = auth.authorized;
  }

  ngOnInit(): void {

  }

  // Clears session storage and redirects to simulate logout
  logout(): void {
    sessionStorage.clear();
    this.router.navigate(['/']);
  }

}
