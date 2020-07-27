import { Component, OnInit } from '@angular/core';
import { LinkData, LinkService } from '../link.service';
import { SortOptions } from '../group-sort.pipe';
import { OptionsService } from '../options.service';

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
    private optionsService: OptionsService) { }

  ngOnInit(): void {
    this.optionsService.regexStr.subscribe((newRegex: string) => {
      this.regex = newRegex;
    });
    this.linkService.linkList$.subscribe((newLinks: LinkData[]) => {
      this.links = newLinks;
    });
    this.optionsService.groupingKey$.subscribe((newKey: string) => {
      this.key = newKey;
    });
    this.optionsService.sortOrder$.subscribe((newOrder: SortOptions) => {
      this.order = newOrder;
    });
  }

  toggle(group: GroupData) {
    group.hide = !group.hide;
  }

}
