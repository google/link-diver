import { Component, OnInit } from '@angular/core';
import { ExpandCollapseAllService } from '../expand-collapse-all.service';
import { SortOptions } from '../group-sort.pipe';
import { OptionsService } from '../options.service';
import { LinkService } from '../link.service';

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

  constructor(private ecaService: ExpandCollapseAllService,
    private optionsService: OptionsService,
    private linkService: LinkService) { }

  ngOnInit(): void { }

  toggleAll(expand: boolean) {
    this.ecaService.expandCollapseAll(expand);
  }

  pushSortOrder() {
    this.optionsService.updateOrder(this.order);
  }

  refresh() {
    this.linkService.requestLinkData();
  }

  toggle() {
    this.showDOMSource = !this.showDOMSource;
    this.optionsService.updateShowDOMSource(this.showDOMSource);
  }

}
