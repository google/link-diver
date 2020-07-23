import { Component, OnInit } from '@angular/core';
import { LinkData, LinkService } from '../link.service';
import { RegexService } from '../regex.service';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {

  regex: string;

  constructor(private linkService: LinkService,
    private regexService: RegexService) { }

  ngOnInit(): void {
    this.regexService.regexStr.subscribe((str) => this.regex = str);
  }

  getLinks(): LinkData[] {
    return this.linkService.getLinks();
  }

}
