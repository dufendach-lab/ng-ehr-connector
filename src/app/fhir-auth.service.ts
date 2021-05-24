import {Injectable} from '@angular/core';
import {from, Observable, Subject} from "rxjs";
import Client from "fhirclient/lib/Client";
import {oauth2} from "fhirclient";
import {epicConfig, FhirEndpoint, smartHealthIt} from "./env/endpoints";
import {map, shareReplay} from "rxjs/operators";
// import * as endpointData from '../assets/EpicEndpoints.json'
import * as endpointData from '../assets/test-epic-endpoints.json'

interface EpicEndpoint {
  OrganizationName: string;
  FHIRPatientFacingURI: string;
}

@Injectable({
  providedIn: 'root'
})
export class FhirAuthService {
  readonly client: Observable<Client | null>;
  readonly patientId: Observable<string | null>;
  readonly authorized: Observable<boolean | null>;
  readonly authorize = oauth2.authorize;
  readonly fhirEndpoints: FhirEndpoint[];
  private _client: Subject<Client | null> = new Subject();

  constructor() {
    this.client = this._client.pipe(shareReplay(1));
    this.patientId = this.client.pipe(map(client => client?.getPatientId() || null));
    this.authorized = this.client.pipe(map(client => client && client.getPatientId() !== null));
    this.fhirEndpoints = this.getEndpoints();

    from(oauth2.ready()).subscribe(client => this._client.next(client));
  }
  //
  // testAuth(val: string): void {
  //   if (val == 'SmartHealthIT') {
  //     this.authorize(smartHealthIt);
  //   } else if (val == 'epicHealthService') {
  //     this.authorize(epicConfig);
  //   }
  // }

  //Uses Epic's provided Epic Endpoint to create a list of all te endpoints, then returns as a list of all endpoints
  private getEndpoints(): FhirEndpoint[] {
    const endpoints: EpicEndpoint[] = (endpointData as any).default;
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

  logOut() {
    sessionStorage.clear();

    this._client.next(null);
  }
}
