import { AbstractControl } from '@angular/forms';
import { IAutocompleteStrategy } from './autocomplete.strategy';
import { IDataSource } from '../../interfaces/datasource.interfaces';
import { AutocompleteInputComponent } from '../autocomplete-input.component';

export class PrimitiveValueAutocompleteStrategy implements IAutocompleteStrategy {
  // tslint:disable-next-line: no-any
  constructor(private readonly dataSource: IDataSource<any, any>, private readonly previewControl: AbstractControl) {}

  // tslint:disable-next-line: no-any
  public getValue(option: any): any {
    return !!option ? this.dataSource.getKey(option) : null;
  }

  // tslint:disable-next-line: no-any
  public displayWith(value: any): any {
    const previewValue = this.previewControl && this.previewControl.value;

    return previewValue ? this.dataSource.displayWith(previewValue) : value;
  }

  public validate(component: AutocompleteInputComponent): void {}
}
