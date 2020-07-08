import { Component, OnInit, ApplicationRef } from '@angular/core';
import { LinkService } from '../link.service';

import { Observable, Subject} from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-link-list',
  templateUrl: './link-list.component.html',
  styleUrls: ['./link-list.component.css']
})
export class LinkListComponent implements OnInit {

  constructor(private linkService: LinkService, private app: ApplicationRef) { }

  links$: Observable<string[]>;
  private searchTerms = new Subject();

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.links$ = this.searchTerms.pipe(
        distinctUntilChanged(),
        debounceTime(300),
        switchMap((term: string) => this.linkService.filterLinks(term))
    );

    this.linkService.invokeSearch.subscribe(() => {
      this.search('');
      setTimeout(() => this.app.tick(), 500);
    });
  }
}