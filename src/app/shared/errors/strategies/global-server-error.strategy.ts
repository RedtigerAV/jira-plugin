import { Injectable } from '@angular/core';
import { IServerErrorResponse, ServerErrorTypesEnum } from '@shared/errors/interfaces/errors.interface';
import { IServerErrorHandlerParams, IServerErrorHandlerStrategy } from '@shared/errors/interfaces/error-handler.interface';
import { TgSnackbarService } from '@shared/components/tg-snackbar/tg-snackbar.service';
import { TgSnackbarDanger } from '@shared/components/tg-snackbar/models/tg-snackbar.models';

@Injectable({
  providedIn: 'root'
})
export class GlobalServerErrorHandler implements IServerErrorHandlerStrategy {
  constructor(private readonly snackbarService: TgSnackbarService) {}

  handle(handlerParams: IServerErrorHandlerParams): void {
    const errorText = this.getErrorText(handlerParams.error);

    if (errorText) {
      this.snackbarService.openSnackbar(new TgSnackbarDanger(errorText));
    } else {
      this.snackbarService.openSnackbar(new TgSnackbarDanger('Ошибка'));
    }
  }

  private getErrorText({ error }: IServerErrorResponse): string {
    if (error.data && error.type === ServerErrorTypesEnum.VALIDATION_ERROR) {
      return Object.values(error.data)[0].toString();
    }

    if (error.data && error.type === ServerErrorTypesEnum.TEXT_ERROR) {
      return error.data.toString();
    }

    if (typeof error === 'string') {
      return error;
    }
  }
}
