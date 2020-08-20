import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { FetchStatusService } from './fetch-status.service';

describe('FetchStatusService', () => {
  let service: FetchStatusService;
  const mockLinks = 

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    // service = TestBed.inject(FetchStatusService);
  });

  /* it('should be created', () => {
    expect(service).toBeTruthy();
  });*/

  it('should fetch a status for each link', () => {
    inject([HttpTestingController, FetchStatusService],
        (httpMock: HttpTestingController, fetchService: FetchStatusService) => {
          expect(fetchService).toBeTruthy();
          // Add more tests
          expect();
        });
  });
});
