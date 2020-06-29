/// <reference types="chrome"/>
import { Injectable, ApplicationRef } from '@angular/core';

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

    chrome.tabs.query({
      active: true,
      currentWindow: true},
      (tabs: any) => {
        console.log('Sending request for links');
        chrome.tabs.sendMessage(tabs[0].id, {
            message: 'send links'
          }, (links: string[]) => {
            console.log(links);
            this.addLinks(links);
            console.log('Links added');
            this.applicationRef.tick();
          });
      });
  }

}
