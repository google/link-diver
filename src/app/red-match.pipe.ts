import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'redMatch'
})
export class RedMatchPipe implements PipeTransform {
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
