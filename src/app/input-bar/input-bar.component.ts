import { Component, OnInit } from '@angular/core';
import { OptionsService } from '../options.service';

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

  constructor(private optionsService: OptionsService) { }

  ngOnInit(): void { }

  pushInput() {
    const options = this.parseInput(this.newInput);
    this.optionsService.updateRegex(options.regex);
    this.optionsService.updateGroupingKey(options.group);

    // we delete any options that are not filter by metadata keys so that
    // only filter keys are left for the filter pipe to manage.
    delete options.regex;
    delete options.group;
    this.optionsService.updateFilters(options);

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
