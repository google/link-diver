import { Component, OnInit } from '@angular/core';
import { LinkService } from '../link.service';
import { DataPassingService, GroupCount } from '../data-passing.service';

/**
 * A large parent component to hold sub-components that deal with input
 */
@Component({
  selector: 'app-input-panel',
  templateUrl: './input-panel.component.html',
  styleUrls: ['./input-panel.component.css']
})
export class InputPanelComponent implements OnInit {

  parent: string;
  groupCount: GroupCount;

  constructor(private linkService: LinkService,
    private dataPassing: DataPassingService) { }

  ngOnInit(): void {
    this.linkService.parent$.subscribe((str: string) => this.parent = str);
    this.dataPassing.groupCount$.subscribe((newCount: GroupCount) => {
      this.groupCount = newCount;
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
