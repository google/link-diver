import { Pipe, PipeTransform } from '@angular/core';
import { LinkData } from './link.service';

export enum SortOptions {
  DOM,
  DOMReverse,
  LexicoAscend,
  LexicoDescend
}

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(linkList: LinkData[], order: SortOptions): LinkData[] {

    switch (order) {
      case SortOptions.DOM:
        return linkList;
      case SortOptions.DOMReverse:
        return linkList.reverse();
      case SortOptions.LexicoAscend:
        return linkList.sort(this.lexicographicComp);
      case SortOptions.LexicoDescend:
        return linkList.sort((a, b) => -1 * this.lexicographicComp(a, b));
    }
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
