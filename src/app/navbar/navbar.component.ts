import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FhirAuthService } from '../fhir-auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  readonly isAuth = this.auth.authorized;

  constructor(private router: Router, private auth: FhirAuthService) {
  }

  ngOnInit(): void {

  }

  // Clears session storage and redirects to simulate logout
  logout(): void {

    this.auth.logOut();
    this.router.navigate(['/']);
  }

}
