import { Component, OnInit } from '@angular/core';
import { CrossComponentDataService } from '../cross-component-data.service';

/**
 * A large parent component to hold sub-components that deal with input
 */
@Component({
  selector: 'app-input-panel',
  templateUrl: './input-panel.component.html',
  styleUrls: ['./input-panel.component.css']
})
export class InputPanelComponent implements OnInit {

  parent: string;

  constructor(private ccdService: CrossComponentDataService) { }

  ngOnInit(): void {
    this.ccdService.parent$.subscribe((str: string) => this.parent = str);
  }

}
