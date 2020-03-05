import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { TgSnackbar } from './models/tg-snackbar.models';
import { TgSnackbarComponent } from '@shared/components/tg-snackbar/tg-snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class TgSnackbarService {
  constructor(private readonly snackbar: MatSnackBar) {}

  public openSnackbar(snackbar: TgSnackbar): void {
    this.snackbar.openFromComponent(TgSnackbarComponent, snackbar);
  }
}
