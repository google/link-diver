/// <reference types="chrome"/>
import { Injectable, ApplicationRef, EventEmitter } from '@angular/core';

import { Observable, of } from 'rxjs';

/**
 * This service is responsible for communicating with the content script,
 * specifically for reciving the links and their metadata
 */
@Injectable({
  providedIn: 'root'
})
export class LinkService {

  private linkList: string[] = [];

  invokeSearch = new EventEmitter();

  getLinks(): string[] {
    return this.linkList;
  }

  addLinks(newLinks: string[]): void {
    for (const str of newLinks) {
      this.linkList.push(str);
    }
  }

  filterLinks(term: string): Observable<string[]> {
    if (!term.trim()) {
      return of(this.linkList);
    }
    try {
      const regExp = new RegExp(term);
      return of(this.linkList.filter((str) => regExp.test(str)));
    } catch (err) {
      console.log(err);
      return of(this.linkList);
    }
  }

  constructor(private applicationRef: ApplicationRef) {

    chrome.tabs.query({
      active: true,
      currentWindow: true
    },
    (tabs: any) => {
      chrome.tabs.sendMessage(tabs[0].id, {
        message: 'send links'
      }, (links: string[]) => {
        this.addLinks(links);
        this.invokeSearch.emit();
      });
    });
  }

}
