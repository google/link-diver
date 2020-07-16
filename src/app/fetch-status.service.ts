import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { LinkService, LinkData } from './link.service';

@Injectable({
  providedIn: 'root'
})
export class FetchStatusService {

  private linkList: LinkData[];

  constructor(private http: HttpClient, private linkService: LinkService) { 
    this.linkService.linkList$.subscribe((newLinks: LinkData[]) => {
      this.linkList = newLinks;
      console.log('This is strange');
    });
    console.log('Hello?');
    // this.linkService.dataLoaded.subscribe(() => this.startFetching());
  }

  startFetching(): void {
    this.linkList = this.linkService.linkList$.getValue();
    console.log(this.linkList);
    this.linkList.forEach((link: LinkData) => {
      console.log(this.http.head(link.href));
    });
  }
}
