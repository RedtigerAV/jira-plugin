import { ChangeDetectionStrategy, Component, ContentChild, EventEmitter, Input, Output } from '@angular/core';
import { ControlContainer, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { ControlValueAccessorBase } from '@shared/utils/control-value-accessor.base';
import { CustomOptionDirective } from '@shared/components/reactive-forms/directives/custom-option/custom-option.directive';
import { IDataSource } from '../interfaces/datasource.interfaces';
import { InputModeEnum } from '@core/enums/input-mode.enum';
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
  @ContentChild(CustomOptionDirective, { static: false })
  public optionDirective: CustomOptionDirective;

  @Input()
  public previewControlName: string;

  @Input()
  public inputMode: InputModeEnum;

  @Input()
  public previewFormControl: FormControl;

  @Input()
  // tslint:disable-next-line: no-any
  public dataSource: IDataSource<any, string>;

  @Input()
  public placeholder: string;

  @Input()
  public label: string;

  @Input()
  // tslint:disable-next-line: no-any
  public getKey: (item: any) => any;

  @Input()
  public panelWidth: string;

  @Input()
  public updateByInput: boolean;

  @Output()
  public optionSelected = new EventEmitter<MatAutocompleteSelectedEvent>();

  @Output()
  public onInput = new EventEmitter<string>();

  // TODO: isOutline нужен временно, для того чтобы поддержать одновременно два стиля input-а
  // КИТовый и тот что в админке c outline. Выпилить после полного перехода на КИТовый стиль.
  // Чтобы ui-sb стили работали корректно, appearance инпута должен быть legacy
  @Input() public isOutline = true;
  @Input() public panelClass = '';

  /**
   * Если true, селект сохраняет опцию в FormControl. Иначе, сохраняет значение,
   * возвращаемое datasource.getKey.
   */
  @Input() public optionValue: boolean;

  constructor(
    public readonly formErrorsService: FormErrorsService,
    public readonly controlContainer: ControlContainer
  ) {
    super(controlContainer, formErrorsService);
  }
}
