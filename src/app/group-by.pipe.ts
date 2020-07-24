import { Pipe, PipeTransform } from '@angular/core';
import { LinkData } from './link.service';
import { GroupData } from './group-list/group-list.component';

/**
 * This pipe is responsible for the filtered links and returning an array of
 * GroupData objects which hold the grouping of those links based on the
 * key attribute that is passed in as a parameter. Note that if the keyAttribute
 * is undefined the pipe puts every link in one big group.
 */
@Pipe({
  name: 'groupBy',
  pure: false
})
export class GroupByPipe implements PipeTransform {

  transform(links: LinkData[], keyAttribute: string): GroupData[] {

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

}
