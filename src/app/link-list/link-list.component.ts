import { Component, OnInit } from '@angular/core';
import { LinkService, LinkData } from '../link.service';

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
  links: LinkData[];

  constructor(private linkService: LinkService,
    private regexService: RegexService) { }

  ngOnInit(): void {
    this.regexService.regexStr.subscribe((str: string) => this.regex = str);
    this.linkService.linkList$.subscribe((newLinks: LinkData[]) => {
      this.links = newLinks;
    });
  }

}
