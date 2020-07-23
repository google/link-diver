import { Pipe, PipeTransform } from '@angular/core';
import { LinkData } from './link.service';
import { GroupData } from './group-list/group-list.component';

@Pipe({
  name: 'groupBy'
})
export class GroupByPipe implements PipeTransform {

  transform(links: LinkData[]): GroupData[] {

    // Groups object into one big map like object where the links are the keys
    const groupedLinks = links.reduce((obj, link) => {
      obj[link.host] = [...obj[link.host] || [], link];
      return obj;
    }, {});

    // Converts groupedLinks into an array like object so it can be iterated
    const groupedArr = Object.keys(groupedLinks).map((key) => {
      return {
        host: key,
        list: groupedLinks[key],
        size: groupedLinks[key].length
      };
    });
    console.log(groupedArr);
    return groupedArr;
  }

}
