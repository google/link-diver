import { Component, OnInit } from '@angular/core';
import { LinkService } from '../link.service';

@Component({
  selector: 'app-link-list',
  templateUrl: './link-list.component.html',
  styleUrls: ['./link-list.component.css']
})
export class LinkListComponent implements OnInit {

  constructor(private linkService: LinkService) { }

  ngOnInit(): void {
  }

  getLinks(): string[] {
    return this.linkService.getLinks();
  }

}
