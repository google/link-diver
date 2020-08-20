import { TestBed } from '@angular/core/testing';

import { ChromeAPIService } from './link.service';

describe('ChromeAPIService', () => {
  let service: ChromeAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChromeAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
