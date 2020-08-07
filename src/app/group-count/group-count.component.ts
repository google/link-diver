import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { GroupCount, DataPassingService } from '../data-passing.service';

@Component({
  selector: 'app-group-count',
  templateUrl: './group-count.component.html',
  styleUrls: ['./group-count.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupCountComponent implements OnInit {

  groupCount: GroupCount;

  constructor(private dataPassing: DataPassingService,
      private changeDetector: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.changeDetector.detach();
    this.dataPassing.groupCount$.subscribe((newCount: GroupCount) => {
      this.groupCount = newCount;
      this.changeDetector.detectChanges();
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
    return `${groupStr}, ${linkStr}`;
  }

}
