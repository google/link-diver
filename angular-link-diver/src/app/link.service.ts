import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LinkService {

  private mockLinkList: string[] = [
    'example.url.1',
    'example.url.2',
    'example.url.3',
    'example.url.4'
  ];

  getLinks(): string[] {
    return this.mockLinkList;
  }

  constructor() { }
}
