import { Component, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { FhirAuthService } from '../fhir-auth.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-user-nav',
  templateUrl: './user-nav.component.html',
  styleUrls: ['./user-nav.component.scss']
})
export class UserNavComponent {
  @ViewChild('drawer') drawer: any;
  
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
              private router: Router,
              private auth: FhirAuthService,
              private ehrAuth: AuthService,
    ) {}


  // Clears session storage and redirects to simulate logout
  logout(): void {
    this.ehrAuth.signout();
    this.auth.logOut();
    this.router.navigate(['/']);
  }

  // Closes sidenav after selection
  closeSideNav() {
    if(this.drawer._mode==="over"){
      this.drawer.close();
    }
  }
}
