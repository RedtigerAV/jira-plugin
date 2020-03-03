import { TestScheduler } from 'rxjs/testing';
import { OnDestroy } from '@angular/core';
import { tap } from 'rxjs/operators';
import { takeUntilDestroyed } from '@core/rxjs-operators/take-until-destroyed/take-until-destroyed.operator';

describe('takeUntilDestroyed | оператор автоотписки при дестрое компонента', () => {
  const testScheduler = new TestScheduler((actual, expected) => {
    expect(actual).toEqual(expected);
  });

  it('Завершает стрим при дестрое компонента', () => {
    testScheduler.run(helpers => {
      const { hot, expectObservable, expectSubscriptions } = helpers;

      const component: OnDestroy = { ngOnDestroy: () => {} };
      const catchDestroy = (() => {
        let i = 0;

        return () => {
          i++;

          if (i === 3) {
            component.ngOnDestroy();
          }
        };
      })();

      const stream$ = hot('-a--b--c--');
      const subs = '^------!';
      const expected = '-a--b--|';

      expectObservable(
        stream$.pipe(
          tap(() => catchDestroy()),
          takeUntilDestroyed(component)
        )
      ).toBe(expected);
      expectSubscriptions(stream$.subscriptions).toBe(subs);
    });
  });
});
