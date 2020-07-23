import { Pipe, PipeTransform } from '@angular/core';
import { LinkData } from './link.service';

@Pipe({
  name: 'groupBy'
})
export class GroupByPipe implements PipeTransform {

  transform(myLinks: LinkData[]): unknown {

    console.log('abc');
    console.log(myLinks);
    console.log(myLinks.values().next());
    console.log(myLinks[0]);
    console.log(myLinks[1]);
    console.log(myLinks.length);
    console.log(Array.from(myLinks).length);
    console.log(Array.from(myLinks));
    console.log([myLinks][0].length);
    console.log(myLinks.keys());
    myLinks.forEach((link) => {
      console.log(link);
    });
    /* if (linkList.length === 0) {
      return [];
    }
    console.log(linkList.reduce((r, link) => {
      console.log(r, link);
      r[link.host] = [...r[link.host] || [], link];
      return r;
    })); */
    console.log([myLinks]);
    return [myLinks];
  }

}
