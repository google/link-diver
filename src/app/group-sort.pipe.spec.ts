import { GroupSortPipe } from './group-sort.pipe';
import { TestBed } from '@angular/core/testing';
import { CrossComponentDataService } from './cross-component-data.service';

describe('GroupSortPipe', () => {
  beforeEach(() => {
    TestBed
        .configureTestingModule({
          providers: [
            CrossComponentDataService
          ]
        });
  });

  it('create an instance', () => {
    const ccdService: CrossComponentDataService = TestBed
        .get(CrossComponentDataService);
    const pipe = new GroupSortPipe(ccdService);
    expect(pipe).toBeTruthy();
  });
});
