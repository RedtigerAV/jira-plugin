import { Pipe, PipeTransform, TrackByFunction } from '@angular/core';
import get from 'lodash-es/get';

// tslint:disable: no-any
interface ITrackByFunctionCache {
  [propertyName: string]: TrackByFunction<any>;
}

const trackByCache: ITrackByFunctionCache = Object.create(null);
const INDEX_PROPERTY_NAME = '$index';

@Pipe({
  name: 'trackBy'
})
export class TrackByPipe implements PipeTransform {
  public transform(propertyName: string): TrackByFunction<any> {
    if (propertyName === INDEX_PROPERTY_NAME) {
      if (!trackByCache[propertyName]) {
        trackByCache[propertyName] = function trackByProperty<T>(
          index: number
        ): any {
          return index;
        };
      }
    } else {
      if (!trackByCache[propertyName]) {
        trackByCache[propertyName] = function trackByProperty<T>(
          index: number,
          item: T
        ): any {
          return get(item, propertyName);
        };
      }
    }

    return trackByCache[propertyName];
  }
}
