import { Pipe, PipeTransform } from '@angular/core';
import { LinkData } from './link.service';

/**
 * This pipe filters the list of links for the ones that have a match with a
 * given regular expression
 */
@Pipe({
  name: 'filterByRegex'
})
export class FilterByRegexPipe implements PipeTransform {

  transform(links: LinkData[], regexStr: string): LinkData[] {
    if (!regexStr.trim()) {
      return links;
    }
    const regex = new RegExp(regexStr);
    return links.filter((link) => regex.test(link.href));
  }

}
