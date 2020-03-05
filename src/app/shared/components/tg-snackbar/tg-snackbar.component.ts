import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBar,
  MatSnackBarConfig
} from '@angular/material';

export interface ISkillboxSnackbarConfig extends MatSnackBarConfig {
  message: string;
}

@Component({
  selector: 'app-tg-snackbar',
  templateUrl: './tg-snackbar.component.html',
  styleUrls: ['./tg-snackbar.component.scss']
})
export class TgSnackbarComponent implements OnInit {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: ISkillboxSnackbarConfig,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  dismiss(): void {
    this.snackBar.dismiss();
  }
}
