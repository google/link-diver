// eslint-disable-next-line spaced-comment
/// <reference types="chrome"/>

import { Component, OnInit, NgZone } from '@angular/core';
import { ChromeLinkService } from '../chrome-link.service';
import { CrossComponentDataService } from '../cross-component-data.service';
import { SortOptions, LinkData } from '../interfaces';
import { FetchStatusService } from '../fetch-status.service';

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

  links: LinkData[];
  showElementSource: boolean;
  order: SortOptions;
  isFetching: boolean;
  fetchOnLaunch: boolean;
  sortOptions = [
    {val: SortOptions.DOM, display: 'DOM'},
    {val: SortOptions.DOMReverse, display: 'DOM (Reverse)'},
    {val: SortOptions.LexicoAscend, display: 'A-Z'},
    {val: SortOptions.LexicoDescend, display: 'Z-A'}
  ];

  constructor(private ccdService: CrossComponentDataService,
    private chromeLinkService: ChromeLinkService,
    private fetchService: FetchStatusService,
    private ngZone: NgZone) { }

  ngOnInit(): void {

    chrome.storage.sync.get({
      showElementSource: false,
      fetchOnLaunch: false
    }, (init) => {
      this.ngZone.run(() => {
        this.fetchOnLaunch = init.fetchOnLaunch;
        this.showElementSource = init.showElementSource;
        this.ccdService.updateShowElementSource(init.showElementSource);
        this.chromeLinkService.linkList$.subscribe((links: LinkData[]) => {
          this.links = links;
          if (init.fetchOnLaunch) {
            this.fetch();
          }
        });
      });
    });
  }

  toggleAll(expand: boolean) {
    this.ccdService.expandCollapseAll(expand);
  }

  pushSortOrder() {
    this.ccdService.updateOrder(this.order);
  }

  refresh() {
    this.chromeLinkService.requestLinkData();
  }

  toggleElementSource() {
    this.showElementSource = !this.showElementSource;
    this.ccdService.updateShowElementSource(this.showElementSource);
    chrome.storage.sync.set({ showElementSource: this.showElementSource });
  }

  toggleFetchOnLaunch() {
    this.fetchOnLaunch = !this.fetchOnLaunch;
    chrome.storage.sync.set({ fetchOnLaunch: this.fetchOnLaunch });
  }

  exportLinks() {
    const data = new Blob([this.linksToString()], { type: 'text/csv' });
    const textFile = window.URL.createObjectURL(data);

    chrome.downloads.download({
      url: textFile,
      saveAs: true
    });
  }

  private linksToString() {
    const links = this.links;
    let text = 'url, visible, tag, status, content_type\n';
    links.forEach((link) => {
      text += `${link.href}, ${link.visible}, ${link.tagName}, `;
      text += `${link.status}, ${link.contentType}\n`;
    });
    return text;
  }

  fetch() {
    this.fetchService.fetch(this.links);
    this.isFetching = true;
  }
}
