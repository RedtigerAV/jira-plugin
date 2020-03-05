import {
  AbstractControl,
  ControlContainer,
  ControlValueAccessor,
  FormControl,
  FormControlDirective
} from '@angular/forms';
import { Input, Optional, ViewChild } from '@angular/core';
import { FormErrorsService } from '@shared/errors/services/form-errors.service';

export abstract class ControlValueAccessorBase implements ControlValueAccessor {
  @ViewChild(FormControlDirective, { static: true })
  public formControlDirective: FormControlDirective;

  @Input()
  public formControl: FormControl;
  @Input()
  public formControlName: string;

  private readonly newFormControl = new FormControl();

  protected constructor(
    protected readonly controlContainer: ControlContainer,
    @Optional() protected formErrorsService: FormErrorsService
  ) {}

  public get control(): AbstractControl {
    return (
      this.formControl ||
      this.controlContainer.control.get(this.formControlName) ||
      this.newFormControl
    );
  }

  public get errorMessage(): string | null {
    if (!this.formErrorsService) {
      return null;
    }

    return this.formErrorsService.getFormControlErrorText(this.control);
  }

  private get valueAccessorExists(): boolean {
    return !!(
      this.formControlDirective && this.formControlDirective.valueAccessor
    );
  }

  public registerOnTouched(fn: () => void): void {
    if (this.valueAccessorExists) {
      this.formControlDirective.valueAccessor.registerOnTouched(fn);
    }
  }

  public registerOnChange(fn: () => void): void {
    if (this.valueAccessorExists) {
      this.formControlDirective.valueAccessor.registerOnChange(fn);
    }
  }

  // tslint:disable-next-line: no-any
  public writeValue(obj: any): void {
    if (this.valueAccessorExists) {
      this.formControlDirective.valueAccessor.writeValue(obj);
    }
  }

  public setDisabledState(isDisabled: boolean): void {
    if (this.valueAccessorExists) {
      this.formControlDirective.valueAccessor.setDisabledState(isDisabled);
    }
  }
}
