import { ChangeDetectionStrategy, Component, Input, Optional, Self, ViewChild } from '@angular/core';
import { FormControl, FormControlDirective, NgControl } from '@angular/forms';
import { IDataSource } from '../interfaces/datasource.interfaces';
import { InputModeEnum } from '@core/enums/input-mode.enum';
import { FormErrorsService } from '@shared/errors/services/form-errors.service';

@Component({
  selector: 'app-chip-list',
  templateUrl: './chip-list.component.html',
  styleUrls: ['./chip-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChipListComponent {
  @ViewChild(FormControlDirective, { static: true })
  public formControlDirective: FormControlDirective;

  @Input() public label: string;

  @Input() public placeholder: string;

  @Input() public selectable = true;

  @Input() public removable = true;

  @Input() public autocomplete = true;

  @Input() public addOnBlur: boolean;

  @Input()
  public inputMode: InputModeEnum;

  @Input()
  // tslint:disable-next-line: no-any
  public dataSource: IDataSource<any, any>;

  constructor(@Optional() @Self() public ngControl: NgControl, private readonly formErrorService: FormErrorsService) {
    if (ngControl) {
      ngControl.valueAccessor = this;
    }
  }

  public get errorMessage(): string | null {
    if (!this.formErrorService) {
      return null;
    }

    return this.formErrorService.getFormControlErrorText(this.ngControl.control);
  }

  public registerOnTouched(fn: () => void): void {
    this.formControlDirective.valueAccessor.registerOnTouched(fn);
  }

  public registerOnChange(fn: () => void): void {
    this.formControlDirective.valueAccessor.registerOnChange(fn);
  }

  // tslint:disable-next-line: no-any
  public writeValue(obj: any): void {
    this.formControlDirective.valueAccessor.writeValue(obj);
  }

  public setDisabledState(isDisabled: boolean): void {
    this.formControlDirective.valueAccessor.setDisabledState(isDisabled);
  }
}
