import { TestBed } from '@angular/core/testing';

import { AuthorInfoStateService } from './author-info-state.service';

describe('AuthorInfoStateService', () => {
  let service: AuthorInfoStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthorInfoStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
