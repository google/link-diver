import { TestBed, inject, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { FetchStatusService } from './fetch-status.service';

describe('FetchStatusService', () => {
  let service: FetchStatusService;
  let httpMock: HttpTestingController;

  const mockList = [{
    href: 'https://www.mocklink.com/page0',
    host: '',
    visible: true,
    domId: 0,
    tagName: 'a',
    source: '',
    highlighted: false,
    highlightId: '',
    expectedContentType: 'text/html'
  }, {
    href: 'https://www.mocklink.com/page1',
    host: '',
    visible: true,
    domId: 0,
    tagName: 'a',
    source: '',
    highlighted: false,
    highlightId: '',
    expectedContentType: 'application/json'
  }, {
    href: 'https://www.mocklink.com/page2',
    host: '',
    visible: true,
    domId: 0,
    tagName: 'a',
    source: '',
    highlighted: false,
    highlightId: '',
    expectedContentType: 'image/png'
  }];

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
      const request = httpMock.expectOne(link.href);
      expect(request.request.method).toEqual('HEAD');
      request.flush('', {
        headers: {
          'Content-Type': link.expectedContentType
        }
      });
    });

    mockList.forEach((link) => {
      expect(link['status']).toEqual(200);
      expect(link['statusOk']).toEqual(true);
      expect(link['contentType']).toEqual(link.expectedContentType);
    });

  });

  afterEach(inject([HttpTestingController], (httpMock) => {
    httpMock.verify();
  }));

});
