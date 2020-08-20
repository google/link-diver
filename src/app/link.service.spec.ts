import { TestBed } from '@angular/core/testing';

import { LinkService } from './link.service';
import { LinkData } from './interfaces';
import { FetchStatusService } from './fetch-status.service';
import { Title } from '@angular/platform-browser';

describe('LinkService', () => {
  let service: LinkService;
  const fetchFake = { fetch: (links: LinkData[]) => {
    links.forEach((link: LinkData) => {
      link.status = 200;
      link.statusOk = true;
      link.contentType = 'text/html';
    });
  }};

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        Title,
        { provide: FetchStatusService, useValue: fetchFake}
      ]
    });
    service = TestBed.inject(LinkService);
  });

  /* it('should be created', () => {
    expect(service).toBeTruthy();
  });*/
});
