import { Injectable } from '@angular/core';
import { markFormGroupTouched } from '@shared/helpers/form.helpers';
import { IServerErrorHandlerParams, IServerErrorHandlerStrategy } from '@shared/errors/interfaces/error-handler.interface';
import { TgSnackbarService } from '@shared/components/tg-snackbar/tg-snackbar.service';
import { TgSnackbarDanger } from '@shared/components/tg-snackbar/models/tg-snackbar.models';

@Injectable({
  providedIn: 'root'
})
export class TextServerErrorHandler implements IServerErrorHandlerStrategy {
  constructor(private readonly snackbarService: TgSnackbarService) {}

  handle(handlerParams: IServerErrorHandlerParams): void {
    const { form, error } = handlerParams;

    markFormGroupTouched(form);

    form.setErrors({
      serverError: error.error
    });

    this.snackbarService.openSnackbar(
      new TgSnackbarDanger(error.error.data.toString())
    );
  }
}
