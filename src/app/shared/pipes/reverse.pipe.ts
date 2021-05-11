import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse',
})
export class ReversePipe implements PipeTransform {
  transform(value: string, shouldReverse: boolean) {
    return shouldReverse ? [...value].reverse().join('') : value;
  }
}
