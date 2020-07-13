import { IAutocompleteStrategy } from './autocomplete.strategy';
import { IDataSource } from '../../interfaces/datasource.interfaces';
import { AutocompleteInputComponent } from '../autocomplete-input.component';

export class OptionValueAutocompleteStrategy implements IAutocompleteStrategy {
  // tslint:disable-next-line: no-any
  constructor(private readonly dataSource: IDataSource<any, any>) {}
  // tslint:disable-next-line: no-any
  public getValue(option: any): any {
    return option;
  }

  // tslint:disable-next-line: no-any
  public displayWith(value: any): any {
    return !!value ? this.dataSource.displayWith(value) : null;
  }

  public validate(component: AutocompleteInputComponent): void {
    if (!!component.previewControl) {
      throw Error(`При включенной опции optionValue начальное значение AutoComplete-а берется из FormControl.
      Инпуты previewControlName и previewFormControl устанавливаться не должны`);
    }
  }
}
