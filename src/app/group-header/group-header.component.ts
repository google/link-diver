import { Component, OnInit, Input } from '@angular/core';
import { GroupData } from '../group-list/group-list.component';

/**
 * This component displays header information for a group of links if the user
 * has choosen to use the group setting.
 */
@Component({
  selector: 'app-group-header',
  templateUrl: './group-header.component.html',
  styleUrls: ['./group-header.component.css']
})
export class GroupHeaderComponent implements OnInit {

  @Input() group: GroupData;

  constructor() { }

  ngOnInit(): void {
  }

  getSizeDescription() {
    let str = this.group.size.toString() + ' Match';
    if (this.group.size != 1) {
      str += 'es';
    }
    return str;
  }

}
