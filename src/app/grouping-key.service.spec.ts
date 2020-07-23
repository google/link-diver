import { TestBed } from '@angular/core/testing';

import { GroupingKeyService } from './grouping-key.service';

describe('GroupingKeyService', () => {
  let service: GroupingKeyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupingKeyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
