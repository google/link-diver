import { TestBed } from '@angular/core/testing';

import { ExpandCollapseAllService } from './expand-collapse-all.service';

describe('ExpandCollapseAllService', () => {
  let service: ExpandCollapseAllService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpandCollapseAllService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
