import { TestBed } from '@angular/core/testing';

import { CrossComponentDataService } from './cross-component-data.service';
import { SortOptions, GroupCount, GroupingOptions, GroupByKeys, GroupOrders, FilterOption, FilterKeys, LinkData } from './interfaces';

describe('CrossComponentDataService', () => {
  let service: CrossComponentDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrossComponentDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should properly update the links', () => {
    let links: LinkData[];
    const fakeLinkList = [{
      href: 'https://www.mocklink.com/page1',
      host: 'www.mocklink.com',
      domId: 0,
      tagName: 'A',
      visible: false,
      source: '',
      highlighted: false,
      highlightId: '',
      status: 200,
      statusOk: true,
      contentType: 'text/html'
    }];
    service.linkList$.subscribe((newVal) => links = newVal);
    // Default value for regex
    expect(links).toEqual([]);
    service.updateLinks(fakeLinkList);
    expect(links).toEqual(fakeLinkList);
  });

  it('should properly update the regex', () => {
    let regexArr: RegExp[];
    const fakeRegexArr = [/FakeRegex/];
    service.regexArr$.subscribe((newVal) => regexArr = newVal);
    // Default value for regex
    expect(regexArr).toEqual([]);
    service.updateRegex(fakeRegexArr);
    expect(regexArr).toEqual(fakeRegexArr);
  });

  it('should properly update the sort order', () => {
    let order: SortOptions = undefined;
    const fakeOrder = SortOptions.LexicoAscend;
    service.sortOrder$.subscribe((newVal) => order = newVal);
    // Default value for sort Order
    expect(order).toEqual(SortOptions.DOM);
    service.updateOrder(fakeOrder);
    expect(order).toEqual(fakeOrder);
  });

  it('should properly update the grouping options', () => {
    let grouping: GroupingOptions;
    const fakeGropuing = {
      groupBy: GroupByKeys.Rewrite,
      sort: GroupOrders.SizeAscend,
      regex: /www[.](fakeurl)[.]com/,
      rewrite: '$1'
    };
    service.grouping$.subscribe((newVal) => grouping = newVal);
    // Default value for grouping key
    expect(grouping).toEqual({
      groupBy: GroupByKeys.None,
      sort: GroupOrders.None
    });
    service.updateGroupingOptions(fakeGropuing);
    expect(grouping).toEqual(fakeGropuing);
  });

  it('should properly update the filter options', () => {
    let filters: FilterOption<any>[];
    const fakeFilters: FilterOption<any>[] = [{
      filterKey: FilterKeys.Regex,
      value: /wronglink/,
      isNegation: true,
      inputString: 'wronglink',
      isValidInput: true,
      isHighlightableRegex: false
    }, {
      filterKey: FilterKeys.TagName,
      value: 'A',
      isNegation: false,
      inputString: 'A',
      isValidInput: true,
      isHighlightableRegex: false
    }];
    service.filters$.subscribe((newFilters) => filters = newFilters);
    // Default value for grouping key
    expect(filters).toEqual([]);
    service.updateFilters(fakeFilters);
    expect(filters).toEqual(fakeFilters);
  });

  it('should properly update the show DOM option', () => {
    let option: boolean;
    const fakeOption = true;
    service.showElementSource$.subscribe((newVal) => option = newVal);
    // Default value for show DOM source
    expect(option).toEqual(false);
    service.updateShowElementSource(fakeOption);
    expect(option).toEqual(fakeOption);
  });

  it('should properly update the group count', () => {
    let count: GroupCount = { numGroups: 2, numLinks: 20 };
    const fakeCount = { numGroups: 6, numLinks: 89 };
    service.groupCount$.subscribe((newVal) => count = newVal);
    // Default value for group count
    expect(count).toEqual(undefined);
    service.updateGroupCount(fakeCount);
    expect(count).toEqual(fakeCount);
  });

  it('should properly update the expand collapse all option', () => {
    let option: boolean;
    const fakeOption = true;
    service.expandCollapseAll$.subscribe((newVal) => option = newVal);
    // Default value for show DOM source
    expect(option).toEqual(false);
    service.expandCollapseAll(fakeOption);
    expect(option).toEqual(fakeOption);
  });

  it('should properly update the parent url', () => {
    let parent: string;
    const fakeParent = 'www.mockparent.com';
    service.parent$.subscribe((newVal) => parent = newVal);
    // Default value for show DOM source
    expect(parent).toEqual('');
    service.updateParent(fakeParent);
    expect(parent).toEqual(fakeParent);
  });

});
