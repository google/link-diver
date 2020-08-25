import { Component, OnInit } from '@angular/core';
import { ChromeLinkService } from '../chrome-api.service';

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

  constructor(private chromeLinkService: ChromeLinkService) { }

  ngOnInit(): void {
    this.chromeLinkService.parent$.subscribe((str: string) => this.parent = str);
  }

}
