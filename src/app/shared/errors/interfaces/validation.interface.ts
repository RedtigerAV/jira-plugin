import { AbstractControl } from '@angular/forms';

export type MessageFunctionType = (
  formControl?: AbstractControl
) => string | null;

export type ErrorMessageType = string | MessageFunctionType;

export interface IErrorsEntries {
  [key: string]: ErrorMessageType;
}

export interface IErrorsEntriesWithType {
  key: string;
  value: ErrorMessageType;
  type: ErrorsEntriesTypes;
}

export enum ErrorsEntriesTypes {
  VALIDATION = 'validation entries'
}
