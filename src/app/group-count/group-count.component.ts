import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { CrossComponentDataService } from '../cross-component-data.service';
import { GroupCount, GroupByKeys } from '../interfaces';

@Component({
  selector: 'app-group-count',
  templateUrl: './group-count.component.html',
  styleUrls: ['./group-count.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupCountComponent implements OnInit {

  groupCount: GroupCount;
  groupingOn: boolean;

  constructor(private ccdService: CrossComponentDataService,
      private changeDetector: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.changeDetector.detach();
    this.ccdService.groupCount$.subscribe((newCount: GroupCount) => {
      this.groupCount = newCount;
      this.changeDetector.detectChanges();
    });
    this.ccdService.groupingKey$.subscribe((newKey: GroupByKeys) => {
      this.groupingOn = newKey !== GroupByKeys.None;
    });
  }

  getGroupCountDescription() {
    let groupStr = `${this.groupCount.numGroups} Group`;
    let linkStr = `${this.groupCount.numLinks} URL`;

    if (this.groupCount.numLinks > 1) {
      linkStr += 's';
    }
    if (this.groupCount.numGroups > 1) {
      groupStr += 's';
    }

    if (this.groupingOn) {
      return `${groupStr}, ${linkStr}`;
    } else {
      return linkStr;
    }
  }

}
