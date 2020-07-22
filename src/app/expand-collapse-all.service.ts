import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * This service is responsible for relaying a collapse/expand all signal from
 * the expand collapse all component and pushing it to the indiv-link component
 */
@Injectable({
  providedIn: 'root'
})
export class ExpandCollapseAllService {

  private expandCollapseSource = new BehaviorSubject<boolean>(false);
  expandCollapseAll$ = this.expandCollapseSource.asObservable();

  constructor() { }

  expandCollapseAll(expand: boolean) {
    this.expandCollapseSource.next(expand);
  }
}
