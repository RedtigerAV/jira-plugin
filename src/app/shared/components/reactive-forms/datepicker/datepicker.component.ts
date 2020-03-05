import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlValueAccessorBase } from '@shared/utils/control-value-accessor.base';
import { FormErrorsService } from '@shared/errors/services/form-errors.service';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: DatepickerComponent,
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatepickerComponent extends ControlValueAccessorBase {
  @Input() label: string;
  @Input() hint: string;
  @Input() placeholder: string;

  constructor(
    protected readonly controlContainer: ControlContainer,
    protected readonly formErrorsService: FormErrorsService
  ) {
    super(controlContainer, formErrorsService);
  }
}
