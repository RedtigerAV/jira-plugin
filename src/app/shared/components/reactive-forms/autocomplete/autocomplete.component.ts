// tslint:disable: no-any

import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { IAutocompleteDataSource } from './autocomplete-input.component';
import {
  ControlContainer,
  FormControl,
  NG_VALUE_ACCESSOR
} from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { ControlValueAccessorBase } from '@shared/utils/control-value-accessor.base';
import { FormErrorsService } from '@shared/errors/services/form-errors.service';

@Component({
  selector: 'app-autocomplete',
  templateUrl: 'autocomplete.component.html',
  styleUrls: ['autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: AutocompleteComponent,
      multi: true
    }
  ]
})
export class AutocompleteComponent extends ControlValueAccessorBase {
  @Input()
  public previewControlName: string;

  @Input()
  public previewFormControl: FormControl;

  @Input()
  public dataSource: IAutocompleteDataSource;

  @Input()
  public placeholder: string;

  @Input()
  public label: string;

  @Input()
  public getKey: (item: any) => any;

  @Input()
  public panelWidth: string;

  @Input()
  public updateByInput: boolean;

  @Output()
  public optionSelected = new EventEmitter<MatAutocompleteSelectedEvent>();

  @Output()
  public onInput = new EventEmitter<string>();

  constructor(
    public readonly formErrorsService: FormErrorsService,
    public readonly controlContainer: ControlContainer
  ) {
    super(controlContainer, formErrorsService);
  }
}
