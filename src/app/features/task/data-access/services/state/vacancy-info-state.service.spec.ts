import { TestBed } from '@angular/core/testing';

import { VacancyInfoStateService } from './vacancy-info-state.service';

describe('VacancyInfoStateService', () => {
  let service: VacancyInfoStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VacancyInfoStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
