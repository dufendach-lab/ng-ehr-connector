import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FhirAuthService } from '../fhir-auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  readonly isAuth = this.auth.authorized;
  readonly isAuth2 = this.logAuth.user;
  constructor(private router: Router, private auth: FhirAuthService, private logAuth: AuthService) {
  }

  ngOnInit(): void {

  }

  // Clears session storage and redirects to simulate logout
  logout(): void {
    this.logAuth.signout();
    this.auth.logOut();
    this.router.navigate(['/']);
  }

}
