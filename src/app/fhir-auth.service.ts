import { Injectable } from '@angular/core';
import {from, Observable} from "rxjs";
import Client from "fhirclient/lib/Client";
import {fhirclient} from "fhirclient/lib/types";
import AuthorizeParams = fhirclient.AuthorizeParams;
import {oauth2} from "fhirclient";
import {epicConfig, smartHealthIt} from "./env/endpoints";
import {shareReplay} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FhirAuthService {
  public readonly client: Observable<Client|null>;

  constructor() {
    this.client = from(oauth2.ready()).pipe(shareReplay(1));
  }

  authorize = oauth2.authorize;

  testAuth(): void {
    // this.authorize(smartHealthIt);
    this.authorize(epicConfig);
  }
}
