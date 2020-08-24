import { Pipe, PipeTransform } from '@angular/core';

/**
 * This pipe filters each link and applies a bold, red font to whichever part of
 * the link matches the regular expression given by 'term'
 */
@Pipe({
  name: 'highlightMatch'
})
export class HighlightMatchPipe implements PipeTransform {
  transform(link: string, regexArr: RegExp[]): string {
    regexArr.forEach((regex: RegExp) => {
      link = link.replace(regex, `<span class="red">$1</span>`);
    });

    return link;
  }

}
