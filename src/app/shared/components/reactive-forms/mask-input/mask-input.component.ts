import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlValueAccessorBase } from '@shared/utils/control-value-accessor.base';
import { FormErrorsService } from '@shared/errors/services/form-errors.service';

@Component({
  selector: 'app-mask-input',
  templateUrl: './mask-input.component.html',
  styleUrls: ['./mask-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: MaskInputComponent,
      multi: true
    }
  ]
})
export class MaskInputComponent extends ControlValueAccessorBase {
  @Input()
  public label: string;
  @Input()
  public placeholder: string;
  @Input()
  public mask: string;
  @Input()
  public dropSpecialCharacters: boolean;
  @Input()
  public hint = '';

  constructor(
    public readonly formErrorsService: FormErrorsService,
    public readonly controlContainer: ControlContainer
  ) {
    super(controlContainer, formErrorsService);
  }
}
