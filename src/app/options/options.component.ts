import { Component, OnInit } from '@angular/core';
import { ChromeLinkService } from '../chrome-link.service';
import { CrossComponentDataService } from '../cross-component-data.service';
import { SortOptions } from '../interfaces';

/**
 * Contains two buttons allowing the user to expand each link or collapse each
 * link
 */
@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {

  showDOMSource: boolean = false;
  order: SortOptions;
  sortOptions = [
    {val: SortOptions.DOM, display: 'DOM'},
    {val: SortOptions.DOMReverse, display: 'DOM (Reverse)'},
    {val: SortOptions.LexicoAscend, display: 'A-Z'},
    {val: SortOptions.LexicoDescend, display: 'Z-A'}
  ];

  constructor(private ccdService: CrossComponentDataService,
    private chromeLinkService: ChromeLinkService) { }

  ngOnInit(): void { }

  toggleAll(expand: boolean) {
    this.ccdService.expandCollapseAll(expand);
  }

  pushSortOrder() {
    this.ccdService.updateOrder(this.order);
  }

  refresh() {
    this.chromeLinkService.requestLinkData();
  }

  toggle() {
    this.showDOMSource = !this.showDOMSource;
    this.ccdService.updateShowDOMSource(this.showDOMSource);
  }

  exportLinks() {
    this.chromeLinkService.downloadLinksAsCsvFile();
  }

}
