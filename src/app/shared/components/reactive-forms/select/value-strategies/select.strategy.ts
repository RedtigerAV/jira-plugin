import { SelectComponent } from '../select.component';

export interface ISelectValueStrategy {
  validate?: (component: SelectComponent) => void;
  // tslint:disable-next-line: no-any
  getValue(option: any): any;
  // tslint:disable-next-line: no-any
  getOptionOfValue(value: any): any;

  // tslint:disable-next-line: no-any
  compareWith(o1: any, o2: any): boolean;
  // tslint:disable-next-line: no-any
  compareOptionWithValue(option: any, value: any): boolean;
}
