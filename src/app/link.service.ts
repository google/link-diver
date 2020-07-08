// eslint-disable-next-line spaced-comment
/// <reference types="chrome"/>
import { Injectable, ApplicationRef, EventEmitter } from '@angular/core';

import { Observable, of } from 'rxjs';

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

    chrome.tabs.getCurrent((tab) => {
      chrome.tabs.sendMessage(tab.openerTabId, {
        message: 'send links'
      }, (links: string[]) => {
        console.log(links);
        this.addLinks(links);
        console.log('Links added');
        this.invokeSearch.emit();
      });
    });
  }

}
