import { TestBed } from '@angular/core/testing';

import { FontsLoadedStateService } from './fonts-loaded-state.service';

describe('FontsLoadedStateService', () => {
  let service: FontsLoadedStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FontsLoadedStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
