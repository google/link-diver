import { Component, OnInit } from '@angular/core';
import { RegexService } from '../regex.service';

/**
 * This component is responsible for taking a regular expression as input and
 * pushing changes into the observable stream
 */
@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  newRegex: string;

  constructor(private regexService: RegexService) { }

  ngOnInit(): void {
  }

  pushRegex() {
    this.regexService.updateRegex(this.newRegex);
  }
}
