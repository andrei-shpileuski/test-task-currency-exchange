import { TestBed } from '@angular/core/testing';

import { VacancyApiService } from './vacancy-api.service';

describe('VacancyApiService', () => {
  let service: VacancyApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VacancyApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
