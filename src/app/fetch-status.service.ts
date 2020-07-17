import { Injectable } from '@angular/core';
import { HttpClient, HttpResponseBase } from '@angular/common/http';

import { LinkData } from './link.service';
import { BehaviorSubject } from 'rxjs';

/**
 * Internal interface to pair a status code with a boolean indicating success
 * or failure
 */
interface Status {
  code?: number;
  ok?: boolean;
}

/**
 * This service is responsible for checking the status of each link
 */
@Injectable({
  providedIn: 'root'
})
export class FetchStatusService {

  private statusMap: Map<string, BehaviorSubject<Status>>;

  constructor(private http: HttpClient) {
    this.statusMap = new Map();
  }

  createMap(linkList: LinkData[]): void {
    linkList.forEach((link: LinkData) => {
      let linkStatus$: BehaviorSubject<Status>;
      if (this.statusMap.has(link.href)) {
        linkStatus$ = this.statusMap.get(link.href);
      } else {
        linkStatus$ = new BehaviorSubject<Status>(undefined);
        this.statusMap.set(link.href, linkStatus$);
      }

      linkStatus$.subscribe((status: Status) => {
        if (status) {
          link.status = status.code;
          link.statusOk = status.ok;
        }
      });
    });
    console.log(this.statusMap);
  }

  startFetching(): void {
    this.statusMap.forEach((status$: BehaviorSubject<Status>, str: string) => {
      this.http.head(str, { observe: 'response' })
          .subscribe((response: HttpResponseBase) => {
            status$.next(this.getStatus(response));
          }, (error: HttpResponseBase) => {
            console.log(error);
            status$.next(this.getStatus(error));
          });
    });
  }

  private getStatus(response: HttpResponseBase): Status {
    return {
      code: response.status,
      ok: response.ok
    };
  }

}
