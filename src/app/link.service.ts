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

  private setLinks(newLinks: LinkData[]): void {
    this.linkListSource.next(newLinks);
    this.highlightLink(newLinks[3]);
  }

  constructor(private ngZone: NgZone) {

    chrome.tabs.getCurrent((tab) => {
      console.log(tab.openerTabId);
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

  highlightLink(link: LinkData) {
    /* chrome.windows.getAll({populate: true}, (windows) => {
      windows.forEach((window) => {
        window.tabs.forEach((tab) => {
          chrome.tabs.sendMessage(tab.id, {succes: true});
        });
      });
    });
    
    chrome.tabs.getCurrent((tab) => {
      chrome.tabs.sendMessage(tab.openerTabId, {
        message: 'highlight link',
        linkData: link
      });
    });*/
  }

}
