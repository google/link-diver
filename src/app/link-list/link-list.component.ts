import { Component, OnInit, Input } from '@angular/core';
import { GroupData } from '../interfaces';

/**
 * Responsible for displaying all of the links of a group in a list.
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
