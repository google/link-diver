// eslint-disable-next-line spaced-comment
/// <reference types="chrome"/>

import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FetchStatusService } from './fetch-status.service';
import { Title } from '@angular/platform-browser';
import { LinkData } from './interfaces';

/**
 * This service is responsible for retreving links from the content script and
 * passing them onto components
 */
@Injectable({
  providedIn: 'root'
})
export class ChromeLinkService {

  private readonly noConnectionErrorMessage = `Parent site was not found,\
  please try reloading the parent site and relaunching the extension`;

  private parentSource = new BehaviorSubject<string>('');
  parent$ = this.parentSource.asObservable();

  private linkListSource = new BehaviorSubject<LinkData[]>([]);
  linkList$ = this.linkListSource.asObservable();

  private parentTabId: number;

  constructor(private fetchService: FetchStatusService,
    private ngZone: NgZone, private title: Title) {

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

  requestLinkData() {

    chrome.tabs.sendMessage(this.parentTabId, {
      message: 'send link data'
    }, (response) => {
      if (response === undefined) {
        alert(this.noConnectionErrorMessage);
        console.error(this.noConnectionErrorMessage);
      } else if (!response.success) {
        console.error(response.errorMessage);
      } else {
        this.ngZone.run(() => {
          this.setLinks(response.linkList);
          this.fetchService.fetch(response.linkList);
        });
      }
    });

    chrome.tabs.get(this.parentTabId, (parentTab) => {
      this.title.setTitle(parentTab.title + ' (Link Diver)');
      this.parentSource.next(parentTab.url);
    });
  }

  private setLinks(newLinks: LinkData[]): void {
    this.linkListSource.next(newLinks);
  }

  highlightLink(link: LinkData): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      chrome.tabs.sendMessage(this.parentTabId, {
        message: 'highlight link',
        linkData: link
      }, (response) => {
        if (!response) {
          reject(this.noConnectionErrorMessage);
        } else if (!response.success) {
          reject(response.errorMessage);
        } else {
          resolve(response.highlightOn);
        }
      });
    });
  }

  downloadLinksAsCsvFile() {
    const data = new Blob([this.linksToString()], {type: 'text/csv'});
    const textFile = window.URL.createObjectURL(data);

    chrome.downloads.download({
      url: textFile,
      saveAs: true
    });
  }

  private linksToString() {
    const links = this.linkListSource.getValue();
    let text = 'url, visible, tag, status, content_type\n';
    links.forEach((link) => {
      text += `${link.href}, ${link.visible}, ${link.tagName}, `;
      text += `${link.status}, ${link.contentType}\n`;
    });
    return text;
  }

}
