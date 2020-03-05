import { Injectable } from '@angular/core';
import { markFormGroupTouched } from '@shared/helpers/form.helpers';
import { IServerErrorHandlerParams, IServerErrorHandlerStrategy } from '@shared/errors/interfaces/error-handler.interface';
import { FormErrorsService } from '@shared/errors/services/form-errors.service';
import { ErrorsEntriesTypes } from '@shared/errors/interfaces/validation.interface';

@Injectable({
  providedIn: 'root'
})
export class UnexpectedServerErrorHandler
  implements IServerErrorHandlerStrategy {
  constructor(private readonly formErrorsService: FormErrorsService) {}

  handle(handlerParams: IServerErrorHandlerParams): void {
    const { form, error } = handlerParams;
    const unexpectedServerError = this.formErrorsService.getErrorsEntries(
      form,
      ErrorsEntriesTypes.UNEXPECTED_SERVER
    );

    if (unexpectedServerError) {
      markFormGroupTouched(form);

      form.setErrors({
        [`server${error.status}`]: true
      });
    }
  }
}
