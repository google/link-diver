// eslint-disable-next-line spaced-comment
/// <reference types="chrome"/>

import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * Packages the URL of a link along with other relevant metadata about that link
 * used throughout the app
 */
export interface LinkData {
  href: string;
  host: string;
  domId: number;
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

  private parentTabId: number;

  constructor(private ngZone: NgZone) {

    chrome.tabs.getCurrent((currTab: chrome.tabs.Tab) => {
      this.parentTabId = currTab.openerTabId;
      chrome.windows.create({
        tabId: currTab.id,
        left: 50,
        top: 50
      }, (window: chrome.windows.Window) => {
        this.requestLinkData();
      });
    });
  }

  private requestLinkData() {
    chrome.tabs.sendMessage(this.parentTabId, {
      message: 'send parent'
    }, (parent: string) => {
      this.ngZone.run(() => {
        this.parentSource.next(parent);
      });
    });

    chrome.tabs.sendMessage(this.parentTabId, {
      message: 'send links'
    }, (links: LinkData[]) => {
      this.ngZone.run(() => {
        this.setLinks(links);
      });
    });
  }

  private setLinks(newLinks: LinkData[]): void {
    this.linkListSource.next(newLinks);
  }

  highlightLink(link: LinkData, newColor: string): Promise<string> {
    return new Promise((resolve, reject) => {
      chrome.tabs.sendMessage(this.parentTabId, {
        message: 'highlight link',
        linkData: link,
        newColor: newColor
      }, (prevColor) => {
        resolve(prevColor);
      });
    });

  }

}
