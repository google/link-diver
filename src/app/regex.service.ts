import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * This service is responsible for casting the current regular expression as an
 * obersvable to keep all of the components in sync
 */
@Injectable({
  providedIn: 'root'
})
export class RegexService {

  private regexSource = new BehaviorSubject<string>('');
  regex$ = this.regexSource.asObservable();

  constructor() { }

  updateRegex(newRegex: string) {
    this.regexSource.next(newRegex);
  }
}
