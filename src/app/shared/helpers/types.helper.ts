import { FbControlConfig } from '@ng-stack/forms/lib/types';

export type Any<T> = {
  // tslint:disable-next-line: no-any
  [P in keyof T]: any
};

/**
 * Переводит модель формы в состояние ее контроллов
 */
// tslint:disable-next-line: no-any
export type BooleanFormState<T = any> = Partial<
  {
    [P in keyof T]: T[P] extends Array<infer Item>
      ? BooleanFormState<Item>
      : T[P] extends object
      ? BooleanFormState<T[P]> | boolean
      : boolean
  }
>;

export type StringKeys<T> = Extract<keyof T, string>;

export type NgStackFormBuilderConfig<T extends object = any, V extends object = any> = {
  [P in keyof T]?: FbControlConfig<T[P], V>
};
