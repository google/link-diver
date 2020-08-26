import { Component, OnInit } from '@angular/core';
import { ChromeLinkService } from '../chrome-link.service';
import { CrossComponentDataService } from '../cross-component-data.service';
import { LinkData, SortOptions, GroupData, FilterOption, GroupByKeys, GroupingOptions } from '../interfaces';

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
  grouping: GroupingOptions;
  filters: FilterOption<any>[];
  links: LinkData[];
  showHeader: boolean = true;

  constructor(private chromeLinkService: ChromeLinkService,
    private ccdService: CrossComponentDataService) { }

  ngOnInit(): void {
    this.chromeLinkService.linkList$.subscribe((newLinks: LinkData[]) => {
      this.links = newLinks;
    });
    this.ccdService.grouping$.subscribe((newGrouping: GroupingOptions) => {
      this.grouping = newGrouping;
      this.showHeader = newGrouping.groupBy !== GroupByKeys.None;
    });
    this.ccdService.sortOrder$.subscribe((newOrder: SortOptions) => {
      this.order = newOrder;
    });
    this.ccdService.filters$.subscribe((newFilters: FilterOption<any>[]) => {
      this.filters = newFilters;
    });
  }

  toggle(group: GroupData) {
    group.hide = !group.hide;
  }

  getSizeDescription(group: GroupData) {
    let str = group.size.toString() + ' Match';
    if (group.size != 1) {
      str += 'es';
    }
    return str;
  }

}
