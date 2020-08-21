import { TestBed, inject, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { FetchStatusService } from './fetch-status.service';

describe('FetchStatusService', () => {
  let service: FetchStatusService;
  let httpMock: HttpTestingController;

  const mockList = [];

  mockList.push({ href: 'https://www.mocklink.com/page0' });
  mockList.push({ href: 'https://www.mocklink.com/page1' });
  mockList.push({ href: 'https://www.mocklink.com/page2' });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        FetchStatusService
      ]
    });
    const testBed = getTestBed();
    service = testBed.get(FetchStatusService);
    httpMock = testBed.get(HttpTestingController);
  });

  it('should fill the mock list with responses', () => {

    service.fetch(mockList);
    mockList.forEach((link) => {
      console.log(link);
      const request = httpMock.expectOne(link.href);
      expect(request.request.method).toEqual('GET');
      console.log(link.hasOwnProperty('mockContentType'));
      // Testing
      request.flush({
        response: {
          status: 200,
          ok: true,
          headers: {
            has: (str) => true,
            get: (str) => 'text/html'
          }
        }
      });
    });

  });

  afterEach(inject([HttpTestingController], (httpMock) => {
    httpMock.verify();
  }));

});
