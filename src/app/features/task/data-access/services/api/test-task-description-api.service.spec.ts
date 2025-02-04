import { TestBed } from '@angular/core/testing';

import { TestTaskDescriptionApiService } from './test-task-description-api.service';

describe('TestTaskDescriptionApiService', () => {
  let service: TestTaskDescriptionApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestTaskDescriptionApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
