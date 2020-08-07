import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SortOptions } from './group-sort.pipe';
import { LinkData } from './link.service';

/**
 * This service is responsible far casting various user options as observables.
 * Such options include the regex to filter, the key to group by, and the order
 * to sort by.
 */
@Injectable({
  providedIn: 'root'
})
export class OptionsService {

  private regexSource = new BehaviorSubject<string>('');
  regexStr = this.regexSource.asObservable();

  private sortOrderSource = new BehaviorSubject<SortOptions>(SortOptions.DOM);
  sortOrder$ = this.sortOrderSource.asObservable();

  private groupingKeySource = new BehaviorSubject<string>('');
  groupingKey$ = this.groupingKeySource.asObservable();

  private filterOptionsSource = new BehaviorSubject<LinkData>(undefined);
  filters$ = this.filterOptionsSource.asObservable();

  constructor() { }

  updateRegex(newRegex: string) {
    this.regexSource.next(newRegex);
  }

  updateOrder(newOrder: SortOptions) {
    this.sortOrderSource.next(newOrder);
  }

  updateGroupingKey(newKey: string) {
    this.groupingKeySource.next(newKey);
  }

  updateFilters(newFilters: LinkData) {
    this.filterOptionsSource.next(newFilters);
  }
}
