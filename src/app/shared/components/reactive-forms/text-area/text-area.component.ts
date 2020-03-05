import { Component, Input, ViewChild } from '@angular/core';
import {
  AbstractControl,
  ControlContainer,
  FormControl,
  FormControlDirective,
  NG_VALUE_ACCESSOR
} from '@angular/forms';
import { ControlValueAccessorBase } from '@shared/utils/control-value-accessor.base';
import { FormErrorsService } from '@shared/errors/services/form-errors.service';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: TextAreaComponent,
      multi: true
    }
  ]
})
export class TextAreaComponent extends ControlValueAccessorBase {
  @ViewChild(FormControlDirective, { static: true })
  public formControlDirective: FormControlDirective;

  @Input()
  public formControl: FormControl;

  @Input()
  public label: string;

  @Input()
  public placeholder: string;

  @Input()
  public formControlName: string;

  @Input()
  public autoSize = false;

  @Input()
  public minRows = 3;

  @Input()
  public maxRows = 10;

  @Input()
  public maxLength = 1000000000;

  public get control(): AbstractControl {
    return (
      this.formControl ||
      this.controlContainer.control.get(this.formControlName)
    );
  }

  constructor(
    public readonly formErrorsService: FormErrorsService,
    public readonly controlContainer: ControlContainer
  ) {
    super(controlContainer, formErrorsService);
  }

  // tslint:disable-next-line: no-any
  public registerOnTouched(fn: any): void {
    this.formControlDirective.valueAccessor.registerOnTouched(fn);
  }

  // tslint:disable-next-line: no-any
  public registerOnChange(fn: any): void {
    this.formControlDirective.valueAccessor.registerOnChange(fn);
  }

  // tslint:disable-next-line: no-any
  public writeValue(obj: any): void {
    this.formControlDirective.valueAccessor.writeValue(obj);
  }

  public setDisabledState(isDisabled: boolean): void {
    this.formControlDirective.valueAccessor.setDisabledState(isDisabled);
  }

  public getErrorMessage(): string {
    return this.formErrorsService.getFormControlErrorText(this.control);
  }
}
