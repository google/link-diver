import { Injectable } from '@angular/core';
import { HttpClient, HttpResponseBase } from '@angular/common/http';

import { LinkService, LinkData } from './link.service';

/**
 * This service is responsible for checking the status of each link
 */
@Injectable({
  providedIn: 'root'
})
export class FetchStatusService {

  constructor(private http: HttpClient) { }

  startFetching(linkList: LinkData[]): void {
    linkList.forEach((link: LinkData) => {
      console.log(this.http.head(link.href, { observe: 'response' })
          .subscribe((response: HttpResponseBase) => {
            link.status = response.status;
            link.statusOk = response.ok;
          }, (error: HttpResponseBase) => {
            link.status = error.status;
            link.statusOk = error.ok;
          }));
    });

  }
}
