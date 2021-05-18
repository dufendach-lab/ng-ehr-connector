import {fhirclient} from 'fhirclient/lib/types';
import AuthorizeParams = fhirclient.AuthorizeParams;

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
