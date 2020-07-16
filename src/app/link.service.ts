// eslint-disable-next-line spaced-comment
/// <reference types="chrome"/>

import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FetchStatusService } from './fetch-status.service';

/**
 * Packages the URL of a link along with other relevant metadata about that link
 * used throughout the app
 */
export interface LinkData {
  href: string;
  host: string;
  tagName: string;
  hidden: boolean;
  status?: number;
  statusOk?: boolean;
}

/**
 * This service is responsible for retreving links from the content script and
 * passing them onto components
 */
@Injectable({
  providedIn: 'root'
})
export class LinkService {

  private linkList: LinkData[] = [];
  linkList$ = new BehaviorSubject<LinkData[]>([]);
  dataLoaded = new EventEmitter();

  addLinks(newLinks: LinkData[]): void {
    /* for (const str of newLinks) {
      this.linkList.push(str);
    }
    this.linkList$.next(this.linkList);*/
    this.linkList$.next(newLinks);
  }

  constructor(private fetchService: FetchStatusService) {
    chrome.tabs.getCurrent((tab) => {
      chrome.tabs.sendMessage(tab.openerTabId, {
        message: 'send links'
      }, (links: LinkData[]) => {
        this.addLinks(links);
        this.fetchService.startFetching(links);
        this.dataLoaded.emit();
      });
    });
  }
}
