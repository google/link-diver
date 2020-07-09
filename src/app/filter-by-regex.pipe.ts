import { Pipe, PipeTransform } from '@angular/core';

/**
 * This pipe filters the list of links for the ones that have a match with a
 * given regular expression
 */
@Pipe({
  name: 'filterByRegex'
})
export class FilterByRegexPipe implements PipeTransform {

  transform(links: string[], regexStr: string): string[] {
    if (!regexStr.trim()) {
      return links;
    }
    const regex = new RegExp(regexStr);
    return links.filter((str) => regex.test(str));
  }

}
