import { ISelectValueStrategy } from './select.strategy';
import { IDataSource } from '../../interfaces/datasource.interfaces';
import { FormControl } from '@angular/forms';

export class PrimitiveValueStrategy implements ISelectValueStrategy {
  constructor(
    // tslint:disable-next-line: no-any
    private readonly dataSource: IDataSource<any, any>,
    private readonly previewControl: FormControl
  ) {}

  // tslint:disable-next-line: no-any
  public getValue(option: any): any {
    return !!option ? this.dataSource.getKey(option) : null;
  }

  // tslint:disable-next-line: no-any
  public getOptionOfValue(): any {
    const previewOption = (this.previewControl && this.previewControl.value) || null;

    return previewOption;
  }

  // tslint:disable-next-line: no-any
  compareWith(o1: any, o2: any): boolean {
    return o1 === o2;
  }

  // tslint:disable-next-line: no-any
  public compareOptionWithValue(option: any, value: any): boolean {
    const optionValue = option && this.dataSource.getKey(option);

    return optionValue === value;
  }
}
