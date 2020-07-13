import { ISelectValueStrategy } from './select.strategy';
import { SelectComponent } from '../select.component';
import { IDataSource } from '../../interfaces/datasource.interfaces';

export class OptionValueStrategy implements ISelectValueStrategy {
  // tslint:disable-next-line: no-any
  constructor(private readonly dataSource: IDataSource<any, any>) {}

  // tslint:disable-next-line: no-any
  public getValue(option: any): any {
    return option;
  }

  // tslint:disable-next-line: no-any
  public getOptionOfValue(value: any): any {
    return value;
  }

  public validate(component: SelectComponent): void {
    if (!!component.previewControl) {
      throw Error(`При включенной опции optionValue начальное значение Select-а берется из FormControl.
      Инпуты previewControlName и previewFormControl устанавливаться не должны`);
    }
  }

  // tslint:disable-next-line: no-any
  public compareWith(o1: any, o2: any): boolean {
    if (o1 == null || o2 == null) {
      return false;
    }

    return this.dataSource.getKey(o1) === this.dataSource.getKey(o2);
  }

  // tslint:disable-next-line: no-any
  public compareOptionWithValue(option: any, value: any): boolean {
    return this.compareWith(option, value);
  }
}
