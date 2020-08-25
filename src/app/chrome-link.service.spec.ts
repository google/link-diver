import { TestBed } from '@angular/core/testing';

import { ChromeLinkService } from './chrome-link.service';

describe('ChromeLinkService', () => {
  let service: ChromeLinkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChromeLinkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
