import { GroupSortPipe } from './group-sort.pipe';
import { TestBed } from '@angular/core/testing';
import { CrossComponentDataService } from './cross-component-data.service';
import { GroupCount, SortOptions } from './interfaces';

describe('GroupSortPipe', () => {
  let pipe: GroupSortPipe;
  let ccdService: CrossComponentDataService;
  let groupCount: GroupCount;

  const mockTemplate = {
    href: 'https://www.mocklink.com/page',
    host: 'www.mocklink.com',
    domId: 0,
    tagName: 'A',
  };

  const mockList = [];
  for (let i = 0; i < 3; i++) {
    mockList.push({
      href: mockTemplate.href + i.toString(),
      host: mockTemplate.host,
      domId: mockTemplate.domId + i,
      visible: i !== 0,
      tagName: mockTemplate.tagName
    });
  }

  beforeEach(() => {
    TestBed
        .configureTestingModule({
          providers: [
            CrossComponentDataService
          ]
        });
    ccdService = TestBed.get(CrossComponentDataService);
    pipe = new GroupSortPipe(ccdService);
    ccdService.groupCount$.subscribe((newCount) => groupCount = newCount);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should group all links under the same host', () => {
    const groups = pipe.transform(mockList, 'host', SortOptions.DOM);
    expect(groupCount.numGroups).toEqual(1);
    expect(groups.length).toEqual(1);
    expect(groups[0].key).toEqual(mockTemplate.host);
    expect(groups[0].list).toEqual(mockList);
  });

  it('should group links in two groups by visibility', () => {
    const groups = pipe.transform(mockList, 'visible', SortOptions.DOM);
    expect(groupCount.numGroups).toEqual(2);
    expect(groups.length).toEqual(2);
    const keysArr = groups.map((group) => group.key);
    expect(keysArr).toContain('true');
    expect(keysArr).toContain('false');
  });

  it('should sort links by reverse order without grouping', () => {
    // We create a copy because the pipe sorts in place
    const mockListCopy = mockList.map((link) => link);
    const groups = pipe.transform(mockListCopy, '', SortOptions.DOMReverse);
    expect(groupCount.numGroups).toEqual(1);
    expect(groups.length).toEqual(1);
    expect(groups[0].list.reverse()).toEqual(mockList);
  });

  it('should sort links backwards lexicographically without grouping', () => {
    // We create a copy because the pipe sorts in place
    const mockListCopy = mockList.map((link) => link);
    const groups = pipe.transform(mockListCopy, '', SortOptions.LexicoDescend);
    expect(groupCount.numGroups).toEqual(1);
    expect(groups.length).toEqual(1);
    // Links are already in lexicographical order, so we just expect a reversal
    expect(groups[0].list.reverse()).toEqual(mockList);
  });

});
