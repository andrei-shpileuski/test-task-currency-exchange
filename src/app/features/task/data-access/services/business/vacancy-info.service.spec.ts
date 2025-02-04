import { TestBed } from '@angular/core/testing';

import { VacancyInfoService } from './vacancy-info.service';

describe('VacancyInfoService', () => {
  let service: VacancyInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VacancyInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
