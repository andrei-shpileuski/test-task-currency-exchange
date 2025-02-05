import { TestBed } from '@angular/core/testing';

import { MetadataStateService } from './metadata-state.service';

describe('MetadataStateService', () => {
  let service: MetadataStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MetadataStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
