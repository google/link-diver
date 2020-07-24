// eslint-disable-next-line spaced-comment
/// <reference types="chrome"/>

import { Injectable, EventEmitter, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * Packages the URL of a link along with other relevant metadata about that link
 * used throughout the app
 */
export interface LinkData {
  href: string;
  host: string;
  tagName: string;
  hidden: boolean;
}

/**
 * This service is responsible for retreving links from the content script and
 * passing them onto components
 */
@Injectable({
  providedIn: 'root'
})
export class LinkService {

  private parentSource = new BehaviorSubject<string>('');
  parent$ = this.parentSource.asObservable();

  private linkListSource = new BehaviorSubject<LinkData[]>([]);
  linkList$ = this.linkListSource.asObservable();

  private setLinks(newLinks: LinkData[]): void {
    this.linkListSource.next(newLinks);
  }

  constructor(private ngZone: NgZone) {

    chrome.tabs.getCurrent((tab) => {
      chrome.tabs.sendMessage(tab.openerTabId, {
        message: 'send parent'
      }, (parent: string) => {
        this.ngZone.run(() => {
          this.parentSource.next(parent);
        });
      });

      chrome.tabs.sendMessage(tab.openerTabId, {
        message: 'send links'
      }, (links: LinkData[]) => {
        this.ngZone.run(() => {
          this.setLinks(links);
        });
      });
    });
  }
}
