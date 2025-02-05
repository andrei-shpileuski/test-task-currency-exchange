import { TestBed } from '@angular/core/testing';

import { AuthorInfoApiService } from './author-info-api.service';

describe('AuthorInfoApiService', () => {
  let service: AuthorInfoApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthorInfoApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
