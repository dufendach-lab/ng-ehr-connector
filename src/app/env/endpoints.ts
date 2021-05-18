import {fhirclient} from 'fhirclient/lib/types';
import AuthorizeParams = fhirclient.AuthorizeParams;

export interface FhirEndpoint extends AuthorizeParams {
  label: string;
  clientId: string;
  iss: string;
  scope?: string;

  // public getAuthorizeParams(): AuthorizeParams {
  //   return {
  //     clientId: this.clientId,
  //     iss: this.iss,
  //     scope: this.scope,
  //   }
  // }
}

const EPIC_CLIENT_ID = 'f7cfa009-58a4-4de2-8437-3b77306faedd';

export const testEndpoints: FhirEndpoint[] = [
  {
    label: 'Smart Health IT test server',
    clientId: 'any-client-id-will-work',
    iss: 'https://launch.smarthealthit.org/v/r3/sim/eyJrIjoiMSIsImoiOiIxIiwiYiI6IjExOTc2ZjkwLWJiNDItNDUwYS04YjU4LTkyYTRjYWNlMWQyNyJ9/fhir',
  },
  {
    label: 'Epic DSTU2',
    clientId: EPIC_CLIENT_ID, // EHR Connector
    iss: 'https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/DSTU2/', // DSTU2
  },
  {
    label: 'Open-ic.Epic',
    clientId: EPIC_CLIENT_ID, // EHR Connector
    iss: 'https://open-ic.epic.com/argonaut/api/FHIR/Argonaut/', // Open epic
  },
  {
    label: 'CCHMC Dev Server',
    clientId: EPIC_CLIENT_ID,
    iss: 'https://boomertest.cchmc.org/fhir/api/FHIR/DSTU2/',
  },
  {
    label: 'UC Dev Server',
    clientId: EPIC_CLIENT_ID,
    iss: 'https://epic-soap-test.uchealth.com/FHIRProxy/api/FHIR/DSTU2/',
  },
]

export const smartHealthIt: AuthorizeParams = {
  clientId: 'any-client-id-will-work',
  scope: 'launch/patient',
  // iss: 'https://launch.smarthealthit.org/v/r2/sim/eyJrIjoiMSIsImoiOiIxIiwiYiI6InNtYXJ0LTc3Nzc3MDUifQ/fhir',
  iss: 'https://launch.smarthealthit.org/v/r3/sim/eyJrIjoiMSIsImoiOiIxIiwiYiI6IjExOTc2ZjkwLWJiNDItNDUwYS04YjU4LTkyYTRjYWNlMWQyNyJ9/fhir',
  // redirectUri: 'http://localhost:4200/dashboard',
};

export const epicConfig: AuthorizeParams = {
  clientId: 'f7cfa009-58a4-4de2-8437-3b77306faedd', // EHR Connector
  scope: 'launch/patient',
  iss: 'https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/DSTU2/', // DSTU2
  // iss: 'https://open-ic.epic.com/argonaut/api/FHIR/Argonaut/', // Open epic
  // redirectUri: 'http://localhost:4200/dashboard',
}
