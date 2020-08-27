import { Pipe, PipeTransform } from '@angular/core';
import { CrossComponentDataService } from './cross-component-data.service';
import { LinkData, SortOptions, GroupData, GroupByKeys, GroupingOptions, GroupOrders } from './interfaces';

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

  transform(links: LinkData[], grouping: GroupingOptions,
      sortOrder: SortOptions): GroupData[] {

    if (!links) return [];

    switch (sortOrder) {
      case SortOptions.LexicoAscend:
        links.sort((a, b) => this.lexicographicComp(a, b, 'href'));
        break;
      case SortOptions.LexicoDescend:
        links.sort((a, b) => -1 * this.lexicographicComp(a, b, 'href'));
        break;
      case SortOptions.DOM:
        links.sort((a, b) => a.domId - b.domId);
        break;
      case SortOptions.DOMReverse:
        links.sort((a, b) => b.domId - a.domId);
    }

    let keyAttribute;
    switch (grouping.groupBy) {
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
      case GroupByKeys.Rewrite:
        keyAttribute = 'rewrite';
        this.assignRewrites(links, grouping);
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
        size: groupedLinks[key].length,
        sizeProportion: groupedLinks[key].length / links.length
      };
    });

    switch (grouping.sort) {
      case GroupOrders.LexicoAscend:
        groupedArr.sort((a, b) => this.lexicographicComp(a, b, 'key'));
        break;
      case GroupOrders.LexicoDescend:
        groupedArr.sort((a, b) => -1 * this.lexicographicComp(a, b, 'key'));
        break;
      case GroupOrders.SizeAscend:
        groupedArr.sort((a, b) => a.size - b.size);
        break;
      case GroupOrders.SizeDescend:
        groupedArr.sort((a, b) => b.size - a.size);
        break;
    }

    this.ccdService.updateGroupCount({
      numGroups: groupedArr.length,
      numLinks: links.length
    });

    return groupedArr;
  }

  /**
   * Comparison function for arbitrary objects that compares lexicographically
   * based on the attributes of the object corresponding to key.
   * @param { any } first
   * @param { any } second
   * @param { string } key The key denoting which attribute should be used for
   * the comparison.
   * @return { number }
   */
  private lexicographicComp(first: any, second: any, key: string): number {
    if (first[key] < second[key]) {
      return -1;
    } else if (first[key] > second[key]) {
      return 1;
    } else {
      return 0;
    }
  }

  /**
   * Assigns the value of rewrite to each link in links based on the
   * rewrite rules in grouping.
   * @param { LinkData[] } links
   * @param { GroupingOptions } grouping
   */
  private assignRewrites(links: LinkData[], grouping: GroupingOptions): void {
    links.forEach((link: LinkData) => {
      link.rewrite = link.href.match(grouping.regex)[0];
      if (grouping.rewrite) {
        link.rewrite = link.rewrite.replace(grouping.regex, grouping.rewrite);
      }
    });
  }

}
