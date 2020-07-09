import { Component, OnInit } from '@angular/core';
import { LinkService } from '../link.service';

import { RegexService } from '../regex.service';

/**
 * This component is responsible for filtering and displaying all of the links
 * from the parent site
 */
@Component({
  selector: 'app-link-list',
  templateUrl: './link-list.component.html',
  styleUrls: ['./link-list.component.css']
})
export class LinkListComponent implements OnInit {

  regex: string;

  constructor(private linkService: LinkService,
    private regexService: RegexService) { }

  ngOnInit(): void {
    this.regexService.regexStr.subscribe((str) => this.regex = str);
  }

  getLinks() {
    return this.linkService.getLinks();
  }
}
