import { TestBed } from '@angular/core/testing';

import { RegexService } from './regex.service';

describe('RegexService', () => {
  let service: RegexService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegexService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
