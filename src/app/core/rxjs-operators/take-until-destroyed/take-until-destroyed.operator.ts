import { OnDestroy } from '@angular/core';
import { MonoTypeOperatorFunction, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export const destroy = Symbol('destroy');

/**
 * Кастомный RxJs оператор для автоотписки от Observables при уничтожении компонента
 * @example
 * В компоненте:
 * interval(1000).pipe(takeUntilDestroyed(this)).subscribe()
 * @param {OnDestroy} component Компонент с реализованным интерфейсом OnDestroy (даже если метод пустой)
 * @return {MonoTypeOperatorFunction<T>} takeUntil, привязанный к уничтожению компонента
 */
export function takeUntilDestroyed<T>(
  component: OnDestroy
): MonoTypeOperatorFunction<T> {
  if (!component[destroy]) {
    const ngOnDestroy = component.ngOnDestroy;

    component[destroy] = new Subject<void>();
    component.ngOnDestroy = function(): void {
      component[destroy].next();
      component[destroy].complete();

      ngOnDestroy.apply(this, arguments);
    };
  }

  return input$ => input$.pipe(takeUntil(component[destroy]));
}
