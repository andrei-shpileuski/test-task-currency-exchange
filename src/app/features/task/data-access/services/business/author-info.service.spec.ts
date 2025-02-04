import { TestBed } from '@angular/core/testing';

import { AuthorInfoService } from './author-info.service';

describe('AuthorInfoService', () => {
  let service: AuthorInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthorInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
