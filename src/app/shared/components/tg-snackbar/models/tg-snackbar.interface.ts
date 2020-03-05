import {
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition
} from '@angular/material';

//tslint:disable
export namespace TgSnackbarNamespace {
  export const enum SnackbarType {
    DANGER = 'tg-snackbar-danger',
    SUCCESS = 'tg-snackbar-success',
    INFO = 'tg-snackbar-info'
  }

  export type Type =
    | SnackbarType.DANGER
    | SnackbarType.INFO
    | SnackbarType.SUCCESS;

  export interface ConfigData {
    message: string;
  }

  export interface Config {
    panelClass: Type[];
    data: ConfigData;
    horizontalPosition?: MatSnackBarHorizontalPosition;
    verticalPosition?: MatSnackBarVerticalPosition;
    duration?: number;
  }
}
