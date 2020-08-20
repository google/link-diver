import { Pipe, PipeTransform } from '@angular/core';
import { LinkData } from './interfaces';

/**
 * This pipe filters the list of links for the ones that have a match with a
 * given regular expression
 */
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(links: LinkData[], regexStr: string,
      filters: LinkData): LinkData[] {

    if (filters) {
      Object.keys(filters).forEach((key) => {
        links = links.filter((link) => link[key] == filters[key]);
      });
    }

    if (regexStr) {
      const regex = new RegExp(regexStr);
      links = links.filter((link) => regex.test(link.href));
    }

    return links;
  }

}
