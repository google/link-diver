import { TestBed } from '@angular/core/testing';

import { FetchStatusService } from './fetch-status.service';

describe('FetchStatusService', () => {
  let service: FetchStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
