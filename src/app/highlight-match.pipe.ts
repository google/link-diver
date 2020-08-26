import { Pipe, PipeTransform } from '@angular/core';

/**
 * This pipe filters each link and applies a bold, red font to whichever part of
 * the link matches the regular expression given by 'term'
 */
@Pipe({
  name: 'highlightMatch'
})
export class HighlightMatchPipe implements PipeTransform {
  transform(link: string, term: string): string {
    if (term == '') {
      return link;
    } try {
      const regExp = new RegExp(`(${term})`, 'g');
      return link.replace(regExp, `<span class="red">$1</span>`);
    } catch (err) {
      return link;
    }
  }

}
