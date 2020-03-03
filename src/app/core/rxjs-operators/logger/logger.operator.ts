import { Observable, throwError } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { toJson } from '@core/rxjs-operators/helpers/to-json.helper';

/* tslint:disable */

export const logger = <T>(name: string) => (source: Observable<T>) => {
  console.log(`${name} subscribe`);
  return source.pipe(
    tap(
      value => {
        console.log(`${name} emit ${toJson(value)}`);
      },
      err => {
        console.log(`${name} error`);
        return throwError(err);
      },
      () => {
        console.log(`${name} complete`);
      }
    ),
    finalize(() => console.log(`${name} unsubscribe`))
  );
};
