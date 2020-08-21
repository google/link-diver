import { TestBed } from '@angular/core/testing';

import { CrossComponentDataService } from './cross-component-data.service';
import { SortOptions, GroupCount } from './interfaces';

describe('CrossComponentDataService', () => {
  let service: CrossComponentDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrossComponentDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should properly update the regex', () => {
    let regex: string;
    const fakeRegex = 'FakeRegex';
    service.regexStr.subscribe((newVal) => regex = newVal);
    // Default value for regex
    expect(regex).toEqual('');
    service.updateRegex(fakeRegex);
    expect(regex).toEqual(fakeRegex);
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

  it('should properly update the grouping key', () => {
    let key: string;
    const fakeKey = 'FakeKey';
    service.groupingKey$.subscribe((newVal) => key = newVal);
    // Default value for grouping key
    expect(key).toEqual('');
    service.updateGroupingKey(fakeKey);
    expect(key).toEqual(fakeKey);
  });

  it('should properly update the filter options', () => {
    // We need to fix the design of the filterOptions before we write this test
    // TODO: Once we have the new filtering system down, write this test
    /* let filters: LinkData;
    const fakeFilters = {
      host: 'www.fakehost.com'
    };
    service.filters$.subscribe((newVal) => filters = newVal);
    // Default value for grouping key
    expect(filters).toBe(undefined);
    service.updateFilters(fakeFilters);
    expect(filters).toEqual(fakeFilters); */
  });

  it('should properly update the show DOM option', () => {
    let option: boolean;
    const fakeOption = true;
    service.showDOMSource$.subscribe((newVal) => option = newVal);
    // Default value for show DOM source
    expect(option).toEqual(false);
    service.updateShowDOMSource(fakeOption);
    expect(option).toEqual(fakeOption);
  });

  it('should properly update the group count', () => {
    let count: GroupCount = {numGroups: 2, numLinks: 20};
    const fakeCount = {numGroups: 6, numLinks: 89};
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

});
