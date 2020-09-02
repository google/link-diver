import { Component, OnInit } from '@angular/core';
import { CrossComponentDataService } from '../cross-component-data.service';
import { FilterKeys, FilterOption, GroupByKeys, GroupingOptions, GroupingModifiers, GroupOrders } from '../interfaces';

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

    // We need to scan filters for regex so we can highlight matches
    const newRegexArr: RegExp[] = [];
    options.filters.forEach((filter: FilterOption<any>) => {
      if (filter.isHighlightableRegex) {
        newRegexArr.push(new RegExp(`(${filter.inputString})`, 'g'));
      }
    });
    this.ccdService.updateRegex(newRegexArr);

  }

  private parseInput(input: string) {
    const filters: FilterOption<any>[] = [];
    let grouping: GroupingOptions = {
      groupBy: GroupByKeys.None,
      sort: GroupOrders.None
    };

    if (!input) {
      return {
        filters,
        grouping
      };
    }

    // We put each space seperated token in a stack
    const stackInput = input.trim().split(' ').reverse();

    let currInputArg: string;
    while (stackInput.length > 0) {
      currInputArg = stackInput.pop();
      if (currInputArg === '{') {
        grouping = this.consumeAndParseGrouping(stackInput);
        if (grouping.groupBy === GroupByKeys.Rewrite) {
          // We want to implicitly filter (but not highlight) any regexs that
          // are part of a rewrite rule
          filters.push({
            filterKey: FilterKeys.Regex,
            inputString: '',
            value: grouping.regex,
            isNegation: false,
            isValidInput: true,
            isHighlightableRegex: false
          });
        }
      } else {
        const newFilter = this.parseArgument(currInputArg);
        if (newFilter.isValidInput) {
          filters.push(newFilter);
        }
      }
    }

    return {
      filters,
      grouping
    };
  }

  /**
   * Takes a stack of inputs starting immediately after the opening bracket and
   * parses each one, incoroprating it into a GroupingOptions object until it
   * finds the closing bracket.
   * @param { string[] } stackInput The input tokens as a stack of strings
   * starting right after the opening bracket.
   * @return { GroupingOptions } The constructed GroupingOptions object.
   */
  private consumeAndParseGrouping(stackInput: string[]): GroupingOptions {
    const grouping: GroupingOptions = {
      groupBy: GroupByKeys.None,
      sort: GroupOrders.None
    };

    let currGroupArg: string;
    while (stackInput.length > 0) {
      currGroupArg = stackInput.pop();
      if (currGroupArg === '}') {
        return grouping;
      } else if (currGroupArg.startsWith(GroupingModifiers.Sort)) {
        const original = new RegExp(currGroupArg);
        currGroupArg = currGroupArg.substring(GroupingModifiers.Sort.length);
        switch (currGroupArg) {
          case 'asc':
          case 'ascending':
          case 'lexico-asc':
          case 'lex-asc':
            grouping.sort = GroupOrders.LexicoAscend;
            this.newInput = this.newInput.replace(original, 'sort:lex-asc');
            break;
          case 'desc':
          case 'descending':
          case 'lexico-desc':
          case 'lex-desc':
            grouping.sort = GroupOrders.LexicoDescend;
            this.newInput = this.newInput.replace(original, 'sort:lex-desc');
            break;
          case 'size':
          case 'size-asc':
            grouping.sort = GroupOrders.SizeAscend;
            this.newInput = this.newInput.replace(original, 'sort:size-asc');
            break;
          case 'size-desc':
            grouping.sort = GroupOrders.SizeDescend;
            this.newInput = this.newInput.replace(original, 'sort:size-desc');
            break;
        }
      } else if (currGroupArg.startsWith(GroupingModifiers.Regex)) {
        currGroupArg = currGroupArg.substring(GroupingModifiers.Regex.length);
        grouping.groupBy = GroupByKeys.Rewrite;
        grouping.regex = new RegExp(currGroupArg);
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
    return {
      groupBy: GroupByKeys.None,
      sort: GroupOrders.None
    };
  }

  /**
   * Takes a full filter argument, parses it and constructs a FilterOption
   * object filled with the relevant data.
   *
   * @param { string } str The full filter argument as a string
   * @return { FilterOption<any> } The constructed FilterOption object
   */
  private parseArgument(str: string): FilterOption<any> {
    // By default we assume a regex unless we find a modifier
    const filterOption = {
      filterKey: FilterKeys.Regex,
      inputString: str,
      value: undefined,
      isNegation: false,
      isValidInput: true,
      isHighlightableRegex: false
    };

    this.parseNegation(filterOption);

    for (const key in FilterKeys) {
      if (filterOption.inputString.startsWith(FilterKeys[key])) {
        this.parseModifier(filterOption, FilterKeys[key]);
        break;
      }
    }

    // If the argument had no valid modifier
    if (filterOption.value === undefined) {
      // We assume a lack of modifier indicates a regex filter
      filterOption.filterKey = FilterKeys.Regex;
      filterOption.value = new RegExp(filterOption.inputString);
      filterOption.isHighlightableRegex = !filterOption.isNegation;
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
      filter.isNegation = true;
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
        filter.isHighlightableRegex = !filter.isNegation;
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
