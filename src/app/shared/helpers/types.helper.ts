import { FbControlConfig } from '@ng-stack/forms/lib/types';

export type Any<T> = {
  // tslint:disable-next-line: no-any
  [P in keyof T]: any
};

/**
 * Переводит модель формы в состояние ее задизейбленных контроллов
 */
// tslint:disable-next-line: no-any
export type BooleanFormState<T = any> = Partial<
  {
    [P in keyof T]: T[P] extends Array<infer Item>
      ? BooleanFormState<Item>
      : T[P] extends object
      ? BooleanFormState<T[P]>
      : boolean
  }
>;

export type NgStackFormBuilderConfig<T, V extends object = any> = {
  [P in keyof T]?: FbControlConfig<T[P], V>
};

// tslint:disable-next-line: no-any
export type NgStackFormControl<T> = T | any;
