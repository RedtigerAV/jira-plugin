// tslint:disable: no-any

import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import {
  ControlContainer,
  FormControl,
  FormControlDirective,
  NG_VALUE_ACCESSOR
} from '@angular/forms';
import { Observable } from 'rxjs';
import { MatSelectChange } from '@angular/material';
import { ControlValueAccessorBase } from '@shared/utils/control-value-accessor.base';
import { FormErrorsService } from '@shared/errors/services/form-errors.service';
import { CustomOptionDirective } from '@shared/directives/custom-option.directive';

export interface ISelectDataSource {
  data$: Observable<any>;
  getValue: (item: any) => any;
  getOptionByValue: (value: any) => any;
  displayWith: (item: any) => string;
}

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SelectComponent,
      multi: true
    }
  ]
})
export class SelectComponent extends ControlValueAccessorBase {
  @ViewChild(FormControlDirective, { static: true })
  public formControlDirective: FormControlDirective;
  @ContentChild(CustomOptionDirective, { static: false })
  public optionDirective: CustomOptionDirective;

  @Input() public label: string;
  @Input() public placeholder: string;
  @Input() public formControl: FormControl;
  @Input() public formControlName: string;
  @Input() public previewControlName: string;
  @Input() public previewFormControl: FormControl;
  @Input() public dataSource: ISelectDataSource;
  @Input() public textNotFound: string;

  @Output() public selectionChange = new EventEmitter<MatSelectChange>();

  public get control(): FormControl {
    return (
      this.formControl ||
      (this.controlContainer.control.get(this.formControlName) as FormControl)
    );
  }

  public get previewControl(): FormControl {
    return (
      this.previewFormControl ||
      (this.controlContainer.control.get(
        this.previewControlName
      ) as FormControl)
    );
  }

  constructor(
    public readonly formErrorsService: FormErrorsService,
    public readonly controlContainer: ControlContainer
  ) {
    super(controlContainer, formErrorsService);

    this.textNotFound = this.textNotFound
      ? this.textNotFound
      : 'No results';
  }

  public getOptions(dataSourceOptions: any[]): any[] {
    if (!dataSourceOptions) {
      const previewOption =
        (this.previewControl && this.previewControl.value) || null;

      return (previewOption && [previewOption]) || [];
    }

    return dataSourceOptions;
  }

  public onSelectionChange(change: MatSelectChange): void {
    this.selectionChange.emit(change.value);

    if (this.previewControl) {
      const option = this.dataSource.getOptionByValue(change.value);

      if (!this.dataSource.getValue(option)) {
        this.previewControl.setValue(undefined);
      } else {
        this.previewControl.setValue(option);
      }
    }
  }

  public getErrorMessage(): string {
    return this.formErrorsService.getFormControlErrorText(this.control);
  }

  public registerOnTouched(fn: any): void {
    if (this.formControlDirective) {
      this.formControlDirective.valueAccessor.registerOnTouched(fn);
    }
  }

  public registerOnChange(fn: any): void {
    if (this.formControlDirective) {
      this.formControlDirective.valueAccessor.registerOnChange(fn);
    }
  }

  public writeValue(obj: any): void {
    if (this.formControlDirective) {
      this.formControlDirective.valueAccessor.writeValue(obj);
    }
  }

  public setDisabledState(isDisabled: boolean): void {
    if (this.formControlDirective) {
      this.formControlDirective.valueAccessor.setDisabledState(isDisabled);
    }
  }
}
