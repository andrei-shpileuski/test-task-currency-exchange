import { TestBed } from '@angular/core/testing';

import { TranslationsLoadedStateService } from './translations-loaded-state.service';

describe('TranslationsLoadedStateService', () => {
  let service: TranslationsLoadedStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranslationsLoadedStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
