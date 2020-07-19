import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

export function retryRequestOperator<TResponse, TValue>(
  context: any,
  requestFunction: (...functionArguments) => Observable<TResponse>,
  startFunctionArguments: any[],
  valuesMapper: (response: TResponse) => TValue[],
  retryRule: (response: TResponse) => boolean,
  incrementArgumentsRule: (functionArguments: any[]) => any[]
): Observable<TValue[]> {
  const currentFunctionArguments = startFunctionArguments;

  return (requestFunction.apply(context, currentFunctionArguments) as Observable<TResponse>)
    .pipe(
      switchMap(response => {
        if (retryRule(response)) {
          const newFunctionArguments = incrementArgumentsRule(currentFunctionArguments);

          return retryRequestOperator(
            context,
            requestFunction,
            newFunctionArguments,
            valuesMapper,
            retryRule,
            incrementArgumentsRule
          )
            .pipe(map(newValues => [...valuesMapper(response), ...newValues]))
        }

        return of(valuesMapper(response))
      })
    );
}
