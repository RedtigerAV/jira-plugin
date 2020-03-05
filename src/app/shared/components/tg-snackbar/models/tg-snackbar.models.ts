import { TgSnackbarNamespace } from './tg-snackbar.interface';
import {
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition
} from '@angular/material';

export class TgSnackbar implements TgSnackbarNamespace.Config {
  public panelClass: TgSnackbarNamespace.Type[];
  public data: TgSnackbarNamespace.ConfigData;
  public horizontalPosition: MatSnackBarHorizontalPosition;
  public verticalPosition: MatSnackBarVerticalPosition;
  public duration: number;

  constructor(options: TgSnackbarNamespace.Config) {
    this.panelClass = options.panelClass || [
      TgSnackbarNamespace.SnackbarType.INFO
    ];
    this.data = options.data || { message: '' };
    this.horizontalPosition = options.horizontalPosition || 'right';
    this.verticalPosition = options.verticalPosition || 'top';
    this.duration = options.duration || 2000;
  }
}

export class TgSnackbarDanger extends TgSnackbar {
  constructor(message: string) {
    const data = { message };
    const panelClass = [TgSnackbarNamespace.SnackbarType.DANGER];

    super({ data, panelClass });
  }
}

export class TgSnackbarInfo extends TgSnackbar {
  constructor(message: string) {
    const data = { message };
    const panelClass = [TgSnackbarNamespace.SnackbarType.INFO];

    super({ data, panelClass });
  }
}

export class TgSnackbarSuccess extends TgSnackbar {
  constructor(message: string) {
    const data = { message };
    const panelClass = [TgSnackbarNamespace.SnackbarType.SUCCESS];

    super({ data, panelClass });
  }
}
