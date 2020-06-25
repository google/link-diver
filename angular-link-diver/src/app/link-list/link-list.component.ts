import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-link-list',
  templateUrl: './link-list.component.html',
  styleUrls: ['./link-list.component.css']
})
export class LinkListComponent implements OnInit {

  constructor() { }

  private mockLinkList: string[] = [
    'example.url.1',
    'example.url.2',
    'example.url.3'
  ];

  ngOnInit(): void {
  }

  getLinks(): string[] {
    return this.mockLinkList;
  }

}
