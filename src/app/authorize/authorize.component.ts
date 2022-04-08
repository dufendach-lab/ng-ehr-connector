import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {filter, first, map, startWith, switchMap} from 'rxjs/operators';
import {FhirAuthService} from "../fhir-auth.service";
import {Router} from "@angular/router";
import {FhirEndpoint} from "../env/endpoints";
import {fhirclient} from "fhirclient/lib/types";
import AuthorizeParams = fhirclient.AuthorizeParams;
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../auth.service';
import { IGravidasDetails } from 'src/Interfaces/IGravidasDetails';

@Component({
  selector: 'app-authorize',
  templateUrl: './authorize.component.html',
  styleUrls: ['./authorize.component.scss']
})
export class AuthorizeComponent implements OnInit {

  user = this.logAuth.user;
  gravidasDetails: Observable<IGravidasDetails | undefined>;

  stateCtrl = new FormControl();
  readonly options: string[];
  readonly endpoints: FhirEndpoint[];

  filteredOptions: Observable<string[]> | any;

  constructor(private auth: FhirAuthService, private router: Router, private afs: AngularFirestore, private logAuth: AuthService) {
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
    );
  }

  ngOnInit() {
    this.filteredOptions = this.stateCtrl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  /*
  * Redirects to selected hospitals auth provider
  */
  onSubmit() {
    const orgName = this.stateCtrl.value;
    const endpoint = this.endpoints.find(value => value.OrganizationName === orgName);

    if (endpoint) {
      this.authorize(this.auth.getAuthParams(endpoint));
    }
  }

  /*
  * Accepts auth parameters and authorizes the user with the fhir interface
  */
  authorize(params: AuthorizeParams) {
    this.auth.authorize(params);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}
