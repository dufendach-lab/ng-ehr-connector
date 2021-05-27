import { TestBed } from '@angular/core/testing';

import { EhrDataService } from './ehr-data.service';

describe('EhrDataService', () => {
  let service: EhrDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EhrDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
