import { Component, OnInit, Input } from '@angular/core';
import { LinkService, LinkData } from '../link.service';

import { RegexService } from '../regex.service';
import { GroupData } from '../group-list/group-list.component';

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

  @Input() group: GroupData;

  constructor() { }

  ngOnInit(): void {
  }

}
