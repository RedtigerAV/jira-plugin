import { Injectable, Injector } from '@angular/core';
import { TextServerErrorHandler } from '@shared/errors/strategies/text-server-error.strategy';
import { markFormGroupTouched } from '@shared/helpers/form.helpers';
import { UnexpectedServerErrorHandler } from '@shared/errors/strategies/unexpected-server-error.strategy';
import {
  IServerErrorHandler,
  IServerErrorHandlerParams,
  IServerErrorHandlerStrategy
} from '@shared/errors/interfaces/error-handler.interface';
import { TgSnackbarDanger } from '@shared/components/tg-snackbar/models/tg-snackbar.models';
import { FormErrorsService } from '@shared/errors/services/form-errors.service';
import { ValidationServerErrorHandler } from '@shared/errors/strategies/validation-server-error.strategy';
import { ServerErrorTypesEnum } from '@shared/errors/interfaces/errors.interface';
import { ErrorsEntriesTypes } from '@shared/errors/interfaces/validation.interface';
import { GlobalServerErrorHandler } from '@shared/errors/strategies/global-server-error.strategy';
import { TgSnackbarService } from '@shared/components/tg-snackbar/tg-snackbar.service';

/**
 * Сервис для обработки серверных ошибок форм
 */
@Injectable({
  providedIn: 'root'
})
export class FormErrorsHandler implements IServerErrorHandler {
  constructor(
    private readonly injector: Injector,
    private readonly snackbarService: TgSnackbarService,
    private readonly formErrorsService: FormErrorsService
  ) {}

  /**
   * Устанавливает стратегию обработки ошибки и обрабатывает ошибку
   * @param handlerParams {IServerErrorHandlerParams}
   */
  public handleServerError(handlerParams: IServerErrorHandlerParams): void {
    const handler = this.getErrorHandlerStrategy(handlerParams);

    if (handler) {
      handler.handle(handlerParams);
    } else {
      const { form, error } = handlerParams;

      this.snackbarService.openSnackbar(new TgSnackbarDanger('Ошибка'));

      if (form) {
        markFormGroupTouched(form);

        form.setErrors({ unhandled: true });
      }

      console.error(`unhandled error: ${error}`);
      throw error;
    }
  }

  /**
   * Определяет стратегию обработки ошибки и возвращает ее
   * @param handlerParams {IServerErrorHandlerParams}
   */
  private getErrorHandlerStrategy(
    handlerParams: IServerErrorHandlerParams
  ): IServerErrorHandlerStrategy {
    const { form, error, showAsGlobalError } = handlerParams;
    const data = error && error.error;

    if (showAsGlobalError && data) {
      return this.injector.get(GlobalServerErrorHandler);
    }

    if (form && data && data.type === ServerErrorTypesEnum.VALIDATION_ERROR) {
      return this.injector.get(ValidationServerErrorHandler);
    }

    if (form && data && data.type === ServerErrorTypesEnum.TEXT_ERROR) {
      return this.injector.get(TextServerErrorHandler);
    }

    if (form) {
      const unexpectedErrorsEntries = this.formErrorsService.getErrorsEntries(
        form,
        ErrorsEntriesTypes.UNEXPECTED_SERVER
      );

      if (!!unexpectedErrorsEntries[`server${error.status}`]) {
        return this.injector.get(UnexpectedServerErrorHandler);
      }
    }
  }
}
