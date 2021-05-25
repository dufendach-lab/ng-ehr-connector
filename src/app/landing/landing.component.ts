import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import {FhirAuthService} from "../fhir-auth.service";
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { AuthService } from '../auth.service';
import { first } from 'rxjs/operators';
import { LandingInfoComponent } from '../landing-info/landing-info.component';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  isAuthorized = this.fhirAuth.authorized;

  constructor(private dialog: MatDialog, private fhirAuth: FhirAuthService, private router: Router, private RegAuth: AuthService ) {
    // If authorized, navigate to dashboard instead
    this.fhirAuth.authorized
      .pipe(first(value => value === true))
      .subscribe(_ => router.navigate(['/dashboard']))
   }

  loggedIn = this.RegAuth.getLoginAuth();
  email= '';

  ngOnInit(): void {
    if(this.loggedIn == 'false'){
      this.loginModal();
    }

    // this.router.events.pipe(
    //   filter((event: RouterEvent) => event instanceof NavigationEnd),
    //   takeUntil(this.destroy),
    //   debounceTime(1000)
    // ).subscribe(() => {
    //   this.loginModal();
    // });
  }

  loginModal(){
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '400px',
      data: {},
      disableClose: true
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   this.email = result;
    // });
  }
}
