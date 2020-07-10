// eslint-disable-next-line spaced-comment
/// <reference types="chrome"/>

import { Injectable, ApplicationRef } from '@angular/core';

/**
 * This service is responsible for retreving links from the content script and
 * passing them onto components
 */
@Injectable({
  providedIn: 'root'
})
export class LinkService {

  private linkList: string[] = [];

  getLinks(): string[] {
    return this.linkList;
  }

  addLinks(newLinks: string[]): void {
    for (const str of newLinks) {
      this.linkList.push(str);
    }
  }

  constructor(private applicationRef: ApplicationRef) {

    chrome.tabs.getCurrent((tab) => {
      chrome.tabs.sendMessage(tab.openerTabId, {
        message: 'send links'
      }, (links: string[]) => {
        this.addLinks(links);
        this.applicationRef.tick();
      });
    });
  }
}
