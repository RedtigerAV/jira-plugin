import { Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlContainer } from '@angular/forms';
import { ControlValueAccessorBase } from '@shared/utils/control-value-accessor.base';
import { FormErrorsService } from '@shared/errors/services/form-errors.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputComponent,
      multi: true
    }
  ]
})
export class InputComponent extends ControlValueAccessorBase {
  @Input()
  public label: string;
  @Input()
  public placeholder: string;
  @Input()
  public type = 'text';
  @Input()
  public hint = '';
  @Input()
  public step: number;

  constructor(
    public readonly formErrorsService: FormErrorsService,
    public readonly controlContainer: ControlContainer
  ) {
    super(controlContainer, formErrorsService);
  }
}
