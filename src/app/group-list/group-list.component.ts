import { Component, OnInit } from '@angular/core';
import { LinkData, LinkService } from '../link.service';
import { RegexService } from '../regex.service';

export interface GroupData {
  host: string,
  list: LinkData[],
  size: number
}

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {

  regex: string;
  links: LinkData[];

  constructor(private linkService: LinkService,
    private regexService: RegexService) { }

  ngOnInit(): void {
    this.regexService.regexStr.subscribe((str) => this.regex = str);
    this.linkService.linkList$.subscribe((newLinks: LinkData[]) => {
      this.links = newLinks;
    });
  }

}
