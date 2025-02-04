import { TestBed } from '@angular/core/testing';

import { RequestTrackerStateService } from './request-tracker-state.service';

describe('RequestTrackerStateService', () => {
  let service: RequestTrackerStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestTrackerStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
