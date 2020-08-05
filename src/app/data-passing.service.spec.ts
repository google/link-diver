import { TestBed } from '@angular/core/testing';

import { DataPassingService } from './data-passing.service';

describe('DataPassingService', () => {
  let service: DataPassingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataPassingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
