import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {filter, first, map, startWith, switchMap} from 'rxjs/operators';
import {FhirAuthService} from "../fhir-auth.service";
import {Router} from "@angular/router";
import {FhirEndpoint} from "../env/endpoints";
import {fhirclient} from "fhirclient/lib/types";
import AuthorizeParams = fhirclient.AuthorizeParams;
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../auth.service';
import { IRegistration } from 'src/Interfaces/IRegistration';
import { IGravidasDetails } from 'src/Interfaces/IGravidasDetails';

@Component({
  selector: 'app-authorize',
  templateUrl: './authorize.component.html',
  styleUrls: ['./authorize.component.scss']
})
export class AuthorizeComponent implements OnInit {

  client = this.auth.client;
  user = this.logAuth.user;
  //registrationInfo: Observable<IRegistration | undefined>;
  gravidasDetails: Observable<IGravidasDetails | undefined>;

  stateCtrl = new FormControl();
  // options: string[] = ['SmartHealthIT', 'epicHealthService'];
  readonly options: string[];
  readonly endpoints: FhirEndpoint[];

  filteredOptions: Observable<string[]> | any;

  constructor(private auth: FhirAuthService, private router: Router, private afs: AngularFirestore, private logAuth: AuthService) {

    // If authorized, navigate to dashboard instead
    this.auth.authorized
      .pipe(first(value => value === true))
      .subscribe(_ => router.navigate(['/dashboard']))

    this.endpoints = this.auth.fhirEndpoints;
    this.options = this.endpoints.map(v => v.OrganizationName);

      this.gravidasDetails = this.user.pipe(
        filter(u => u != null),
        switchMap( u => this.afs
          .collection('patients')
          .doc<IGravidasDetails>(u?.uid)
          .get().pipe(map(doc => doc.data()))
          )
        )
  }

  ngOnInit() {
    // this.check();
    this.filteredOptions = this.stateCtrl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  onSubmit() {
    const orgName = this.stateCtrl.value;
    const endpoint = this.endpoints.find(value => value.OrganizationName === orgName);

    if (endpoint) {
      const params: AuthorizeParams = {
        iss: endpoint.FHIRPatientFacingURI,
        clientId: 'f7cfa009-58a4-4de2-8437-3b77306faedd',
        scope: 'launch/patient',
      }

      this.authorize(params);
    }

  }

  onSubmitSelected(val: string) {
    const orgName = val;
    const endpoint = this.endpoints.find(value => value.OrganizationName === orgName);

    if (endpoint) {
      const params: AuthorizeParams = {
        iss: endpoint.FHIRPatientFacingURI,
        clientId: 'f7cfa009-58a4-4de2-8437-3b77306faedd',
        scope: 'launch/patient',
      }
      this.authorize(params);
    }
  }

  authorize(params: AuthorizeParams) {
    this.auth.authorize(params);
  }

  // // Triggers page reload in ngOnInit
  // check(): void {
  //   if (!sessionStorage.getItem('foo')) {
  //     sessionStorage.setItem('foo', 'no reload');
  //     location.reload();
  //   }
  // }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

}
