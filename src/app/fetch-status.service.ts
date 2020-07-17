import { Injectable, EventEmitter } from '@angular/core';
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

  private readonly batchSize = 50;
  private activeRequests = 0;
  private statusMap: Map<string, BehaviorSubject<Status>>;
  private linkIterator: Iterator<string>;
  private subjectIterator: Iterator<BehaviorSubject<Status>>;
  private newBatch: EventEmitter<any>;

  constructor(private http: HttpClient) {
    this.statusMap = new Map();
    this.newBatch = new EventEmitter();
  }

  /**
   * We create a map linking urls to status subjects so that we don't have to
   * make multiple calls to the same url. Each link object gets subscribed to
   * its corresponding subject so that it will get updated once the http request
   * for that url returns.
   * @param {LinkData[]} linkList Links that will eventually get statuses filled
   */
  initMap(linkList: LinkData[]): void {
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
    this.linkIterator = this.statusMap.keys();
    this.subjectIterator = this.statusMap.values();
  }

  /**
   * Iterates through the previously initialized map in batches sending out http
   * requests
   */
  startFetching(): void {
    const batchSubscription = this.newBatch.subscribe(() => {
      if (this.fetchBatch()) {
        batchSubscription.unsubscribe();
      }
    });
    this.newBatch.emit();
  }

  /**
   * Sends a new batch of requests to http serivce and handles the response.
   * @return {boolean} Returns true if there are no more links to be fetched.
   * Otherwise returns false
   */
  private fetchBatch(): boolean {
    for (let i = 0; i < this.batchSize; i ++) {
      const nextLink = this.linkIterator.next();
      const status$ = this.subjectIterator.next().value;
      if (nextLink.done) return true;
      this.http.head(nextLink.value, { observe: 'response' })
          .subscribe((response: HttpResponseBase) => {
            status$.next(this.registerStatus(response));
          }, (error: HttpResponseBase) => {
            console.log(error);
            status$.next(this.registerStatus(error));
          });
      this.activeRequests ++;
    }
    return false;
  }

  private registerStatus(response: HttpResponseBase): Status {
    this.activeRequests --;
    if (this.activeRequests == 0) {
      this.newBatch.emit();
    }
    return {
      code: response.status,
      ok: response.ok
    };
  }

}
