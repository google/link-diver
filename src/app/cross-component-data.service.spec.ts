import { TestBed } from '@angular/core/testing';

import { CrossComponentDataService } from './cross-component-data.service';

describe('CrossComponentDataService', () => {
  let service: CrossComponentDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrossComponentDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
