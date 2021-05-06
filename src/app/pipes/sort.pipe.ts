import { Pipe, PipeTransform } from '@angular/core';
import { Beer } from '../beer';

@Pipe({
  name: 'sort',
})
export class SortPipe implements PipeTransform {
  transform(value: Beer[], propName: 'name' | 'tagline' = 'name') {
    if (value.length > 0) {
      return value.sort((a, b) => {
        let valA = a[propName].toLowerCase();
        let valB = b[propName].toLowerCase();

        if (valA < valB) {
          return -1;
        }
        if (valA > valB) {
          return 1;
        }
        return 0;
      });
    }
  }
}
