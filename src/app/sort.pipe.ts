import { Pipe, PipeTransform } from '@angular/core';
import { LinkData } from './link.service';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(linkList: LinkData[]): LinkData[] {
    return linkList.sort((first: LinkData, second: LinkData) => {
      if (first.href < second.href) {
        return -1;
      } else if (first.href > second.href) {
        return 1;
      } else {
        return 0;
      }
    });
  }

}
