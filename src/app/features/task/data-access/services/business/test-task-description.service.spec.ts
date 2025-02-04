import { TestBed } from '@angular/core/testing';

import { TestTaskDescriptionService } from './test-task-description.service';

describe('TestTaskDescriptionService', () => {
  let service: TestTaskDescriptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestTaskDescriptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
