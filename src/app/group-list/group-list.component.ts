import { Component, OnInit } from '@angular/core';
import { LinkData, LinkService } from '../link.service';
import { RegexService } from '../regex.service';
import { GroupingKeyService } from '../grouping-key.service';
import { SortOptions } from '../sort.pipe';

export interface GroupData {
  key: string,
  list: LinkData[],
  size: number,
  hide?: boolean
}

/**
 * This component is responsible for putting the links through the filtering and
 * grouping pipes and then displaying the resulting groups in a list.
 */
@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {

  order: SortOptions;
  regex: string;
  key: string;
  links: LinkData[];

  constructor(private linkService: LinkService,
    private regexService: RegexService,
    private groupingKeyService: GroupingKeyService) { }

  ngOnInit(): void {
    this.regexService.regexStr.subscribe((str: string) => {
      this.regex = str;
    });
    this.linkService.linkList$.subscribe((newLinks: LinkData[]) => {
      this.links = newLinks;
    });
    this.groupingKeyService.groupingKey$.subscribe((newKey: string) => {
      this.key = newKey;
    });
    this.regexService.sortOrder$.subscribe((newOrder: SortOptions) => {
      this.order = newOrder;
    });
  }

  toggle(group: GroupData) {
    group.hide = !group.hide;
  }

}
