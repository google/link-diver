import { Component, OnInit } from '@angular/core';
import { ExpandCollapseAllService } from '../expand-collapse-all.service';

@Component({
  selector: 'app-expand-collapse-all',
  templateUrl: './expand-collapse-all.component.html',
  styleUrls: ['./expand-collapse-all.component.css']
})
export class ExpandCollapseAllComponent implements OnInit {

  constructor(private ecaService: ExpandCollapseAllService) { }

  ngOnInit(): void {
  }

  toggleAll(expand: boolean) {
    this.ecaService.expandCollapseAll(expand);
  }

}
