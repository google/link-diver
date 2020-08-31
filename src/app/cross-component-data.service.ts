import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SortOptions, GroupCount, FilterOption, GroupByKeys, LinkData, GroupingOptions, GroupOrders } from './interfaces';

/**
 * This service is generally responsible for passing any sort of data between
 * components that are not directly related.
 */
@Injectable({
  providedIn: 'root'
})
export class CrossComponentDataService {

  private linkListSource = new BehaviorSubject<LinkData[]>([]);
  linkList$ = this.linkListSource.asObservable();

  private regexArrSource = new BehaviorSubject<RegExp[]>([]);
  regexArr$ = this.regexArrSource.asObservable();

  private sortOrderSource = new BehaviorSubject<SortOptions>(SortOptions.DOM);
  sortOrder$ = this.sortOrderSource.asObservable();

  private groupingSource = new BehaviorSubject<GroupingOptions>({
    groupBy: GroupByKeys.None,
    sort: GroupOrders.None
  });
  grouping$ = this.groupingSource.asObservable();

  private filterOptionsSource = new BehaviorSubject<FilterOption<any>[]>([]);
  filters$ = this.filterOptionsSource.asObservable();

  private showElementSource = new BehaviorSubject<boolean>(false);
  showElementSource$ = this.showElementSource.asObservable();

  private groupCountSource = new BehaviorSubject<GroupCount>(undefined);
  groupCount$ = this.groupCountSource.asObservable();

  private expandCollapseSource = new BehaviorSubject<boolean>(false);
  expandCollapseAll$ = this.expandCollapseSource.asObservable();

  private parentSource = new BehaviorSubject<string>('');
  parent$ = this.parentSource.asObservable();

  constructor() { }

  updateLinks(newLinks: LinkData[]) {
    this.linkListSource.next(newLinks);
  }

  updateRegex(newRegexArr: RegExp[]) {
    this.regexArrSource.next(newRegexArr);
  }

  updateOrder(newOrder: SortOptions) {
    this.sortOrderSource.next(newOrder);
  }

  updateGroupingOptions(newGrouping: GroupingOptions) {
    this.groupingSource.next(newGrouping);
  }

  updateFilters(newFilters: FilterOption<any>[]) {
    this.filterOptionsSource.next(newFilters);
  }

  updateShowElementSource(newShowSource: boolean) {
    this.showElementSource.next(newShowSource);
  }

  updateGroupCount(newCount: GroupCount) {
    this.groupCountSource.next(newCount);
  }

  expandCollapseAll(expand: boolean) {
    this.expandCollapseSource.next(expand);
  }

  updateParent(newParent: string) {
    this.parentSource.next(newParent);
  }

}
