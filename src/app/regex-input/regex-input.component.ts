import { Component, OnInit } from '@angular/core';
import { RegexService } from '../regex.service';

/**
 * This component is responsible for taking a regular expression as input and
 * pushing changes into the observable stream
 */
@Component({
  selector: 'app-regex-input',
  templateUrl: './regex-input.component.html',
  styleUrls: ['./regex-input.component.css']
})
export class RegexInputComponent implements OnInit {

  newRegex: string;

  constructor(private regexService: RegexService) { }

  ngOnInit(): void {
  }

  pushRegex() {
    this.regexService.updateRegex(this.newRegex);
  }
}
