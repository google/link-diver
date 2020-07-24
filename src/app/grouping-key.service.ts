import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * This service is an intermitiary between the input bar component and the
 * group list component responsible for passing along the selected attribute to
 * group the links by.
 */
@Injectable({
  providedIn: 'root'
})
export class GroupingKeyService {

  private groupingKeySource = new BehaviorSubject<string>('');
  groupingKey$ = this.groupingKeySource.asObservable();

  constructor() { }

  updateGroupingKey(newKey: string) {
    this.groupingKeySource.next(newKey);
  }
}
