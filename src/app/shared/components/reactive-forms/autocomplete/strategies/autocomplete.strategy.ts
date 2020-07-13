import { AutocompleteInputComponent } from '../autocomplete-input.component';

export interface IAutocompleteStrategy {
  // tslint:disable-next-line: no-any
  getValue(option: any): any;
  // tslint:disable-next-line: no-any
  displayWith(value: any): any;

  validate(component: AutocompleteInputComponent): void;
}
