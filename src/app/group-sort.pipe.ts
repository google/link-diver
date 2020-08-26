import { Pipe, PipeTransform } from '@angular/core';
import { CrossComponentDataService } from './cross-component-data.service';
import { LinkData, SortOptions, GroupData, GroupByKeys } from './interfaces';

/**
 * This pipe is responsible for intaking the filtered links and returning
 * an array of GroupData objects which hold the grouping of those links
 * based on the key attribute that is passed in as a parameter. It is also
 * responsible for sorting the links based on the sortOrder property.
 * Note that if the keyAttribute is undefined the pipe puts every link
 * in one big group.
 */
@Pipe({
  name: 'groupSort'
})
export class GroupSort implements PipeTransform {

  constructor(private ccdService: CrossComponentDataService) { }

  transform(links: LinkData[], groupByKey: GroupByKeys,
      sortOrder: SortOptions): GroupData[] {

    if (!links) return [];

    switch (sortOrder) {
      case SortOptions.LexicoAscend:
        links.sort(this.lexicographicComp);
        break;
      case SortOptions.LexicoDescend:
        links.sort((a, b) => -1 * this.lexicographicComp(a, b));
        break;
      case SortOptions.DOM:
        links.sort((a, b) => a.domId - b.domId);
        break;
      case SortOptions.DOMReverse:
        links.sort((a, b) => b.domId - a.domId);
    }

    let keyAttribute;
    switch (groupByKey) {
      case GroupByKeys.None:
        keyAttribute = '';
        break;
      case GroupByKeys.URL:
        keyAttribute = 'href';
        break;
      case GroupByKeys.Host:
        keyAttribute = 'host';
        break;
      case GroupByKeys.Visible:
        keyAttribute = 'visible';
        break;
      case GroupByKeys.TagName:
        keyAttribute = 'tagName';
        break;
      case GroupByKeys.StatusCode:
        keyAttribute = 'status';
        break;
      case GroupByKeys.StatusOk:
        keyAttribute = 'statusOk';
        break;
      case GroupByKeys.ContentType:
        keyAttribute = 'contentType';
        break;
    }

    // Groups object into one big map like object where the links are the keys
    const groupedLinks = links.reduce((obj, link) => {
      obj[link[keyAttribute]] = [...obj[link[keyAttribute]] || [], link];
      return obj;
    }, {});

    // Converts groupedLinks into an array like object so it can be iterated
    const groupedArr = Object.keys(groupedLinks).map((key) => {
      return {
        key: key,
        list: groupedLinks[key],
        size: groupedLinks[key].length
      };
    });

    this.ccdService.updateGroupCount({
      numGroups: groupedArr.length,
      numLinks: links.length
    });

    return groupedArr;
  }

  private lexicographicComp(first: LinkData, second: LinkData): number {
    if (first.href < second.href) {
      return -1;
    } else if (first.href > second.href) {
      return 1;
    } else {
      return 0;
    }
  }

}
