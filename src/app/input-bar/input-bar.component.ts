import { Component, OnInit } from '@angular/core';
import { CrossComponentDataService } from '../cross-component-data.service';
import { FilterKeys, FilterOption, GroupByKeys } from '../interfaces';

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

  pushInput(): void {
    const options = this.parseInput(this.newInput);
    this.ccdService.updateFilters(options.filters);
    this.ccdService.updateGroupingKey(options.groupBy);

    // We need to scan filters for regex so we can highlight matches
    options.filters.forEach((filter: FilterOption<any>) => {
      if (filter.filterKey === FilterKeys.Regex && !filter.negation) {
        const regex = new RegExp(`(${filter.valueAsStr})`, 'g');
        this.ccdService.updateRegex(regex);
      }
    });

  }

  parseInput(input: string) {
    const filters: FilterOption<any>[] = [];
    let groupBy: GroupByKeys = undefined;

    if (!input) {
      return {
        filters,
        groupBy
      };
    }
    const splitInput = input.trim().split(' ');

    if (splitInput.length === 1) {
      const newFilter = this.parseArgument(splitInput[0], true);
      if (newFilter) {
        filters.push(newFilter);
      }
    } else {
      for (let i = 0; i < splitInput.length; i++) {
        if (splitInput[i] !== '{') {
          const newFilter = this.parseArgument(splitInput[i], false);
          if (newFilter) {
            filters.push(newFilter);
          }
        } else if (i + 2 >= splitInput.length || splitInput[i + 2] !== '}') {
          // To group we require the syntax { grouping_key }
          console.error('Invalid input, to group links make sure there are ' +
              'spaces between the brackets and the grouping key.');
          return undefined;
        } else {
          for (const key in GroupByKeys) {
            if (GroupByKeys[key] === splitInput[i + 1]) {
              groupBy = GroupByKeys[key];
              break;
            }
          }
          i += 2;
        }
      }
    }

    return {
      filters,
      groupBy
    };
  }

  private parseArgument(str: string, onlyArg: boolean): FilterOption<any> {
    // By default we assume a regex unless we find a modifier
    const filterOption = {
      filterKey: undefined,
      valueAsStr: str,
      value: undefined,
      negation: false
    };

    this.parseNegation(filterOption);

    for (const key in FilterKeys) {
      if (filterOption.valueAsStr.startsWith(FilterKeys[key])) {
        this.parseModifier(filterOption, FilterKeys[key]);
        break;
      }
    }

    if (!filterOption.filterKey) {
      if (onlyArg) {
        filterOption.filterKey = FilterKeys.Regex;
        filterOption.value = new RegExp(filterOption.valueAsStr);
      } else {
        console.error('Invaild Input: \'' + filterOption.valueAsStr +
            '\' does not start with a valid modifier');
        return undefined;
      }
    }

    return filterOption;
  }

  private parseNegation(filter: FilterOption<any>) {
    const negation = 'not:';
    if (filter.valueAsStr.startsWith(negation)) {
      filter.valueAsStr = filter.valueAsStr.substring(negation.length);
      filter.negation = true;
    }
  }

  private parseModifier(filter: FilterOption<any>, key: FilterKeys) {
    filter.filterKey = key;
    filter.valueAsStr = filter.valueAsStr.substring(key.length);
    switch (key) {
      // Tag Name is capitalized natively
      case FilterKeys.TagName:
        filter.value = filter.valueAsStr.toUpperCase();
        break;
      // Conent Type is just the input string
      case FilterKeys.ContentType:
        filter.value = filter.valueAsStr;
        break;
      // Cases where value should be a boolean
      case FilterKeys.Visible:
      case FilterKeys.StatusOk:
        filter.value = this.parseBool(filter.valueAsStr);
        break;
      // Cases where value should be an int
      case FilterKeys.StatusCode:
        filter.value = parseInt(filter.valueAsStr);
        break;
      // Cases where value should be a regular expression
      case FilterKeys.Regex:
      case FilterKeys.Host:
        filter.value = new RegExp(filter.valueAsStr);
        break;
    }
  }

  private parseBool(valueAsStr: string): boolean {
    const falseStrings = ['false', 'f', '0'];
    return !falseStrings.includes(valueAsStr.toLowerCase());
  }

}
