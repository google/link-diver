import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpResponseBase } from '@angular/common/http';

import { LinkData } from './link.service';
import { BehaviorSubject, from } from 'rxjs';
import { mergeAll, catchError, map } from 'rxjs/operators';
import { defer } from 'rxjs/index';

/**
 * Internal interface to pair a status code with a boolean indicating success
 * or failure
 */
interface Status {
  code?: number;
  ok?: boolean;
}

/**
 * This service is responsible for checking the status of each link. For each
 * unique link that is passed in in linkList it checks the HTTP status by
 * sending a HEAD request. In addition in throttles the amount of requests that
 * get sent to the HttpClient so it does not get overworked.
 */
@Injectable({
  providedIn: 'root'
})
export class FetchStatusService {

  private readonly batchSize = 10;
  private activeRequests = 0;
  private newBatch: EventEmitter<any>;

  constructor(private http: HttpClient) {
    this.newBatch = new EventEmitter();
  }

  fetch(linkList: LinkData[]) {
    const statusMap: Map<string, BehaviorSubject<Status>> = new Map();
    this.initMap(statusMap, linkList);
    this.startFetching(statusMap);
  }

  /**
   * We create a map linking urls to status subjects so that we don't have to
   * make multiple calls to the same url. Each link object gets subscribed to
   * its corresponding subject so that it will get updated once the http request
   * for that url returns.
   * @param {Map<string, BehaviorSubject<Status>>} statusMap An empty map that
   * will be filled with url-subject pairs.
   * @param {LinkData[]} linkList Links that will eventually get statuses filled
   */
  private initMap(statusMap: Map<string, BehaviorSubject<Status>>,
      linkList: LinkData[]): void {
    linkList.forEach((link: LinkData) => {
      let linkStatus$: BehaviorSubject<Status>;
      if (statusMap.has(link.href)) {
        linkStatus$ = statusMap.get(link.href);
      } else {
        linkStatus$ = new BehaviorSubject<Status>(undefined);
        statusMap.set(link.href, linkStatus$);
      }

      linkStatus$.subscribe((status: Status) => {
        if (status) {
          link.status = status.code;
          link.statusOk = status.ok;
        }
      });
    });
  }

  // --Trying something different here

  private startFetching(statusMap: any): void {
    const mapArr = Array.from(statusMap.entries()).map(([key, val]) => {
      return {
        link: key,
        subject: val
      };
    });
    // this.fetchLink(mapArr[0].link, mapArr[0].subject).then();
    const observables = mapArr.map((x) => defer(() => {
      return this.fetchLink(x.link, x.subject);
    }));
    from(observables)
        .pipe(mergeAll(this.batchSize))
        .subscribe();
  }

  private async fetchLink(url: string, status$: BehaviorSubject<Status>) {
    await this.http.head(url, { observe: 'response' })
        .pipe(map((response: HttpResponseBase) => {
          console.log(response); // TEMP TEMP TEMP TEMP
          status$.next(this.registerStatus(response));
        }), catchError((error, caught) => {
          console.log(error);
          status$.next(this.registerStatus(error));
        }));
    /* status$.next({
      code: 200, // response.status,
      ok: true // response.ok
    });*/
  }
  /*
  /**
   * Iterates through the previously initialized map in batches sending out http
   * requests
   * @param {any} statusMap
   *
  private startFetching(statusMap: any): void {
    const linkIterator = statusMap.keys();
    const subjectIterator = statusMap.values();
    const batchSubscription = this.newBatch.subscribe(() => {
      if (this.fetchBatch(linkIterator, subjectIterator)) {
        batchSubscription.unsubscribe();
      }
    });
    this.newBatch.emit();
  }

  /**
    * Sends a new batch of requests to http serivce and handles the response.
    * @param linkIterator
    * @param subjectIterator
    * @return {boolean} Returns true if there are no more links to be fetched.
    * Otherwise returns false.
    *
  private fetchBatch(linkIterator: Iterator<string>,
      subjectIterator: Iterator<BehaviorSubject<Status>>): boolean {
    while (this.activeRequests < this.batchSize) {
      const nextLink = linkIterator.next();
      const status$ = subjectIterator.next().value;
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
  }*/

  private registerStatus(response: HttpResponseBase): Status {
    /* this.activeRequests --;
    if (this.activeRequests < this.batchSize) {
      this.newBatch.emit();
    }*/
    return {
      code: response.status,
      ok: response.ok
    };
  }
}
