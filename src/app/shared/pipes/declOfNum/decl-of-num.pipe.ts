import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'declOfNum'
})
export class DeclOfNumPipe implements PipeTransform {
  transform(num: number, titles?: string[]): string {
    const cases = [2, 0, 1, 1, 1, 2];

    return titles[
      num % 100 > 4 && num % 100 < 20
        ? 2
        : cases[num % 10 < 5 ? num % 10 : 5]
    ];
  }
}
