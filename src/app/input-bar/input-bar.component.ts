import { Component, OnInit } from '@angular/core';
import { CrossComponentDataService } from '../cross-component-data.service';
import { FilterKeys, FilterOption, GroupByKeys, GroupingOptions, GroupingModifiers, SortOptions } from '../interfaces';

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
    this.ccdService.updateGroupingOptions(options.grouping);

    // TEMP
    console.log(options.filters);
    console.log(options.grouping);
    // TEMP

    // We need to scan filters for regex so we can highlight matches
    const newRegexArr: RegExp[] = [];
    options.filters.forEach((filter: FilterOption<any>) => {
      if (filter.filterKey === FilterKeys.Regex && !filter.negation) {
        newRegexArr.push(new RegExp(`(${filter.inputString})`, 'g'));
      }
    });
    this.ccdService.updateRegex(newRegexArr);

  }

  private parseInput(input: string) {
    const filters: FilterOption<any>[] = [];
    let grouping: GroupingOptions = {
      groupBy: GroupByKeys.None
    };

    if (!input) {
      return {
        filters,
        grouping
      };
    }

    // We put each space seperated token in a stack
    const stackInput = input.trim().split(' ').reverse();

    if (stackInput.length === 1) {
      const newFilter = this.parseArgument(stackInput[0], true);
      if (newFilter) {
        filters.push(newFilter);
      }
    } else {
      let currInputArg: string;
      while (stackInput.length > 0) {
        currInputArg = stackInput.pop();
        if (currInputArg === '{') {
          grouping = this.parseGrouping(stackInput);
          if (grouping.groupBy === GroupByKeys.Rewrite) {
            filters.push({
              filterKey: FilterKeys.Regex,
              inputString: grouping.regexStr,
              value: grouping.regex,
              negation: false,
              validInput: true
            });
          }
        } else {
          const newFilter = this.parseArgument(currInputArg, false);
          if (newFilter.validInput) {
            filters.push(newFilter);
          }
        }
      }
    }

    return {
      filters,
      grouping
    };
  }

  private parseGrouping(stackInput: string[]): GroupingOptions {
    const grouping: GroupingOptions = { groupBy: GroupByKeys.None };
    let currGroupArg: string;
    while (stackInput.length > 0) {
      currGroupArg = stackInput.pop();
      if (currGroupArg === '}') {
        return grouping;
      } else if (currGroupArg.startsWith(GroupingModifiers.Sort)) {
        currGroupArg = currGroupArg.substring(GroupingModifiers.Sort.length);
        switch (currGroupArg) {
          case 'asc':
          case 'ascending':
          case 'up':
            grouping.sort = SortOptions.LexicoAscend;
            break;
          case 'desc':
          case 'descending':
          case 'down':
            grouping.sort = SortOptions.LexicoDescend;
        }
      } else if (currGroupArg.startsWith(GroupingModifiers.Regex)) {
        currGroupArg = currGroupArg.substring(GroupingModifiers.Regex.length);
        grouping.groupBy = GroupByKeys.Rewrite;
        grouping.regex = new RegExp(currGroupArg);
        grouping.regexStr = currGroupArg;
      } else if (currGroupArg.startsWith(GroupingModifiers.Rewrite)) {
        currGroupArg = currGroupArg.substring(GroupingModifiers.Rewrite.length);
        grouping.rewrite = currGroupArg;
      } else {
        for (const key in GroupByKeys) {
          if (GroupByKeys[key] === currGroupArg &&
              grouping.groupBy === GroupByKeys.None &&
              currGroupArg !== GroupByKeys.Rewrite) {
            grouping.groupBy = GroupByKeys[key];
            break;
          }
        }
      }
    }

    // To group we require the syntax '{ grouping_key }'
    console.error('Invalid input, to group links make sure there are ' +
    'spaces between the brackets and the grouping key.');
    return { groupBy: GroupByKeys.None };
  }

  /**
   * Parses a full filter argument, parses it and constructs a FilterOption
   * object filled with the relevant data.
   *
   * @param { string } str The full filter argument as a string
   * @param { boolean } onlyArg Whether it's the only argument and we should
   * accept it as a regex filter if there is no modifier
   * @return { FilterOption<any> } The constructed FilterOption object
   */
  private parseArgument(str: string, onlyArg: boolean): FilterOption<any> {
    // By default we assume a regex unless we find a modifier
    const filterOption = {
      filterKey: undefined,
      inputString: str,
      value: undefined,
      negation: false,
      validInput: true
    };

    this.parseNegation(filterOption);

    for (const key in FilterKeys) {
      if (filterOption.inputString.startsWith(FilterKeys[key])) {
        this.parseModifier(filterOption, FilterKeys[key]);
        break;
      }
    }

    // If the argument had no valid modifier
    if (!filterOption.filterKey) {
      if (onlyArg) {
        // We allow a regular expression without a modifier if it's the only arg
        filterOption.filterKey = FilterKeys.Regex;
        filterOption.value = new RegExp(filterOption.inputString);
      } else {
        console.error('Invaild Input: \'' + filterOption.inputString +
            '\' does not start with a valid modifier');
        filterOption.validInput = false;
      }
    }

    return filterOption;
  }

  /**
   * Takes in a raw FilterOption object and checks if there is a negation
   * modifier prefixing the input. If there is it trims the modifier off of the
   * input string and sets negation to true.
   *
   * @param { FilterOption<any> } filter The raw FilterOption to be parsed
   */
  private parseNegation(filter: FilterOption<any>) {
    const negation = 'not:';
    if (filter.inputString.startsWith(negation)) {
      filter.inputString = filter.inputString.substring(negation.length);
      filter.negation = true;
    }
  }

  /**
   * Takes in a raw FilterOption object, assigns the filterKey and value
   * according to the FilterKey provided, and trims the leading modifer from
   * the input string.
   *
   * @param { FilterOption<any> } filter The raw FilterOption object to be
   * assigned
   * @param { FilterKeys } key The type of FilterKey that matches the input
   * string modifier
   */
  private parseModifier(filter: FilterOption<any>, key: FilterKeys) {
    filter.filterKey = key;
    filter.inputString = filter.inputString.substring(key.length);
    switch (key) {
      // Cases where the value we want to compare is just a string
      case FilterKeys.TagName:
      case FilterKeys.ContentType:
        filter.value = filter.inputString;
        break;
      // Cases where value should be a boolean
      case FilterKeys.Visible:
      case FilterKeys.StatusOk:
        filter.value = this.parseBool(filter.inputString);
        break;
      // Cases where value should be an int
      case FilterKeys.StatusCode:
        filter.value = parseInt(filter.inputString);
        break;
      // Cases where value should be a regular expression
      case FilterKeys.Regex:
      case FilterKeys.Host:
        filter.value = new RegExp(filter.inputString);
        break;
    }
  }

  private parseBool(valueAsStr: string): boolean {
    const falseStrings = ['false', 'f', '0'];
    return !falseStrings.includes(valueAsStr.toLowerCase());
  }

}
