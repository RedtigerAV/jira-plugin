import { FbControlConfig, ValidatorsModel } from '@ng-stack/forms/lib/types';

export type IFormBuilderConfig<T extends object = any, V extends object = ValidatorsModel> =  {
  [P in keyof T]?: FbControlConfig<T[P], V>;
}
