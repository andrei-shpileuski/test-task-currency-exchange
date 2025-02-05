import { TestBed } from '@angular/core/testing';

import { VacancyInfoApiService } from './vacancy-info-api.service';

describe('VacancyInfoApiService', () => {
  let service: VacancyInfoApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VacancyInfoApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
