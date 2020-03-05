import { Injectable } from '@angular/core';
import { markFormGroupTouched } from '@shared/helpers/form.helpers';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { ServerErrorData } from '../interfaces/errors.interface';
import { IServerErrorHandlerParams, IServerErrorHandlerStrategy } from '@shared/errors/interfaces/error-handler.interface';

@Injectable({
  providedIn: 'root'
})
export class ValidationServerErrorHandler
  implements IServerErrorHandlerStrategy {
  constructor() {}

  handle(handlerParams: IServerErrorHandlerParams): void {
    const { form, error } = handlerParams;

    markFormGroupTouched(form);

    form.setErrors({
      serverError: error.error
    });

    this.pushServerErrorsToControls(form, error.error.data);
  }

  private pushServerErrorsToControls(
    form: FormGroup,
    data: ServerErrorData
  ): void {
    Object.entries(data).map(
      ([formControlKey, errorValue]: [string, string | string[]]) => {
        const control = form.get(formControlKey);

        if (control instanceof FormArray) {
          const errors = errorValue as {}[];

          for (let i = 0; i < errorValue.length; i++) {
            this.pushServerErrorsToControls(
              control.at(i) as FormGroup,
              errors[i]
            );
          }
        } else if (control instanceof FormControl) {
          const errorString = errorValue.toString().toLowerCase();

          control.setErrors({ [errorString]: errorValue.toString() });
          control.markAsTouched();
        } else if (control instanceof FormGroup) {
          this.pushServerErrorsToControls(control, data[formControlKey]);
        }
      }
    );
  }
}
