import { Injectable } from '@angular/core';
import {from, Observable} from "rxjs";
import Client from "fhirclient/lib/Client";
import {oauth2} from "fhirclient";
import {epicConfig, FhirEndpoint, smartHealthIt} from "./env/endpoints";
import {map, shareReplay, switchMap} from "rxjs/operators";
import * as data from '../assets/EpicEndpoints.json'
import { Console } from 'console';

interface EpicEndpoint {
  OrganizationName: string;
  FHIRPatientFacingURI: string;
}

@Injectable({
  providedIn: 'root'
})
export class FhirAuthService {
  public readonly client: Observable<Client|null>;
  public readonly patientId: Observable<string|null>;
  public readonly authorized: Observable<boolean|null>;

  private fhirEndpoints: FhirEndpoint[];

  constructor() {
    this.client = from(oauth2.ready()).pipe(shareReplay(1));
    this.patientId = this.client.pipe(map(client => client?.getPatientId() || null));
    this.authorized = this.client.pipe(map(client => client && client.getPatientId() !== null));
    this.fhirEndpoints = this.getEndpoints();
  }

  authorize = oauth2.authorize;

  testAuth(val: string): void {
    if(val == 'SmartHealthIT'){
      this.authorize(smartHealthIt);
   }
    else if(val == 'epicHealthService') {
     this.authorize(epicConfig);
    }
  }

  //Uses Epic's provided Epic Endpoint to create a list of all te endpoints, then returns as a list of all endpoints
  getEndpoints():FhirEndpoint[]{
    const endpoints: EpicEndpoint[] = (data as any).default;
    const res: FhirEndpoint[] = []
    console.log(endpoints);
    endpoints.forEach(element => {
      let entry = {} as FhirEndpoint;
      entry.FHIRPatientFacingURI = element.FHIRPatientFacingURI;
      entry.OrganizationName = element.OrganizationName;
      //entry.clientId = EPIC_CLIENT_ID;
      res.push(entry)
    });
    return res;
  }
}
