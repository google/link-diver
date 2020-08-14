import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SortOptions, GroupCount, FilterOption } from './interfaces';

/**
 * This service is generally responsible for passing any sort of data between
 * components that are not directly related.
 */
@Injectable({
  providedIn: 'root'
})
export class CrossComponentDataService {

  private regexSource = new BehaviorSubject<RegExp>(undefined);
  regex$ = this.regexSource.asObservable();

  private sortOrderSource = new BehaviorSubject<SortOptions>(SortOptions.DOM);
  sortOrder$ = this.sortOrderSource.asObservable();

  private groupingKeySource = new BehaviorSubject<string>('');
  groupingKey$ = this.groupingKeySource.asObservable();

  private filterOptionsSource = new BehaviorSubject<FilterOption<any>[]>([]);
  filters$ = this.filterOptionsSource.asObservable();

  private showDOMSource = new BehaviorSubject<boolean>(false);
  showDOMSource$ = this.showDOMSource.asObservable();

  private groupCountSource = new BehaviorSubject<GroupCount>(undefined);
  groupCount$ = this.groupCountSource.asObservable();

  private expandCollapseSource = new BehaviorSubject<boolean>(false);
  expandCollapseAll$ = this.expandCollapseSource.asObservable();

  constructor() { }

  updateRegex(newRegex: RegExp) {
    this.regexSource.next(newRegex);
  }

  updateOrder(newOrder: SortOptions) {
    this.sortOrderSource.next(newOrder);
  }

  updateGroupingKey(newKey: string) {
    this.groupingKeySource.next(newKey);
  }

  updateFilters(newFilters: FilterOption<any>[]) {
    this.filterOptionsSource.next(newFilters);
  }

  updateShowDOMSource(newShowSource: boolean) {
    this.showDOMSource.next(newShowSource);
  }

  updateGroupCount(newCount: GroupCount) {
    this.groupCountSource.next(newCount);
  }

  expandCollapseAll(expand: boolean) {
    this.expandCollapseSource.next(expand);
  }

}
