import { Injectable } from '@angular/core';
import {from, Observable} from "rxjs";
import Client from "fhirclient/lib/Client";
import {oauth2} from "fhirclient";
import {epicConfig, smartHealthIt} from "./env/endpoints";
import {map, shareReplay} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FhirAuthService {
  public readonly client: Observable<Client|null>;
  public readonly patientId: Observable<string|null>;

  constructor() {
    this.client = from(oauth2.ready()).pipe(shareReplay(1));
    this.patientId = this.client.pipe(map(client => client?.getPatientId() || null));
  }

  authorize = oauth2.authorize;

  testAuth(): void {
    this.authorize(smartHealthIt);
    //this.authorize(epicConfig);
  }
}
