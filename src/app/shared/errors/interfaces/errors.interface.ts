import { HttpErrorResponse } from '@angular/common/http';

export const enum ServerErrorTypesEnum {
  TEXT_ERROR = 'text_error',
  VALIDATION_ERROR = 'validation_error'
}

type ServerTextErrorType = ServerErrorTypesEnum.TEXT_ERROR;
type ServerValidationErrorType = ServerErrorTypesEnum.VALIDATION_ERROR;

export type ServerErrorType = ServerTextErrorType | ServerValidationErrorType;

interface IServerErrorGeneric<T extends ServerErrorType = ServerErrorType> {
  type: T;
  status: number;
}

export interface IServerTextError
  extends IServerErrorGeneric<ServerTextErrorType> {
  data: string;
}

export interface IServerValidationError
  extends IServerErrorGeneric<ServerValidationErrorType> {
  data: {
    [formControlName: string]: string;
  };
}

export type ServerError = IServerTextError | IServerValidationError;

export type ServerErrorData =
  | string
  | { [key: string]: string | string[] | ServerErrorData };

export interface IServerErrorResponse extends HttpErrorResponse {
  error: {
    data: ServerErrorData;
    type: ServerErrorType;
  };
}
