import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cache'
})
export class CachePipe implements PipeTransform {
  // tslint:disable-next-line: no-any
  public transform(value: any, handler: (v: any) => any, context?: any): any {
    if (context) {
      return handler.call(context, value);
    }

    return handler(value);
  }
}
