import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SortOptions } from './sort.pipe';

/**
 * This service is responsible for casting the current regular expression as an
 * obersvable to keep all of the components in sync
 */
@Injectable({
  providedIn: 'root'
})
export class RegexService {

  private regexSource = new BehaviorSubject<string>('');
  regexStr = this.regexSource.asObservable();

  private sortOrderSource = new BehaviorSubject<SortOptions>(SortOptions.DOM);
  sortOrder$ = this.sortOrderSource.asObservable();

  constructor() { }

  updateRegex(newRegex: string) {
    this.regexSource.next(newRegex);
  }

  updateOrder(newOrder: SortOptions) {
    this.sortOrderSource.next(newOrder);
  }
}
