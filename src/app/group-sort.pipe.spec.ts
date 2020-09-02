import { GroupSortPipe } from './group-sort.pipe';
import { TestBed } from '@angular/core/testing';
import { CrossComponentDataService } from './cross-component-data.service';
import { GroupCount, SortOptions, LinkData, GroupByKeys, GroupOrders } from './interfaces';

describe('GroupSortPipe', () => {
  let pipe: GroupSortPipe;
  let ccdService: CrossComponentDataService;
  let groupCount: GroupCount;

  const mockList: LinkData[] = [
    {
      href: 'https://www.mocklink.com/page1',
      host: 'www.mocklink.com',
      domId: 0,
      tagName: 'A',
      visible: false,
      source: '',
      highlighted: false,
      highlightId: ''
    }, {
      href: 'https://www.mocklink.com/page2',
      host: 'www.mocklink.com',
      domId: 1,
      tagName: 'A',
      visible: true,
      source: '',
      highlighted: false,
      highlightId: ''
    }, {
      href: 'https://www.mocklink.com/page3',
      host: 'www.mocklink.com',
      domId: 2,
      tagName: 'A',
      visible: true,
      source: '',
      highlighted: false,
      highlightId: ''
    }
  ];

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
    const grouping = {
      groupBy: GroupByKeys.Host,
      sort: GroupOrders.None
    };
    const groups = pipe.transform(mockList, grouping, SortOptions.DOM);
    expect(groupCount.numGroups).toEqual(1);
    expect(groups.length).toEqual(1);
    expect(groups[0].key).toEqual(mockList[0].host);
    expect(groups[0].list).toEqual(mockList);
  });

  it('should group links in two groups by visibility', () => {
    const grouping = {
      groupBy: GroupByKeys.Visible,
      sort: GroupOrders.None
    };
    const groups = pipe.transform(mockList, grouping, SortOptions.DOM);
    expect(groupCount.numGroups).toEqual(2);
    expect(groups.length).toEqual(2);
    const keysArr = groups.map((group) => group.key);
    expect(keysArr).toContain('true');
    expect(keysArr).toContain('false');
  });

  it('should sort links by reverse order without grouping', () => {
    // We create a copy because the pipe sorts in place
    const grouping = {
      groupBy: GroupByKeys.None,
      sort: GroupOrders.None
    };
    const listCopy = mockList.map((link) => link);
    const groups = pipe.transform(listCopy, grouping, SortOptions.DOMReverse);
    expect(groupCount.numGroups).toEqual(1);
    expect(groups.length).toEqual(1);
    expect(groups[0].list.reverse()).toEqual(mockList);
  });

  it('should sort links backwards lexicographically without grouping', () => {
    // We create a copy because the pipe sorts in place
    const grouping = {
      groupBy: GroupByKeys.None,
      sort: GroupOrders.None
    };
    const listCopy = mockList.map((link) => link);
    const groups = pipe.transform(listCopy, grouping, SortOptions.LexicoDescend);
    expect(groupCount.numGroups).toEqual(1);
    expect(groups.length).toEqual(1);
    // Links are already in lexicographical order, so we just expect a reversal
    expect(groups[0].list.reverse()).toEqual(mockList);
  });

  it('should group by rewrite', () => {
    const grouping = {
      groupBy: GroupByKeys.Rewrite,
      sort: GroupOrders.LexicoDescend,
      regex: /https?:[/][/]www[.]mocklink[.]com[/](page\d)/,
      rewrite: '$1'
    };
    const groups = pipe.transform(mockList, grouping, SortOptions.DOM);
    expect(groupCount.numGroups).toEqual(3);
    expect(groups.length).toEqual(3);
    expect(groups[0].key).toEqual('page3');
    expect(groups[1].key).toEqual('page2');
    expect(groups[2].key).toEqual('page1');
  });

});
