import { Injectable} from '@angular/core';
import { HttpClient, HttpResponseBase } from '@angular/common/http';

import { LinkData } from './link.service';
import { BehaviorSubject, from } from 'rxjs';
import { mergeAll} from 'rxjs/operators';
import { defer } from 'rxjs/index';

/**
 * Internal interface to pair a status code with a boolean indicating success
 * or failure
 */
interface Status {
  code: number;
  ok: boolean;
  contentType: string;
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

  private readonly batchSize = 50;

  constructor(private http: HttpClient) { }

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
          link.contentType = status.contentType;
        }
      });
    });
  }

  private startFetching(statusMap: any): void {
    const mapArr = Array.from(statusMap.entries()).map(([key, val]) => {
      return {
        link: key,
        subject: val
      };
    });

    const observables = mapArr.map((x) => defer(() => {
      return this.fetchLink(x.link, x.subject);
    }));

    from(observables)
        .pipe(mergeAll(this.batchSize))
        .subscribe();
  }

  private async fetchLink(url: string, status$: BehaviorSubject<Status>) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const response = this.http.get(url, {
          observe: 'response',
          responseType: 'text'
        });

        response.subscribe((httpResponse: HttpResponseBase) => {
          status$.next(this.getStatus(httpResponse));
        }, (errorResponse: HttpResponseBase) => {
          console.log(this.getStatus(errorResponse));
          status$.next(this.getStatus(errorResponse));
        });

        resolve();
      }, 0);
    });
  }

  private getStatus(response: HttpResponseBase): Status {
    let contentType = 'none';

    if (response.headers.has('Content-type')) {
      contentType = response.headers.get('Content-type').split(';', 2)[0];
    }

    return {
      code: response.status,
      ok: response.ok,
      contentType: contentType
    };
  }
}
