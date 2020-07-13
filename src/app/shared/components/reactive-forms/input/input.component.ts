import { Attribute, Component, ContentChild, EventEmitter, Inject, Input, ViewChild } from '@angular/core';
import { ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputSuffixDirective } from '../input-addons/input-suffix.directive';
import { InputPrefixDirective } from '../input-addons/input-prefix.directive';
import { ErrorStateMatcher, MatInput } from '@angular/material';
import { AutofillEvent } from '@angular/cdk/text-field';
import { InputModeEnum } from '@core/enums/input-mode.enum';
import { ControlValueAccessorBase } from '@shared/utils/control-value-accessor.base';
import { FormErrorsService } from '@shared/errors/services/form-errors.service';
import { CUSTOM_ERROR_STATE_MATCHER } from '@shared/components/reactive-forms/injection-tokens/custom-error-state-mather.token';

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
  @ContentChild(InputPrefixDirective, { static: false })
  prefixDirective: InputPrefixDirective;

  @ContentChild(InputSuffixDirective, { static: false })
  suffixDirective: InputSuffixDirective;

  @ViewChild(MatInput, { static: true })
  input: MatInput;

  @Input()
  public label: string;
  @Input()
  public inputMode: InputModeEnum;
  @Input()
  public placeholder: string;
  @Input()
  public type = 'text';
  @Input()
  public hint = '';
  @Input()
  public readonly = false;
  @Input()
  public step: number;
  // TODO: isOutline нужен временно, для того чтобы поддержать одновременно два стиля input-а
  // КИТовый и тот что в админке c outline. Выпилить после полного перехода на КИТовый стиль.
  // Чтобы ui-sb стили работали корректно, appearance инпута должен быть legacy
  @Input()
  public isOutline = true;

  public onAutofill: EventEmitter<boolean>;

  constructor(
    public readonly formErrorsService: FormErrorsService,
    public readonly controlContainer: ControlContainer,
    @Attribute('autocomplete') public autocomplete: string = 'off',
    @Inject(CUSTOM_ERROR_STATE_MATCHER) public errorStateMatcher: ErrorStateMatcher
  ) {
    super(controlContainer, formErrorsService);
    this.onAutofill = new EventEmitter();
  }

  public onCdkAutofill(event: AutofillEvent): void {
    if (event.isAutofilled) {
      this.onAutofill.emit(true);
    }
  }
}
