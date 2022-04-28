import { TestBed } from '@angular/core/testing';

import { FhirAuthService } from './fhir-auth.service';

describe('FhirAuthService', () => {
  let service: FhirAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FhirAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
