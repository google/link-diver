import { Pipe, PipeTransform } from '@angular/core';
import { LinkData } from './link.service';
import { GroupData } from './group-list/group-list.component';

export enum SortOptions {
  DOM,
  DOMReverse,
  LexicoAscend,
  LexicoDescend
}

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

  transform(links: LinkData[], keyAttribute: string,
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
