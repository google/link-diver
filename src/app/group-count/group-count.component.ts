import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { GroupCount, DataPassingService } from '../data-passing.service';
import { OptionsService } from '../options.service';

@Component({
  selector: 'app-group-count',
  templateUrl: './group-count.component.html',
  styleUrls: ['./group-count.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupCountComponent implements OnInit {

  groupCount: GroupCount;
  groupingOn: boolean;

  constructor(private dataPassing: DataPassingService,
      private optionsService: OptionsService,
      private changeDetector: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.changeDetector.detach();
    this.dataPassing.groupCount$.subscribe((newCount: GroupCount) => {
      this.groupCount = newCount;
      this.changeDetector.detectChanges();
    });
    this.optionsService.groupingKey$.subscribe((newKey: string) => {
      this.groupingOn = !!newKey;
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
