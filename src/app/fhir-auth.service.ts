import {Inject, Injectable} from '@angular/core';
import {from, Observable, Subject} from "rxjs";
import Client from "fhirclient/lib/Client";
import {oauth2} from "fhirclient";
import {EPIC_DEV_CLIENT_ID, FhirEndpoint} from "./env/endpoints";
import {first, map, shareReplay} from "rxjs/operators";
import * as endpointData from '../assets/test-epic-endpoints.json'
import {WINDOW} from "./util/window-provider";
import {fhirclient} from "fhirclient/lib/types";
import AuthorizeParams = fhirclient.AuthorizeParams;

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

  private readonly origin: string;

  constructor(@Inject(WINDOW) private window: Window) {
    this.client = this._client.pipe(shareReplay(1));

    this.patientId = this.client.pipe(map(client => client?.getPatientId() || null));
    this.authorized = this.client.pipe(map(client => client && client.getPatientId() !== null));
    this.fhirEndpoints = this.getEndpoints();

    this.origin = this.window.location.origin;

    from(oauth2.ready()).subscribe(client => this._client.next(client));

    this.client.pipe(first()).subscribe(); // hack to be sure client gets loaded
  }

  //Uses Epic's provided Epic Endpoint to create a list of all the endpoints, then returns as a list of all endpoints
  private getEndpoints(): FhirEndpoint[] {
    const endpoints: EpicEndpoint[] = (endpointData as any).default;
    const res: FhirEndpoint[] = []
    endpoints.forEach(element => {
      let entry = {} as FhirEndpoint;
      entry.clientId = EPIC_DEV_CLIENT_ID;
      entry.FHIRPatientFacingURI = element.FHIRPatientFacingURI;
      entry.OrganizationName = element.OrganizationName;
      res.push(entry)
    });
    return res;
  }

  getAuthParams(endpoint: EpicEndpoint): AuthorizeParams {
    return {
      iss: endpoint.FHIRPatientFacingURI,
      clientId: EPIC_DEV_CLIENT_ID,
      scope: 'launch/patient',
      redirectUri: this.origin + '/dashboard'
    }
  }

  logOut() {
    sessionStorage.clear();
    this._client.next(null);
  }
}
