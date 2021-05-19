import { TestBed } from '@angular/core/testing';

import { FhirPatientService } from './fhir-patient.service';

describe('FhirPatientService', () => {
  let service: FhirPatientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FhirPatientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
