import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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
