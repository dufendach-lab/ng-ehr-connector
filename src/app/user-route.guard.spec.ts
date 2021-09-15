import { TestBed } from '@angular/core/testing';

import { UserRouteGuard } from './user-route.guard';

describe('UserRouteGuard', () => {
  let guard: UserRouteGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UserRouteGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
