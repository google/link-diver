import { Pipe, PipeTransform } from '@angular/core';
import { LinkData, FilterOption, FilterKeys } from './interfaces';

/**
 * This pipe filters the list of links for the ones that have a match with a
 * given regular expression
 */
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(links: LinkData[], filters: FilterOption<any>[]): LinkData[] {

    if (filters.length === 0) {
      return links;
    }

    filters.forEach((filter: FilterOption<any>) => {
      const not = filter.negation;
      const val = filter.value;
      switch (filter.filterKey) {
        case FilterKeys.Regex:
          links = links.filter((link) => not !== val.test(link.href));
          break;
        case FilterKeys.Host:
          links = links.filter((link) => not !== val.test(link.host));
          break;
        case FilterKeys.StatusCode:
          links = links.filter((link) => not !== (val === link.status));
          break;
        case FilterKeys.Visible:
          links = links.filter((link) => not !== (val === link.visible));
          break;
        case FilterKeys.StatusOk:
          links = links.filter((link) => not !== (val === link.statusOk));
          break;
        case FilterKeys.TagName:
          links = links.filter((link) => not !== (link.tagName.includes(val)));
          break;
        case FilterKeys.ContentType:
          links = links.filter((link) => not !== (link.contentType.includes(val)));
          break;
      }
    });

    return links;
  }

}
