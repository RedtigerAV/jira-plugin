import { FormGroup } from '@angular/forms';
import { IServerErrorResponse } from '@shared/errors/interfaces/errors.interface';

export interface IServerErrorHandlerCore {
  form?: FormGroup;
  showAsGlobalError?: boolean;
}

export interface IServerErrorHandlerParams extends IServerErrorHandlerCore {
  error: IServerErrorResponse;
}

export interface ICatchFormErrorParams extends IServerErrorHandlerCore {
  errorHandler: IServerErrorHandler;
  runErrorFurther?: boolean;
}

export interface IServerErrorHandler {
  handleServerError(handlerParams: IServerErrorHandlerParams): void;
}

export interface IServerErrorHandlerStrategy {
  handle(handlerParams: IServerErrorHandlerParams): void;
}
