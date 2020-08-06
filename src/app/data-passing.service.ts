import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface GroupCount {
  numGroups: number;
  numLinks: number;
}

@Injectable({
  providedIn: 'root'
})
export class DataPassingService {

  constructor() { }

  private groupCountSource = new BehaviorSubject<GroupCount>(undefined);
  groupCount$ = this.groupCountSource.asObservable();

  updateGroupCount(newCount: GroupCount) {
    this.groupCountSource.next(newCount);
  }

}
