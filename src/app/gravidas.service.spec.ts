import { TestBed } from '@angular/core/testing';

import { GravidasService } from './gravidas.service';

describe('GravidasService', () => {
  let service: GravidasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GravidasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
