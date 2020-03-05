import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TgSnackbarComponent } from './tg-snackbar.component';
import { MatButtonModule, MatIconModule, MatSnackBarModule } from '@angular/material';
import { TgSnackbarService } from '@shared/components/tg-snackbar/tg-snackbar.service';

@NgModule({
  declarations: [TgSnackbarComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule, MatSnackBarModule],
  entryComponents: [TgSnackbarComponent],
  exports: [TgSnackbarComponent],
  providers: [TgSnackbarService]
})
export class TgSnackbarModule {}
