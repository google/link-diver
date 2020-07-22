// eslint-disable-next-line spaced-comment
/// <reference types="chrome"/>

import { Injectable, NgZone } from '@angular/core';
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

  linkListSource = new BehaviorSubject<LinkData[]>([]);
  linkList$ = this.linkListSource.asObservable();

  private setLinks(newLinks: LinkData[]): void {
    this.linkListSource.next(newLinks);
  }

  constructor(private fetchService: FetchStatusService,
    private ngZone: NgZone) {

    chrome.tabs.getCurrent((tab) => {
      chrome.tabs.sendMessage(tab.openerTabId, {
        message: 'send links'
      }, (links: LinkData[]) => {
        // NgZone.run here is needed so that angular is aware that changes are
        // being made and can run its change detection cycle
        this.ngZone.run(() => {
          this.setLinks(links);
          this.fetchService.fetch(links);
        });
      });
    });
  }
}
