import { TestBed } from '@angular/core/testing';

import { TestTaskDescriptionStateService } from './test-task-description-state.service';

describe('TestTaskDescriptionStateService', () => {
  let service: TestTaskDescriptionStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestTaskDescriptionStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
