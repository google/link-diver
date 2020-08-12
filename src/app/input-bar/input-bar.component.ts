import { Component, OnInit } from '@angular/core';
import { CrossComponentDataService } from '../cross-component-data.service';

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

  constructor(private ccdService: CrossComponentDataService) { }

  ngOnInit(): void { }

  pushInput() {
    const options = this.parseInput(this.newInput);
    this.ccdService.updateRegex(options.regex);
    this.ccdService.updateGroupingKey(options.group);

    // we delete any options that are not filter by metadata keys so that
    // only filter keys are left for the filter pipe to manage.
    delete options.group;
    this.ccdService.updateFilters(options);

  }

  parseInput(input: string) {
    try {
      if (input) {
        return JSON.parse(input);
      } else {
        return {};
      }
    } catch (e) {
      // By deault we assume user is just inputting a regex
      return {regex: input};
    }
  }
}
