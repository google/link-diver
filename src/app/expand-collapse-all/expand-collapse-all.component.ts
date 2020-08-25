import { Component, OnInit } from '@angular/core';
import { LinkService } from '../link.service';
import { CrossComponentDataService } from '../cross-component-data.service';
import { SortOptions } from '../interfaces';

/**
 * Contains two buttons allowing the user to expand each link or collapse each
 * link
 */
@Component({
  selector: 'app-expand-collapse-all',
  templateUrl: './expand-collapse-all.component.html',
  styleUrls: ['./expand-collapse-all.component.css']
})
export class ExpandCollapseAllComponent implements OnInit {

  showDOMSource: boolean = false;
  order: SortOptions;
  sortOptions = [
    {val: SortOptions.DOM, display: 'DOM'},
    {val: SortOptions.DOMReverse, display: 'DOM (Reverse)'},
    {val: SortOptions.LexicoAscend, display: 'A-Z'},
    {val: SortOptions.LexicoDescend, display: 'Z-A'}
  ];

  constructor(private ccdService: CrossComponentDataService,
    private linkService: LinkService) { }

  ngOnInit(): void { }

  toggleAll(expand: boolean) {
    this.ccdService.expandCollapseAll(expand);
  }

  pushSortOrder() {
    this.ccdService.updateOrder(this.order);
  }

  refresh() {
    this.linkService.requestLinkData();
  }

  toggle() {
    this.showDOMSource = !this.showDOMSource;
    this.ccdService.updateShowDOMSource(this.showDOMSource);
  }

  exportLinks() {
    this.linkService.downloadLinksAsCsvFile();
  }

}
