import { Pipe, PipeTransform } from '@angular/core';
import { LinkData } from './interfaces';

/**
 * This pipe filters the list of links for the ones that have a match with a
 * given regular expression
 */
@Pipe({
  name: 'filterByRegex'
})
export class FilterByRegexPipe implements PipeTransform {

  transform(links: LinkData[], filters: any): LinkData[] {

    if (filters.regex) {
      const regex = new RegExp(filters.regex);
      links = links.filter((link) => regex.test(link.href));
    }

    if (filters.not) {
      const negation = new RegExp(filters.not);
      links = links.filter((link) => !negation.test(link.href));
    }

    if (filters.host) {
      const hostRegex = new RegExp(filters.host);
      links = links.filter((link) => hostRegex.test(link.host));
    }

    if (filters.visible !== undefined) {
      const includeVisible = this.parseBool(filters.visible);
      console.log(includeVisible);
      links = links.filter((link) => link.visible === includeVisible);
    }

    if (filters.tagName) {
      links = links.filter((link) => {
        return link.tagName === filters.tagName.toUpperCase();
      });
    }

    if (filters.status !== undefined) {
      const status = parseInt(filters.status);
      links = links.filter((link) => link.status === status);
    }

    if (filters.statusOk !== undefined) {
      const includeOk = this.parseBool(filters.statusOk);
      links = links.filter((link) => link.statusOk === includeOk);
    }

    if (filters.contentType) {
      links = links.filter((link) => {
        return link.contentType.includes(filters.contentType);
      });
    }

    return links;
  }

  private parseBool(boolStr: string): boolean {
    const falseStrings = ['false', 'f', '0'];
    return !falseStrings.includes(boolStr.toLowerCase());
  }
}
