import {Component, OnInit} from '@angular/core';
import {FhirAuthService} from "../../../services/fhir-auth.service";
import {AuthService} from '../../../services/auth.service';
import {Observable} from "rxjs";
import {map, shareReplay} from "rxjs/operators";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {PatientStateService} from "../../../services/patient-state.service";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})

export class LandingComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  state$ = this.stateService.state$;
  isAuthorized = this.fhirAuth.authorized;
  user = this.auth.user;

  constructor(
    private fhirAuth: FhirAuthService,
    private auth: AuthService,
    private breakpointObserver: BreakpointObserver,
    public stateService: PatientStateService
  ) {}

  ngOnInit(): void {}

}
