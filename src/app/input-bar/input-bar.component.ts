import { Component, OnInit } from '@angular/core';
import { RegexService } from '../regex.service';
import { GroupingKeyService } from '../grouping-key.service';

/**
 * This component is responsible for taking acceptin input from the user,
 * parsing it, and pushing the desired settings to the corresponding services.
 */
@Component({
  selector: 'app-input-bar',
  templateUrl: './input-bar.component.html',
  styleUrls: ['./input-bar.component.css']
})
export class InputBarComponent implements OnInit {

  newInput: string;

  constructor(private regexService: RegexService,
    private groupingKeyService: GroupingKeyService) { }

  ngOnInit(): void { }

  pushInput() {
    const options = this.parseInput(this.newInput);
    this.regexService.updateRegex(options.regex);
    this.groupingKeyService.updateGroupingKey(options.group);

  }

  parseInput(input: string) {
    try {
      return JSON.parse(input);
    } catch (e) {
      // By deault we assume user is just inputting a regex
      return {regex: input};
    }
  }
}
