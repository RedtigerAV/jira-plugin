import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableSettingsModalComponent } from './table-settings-modal.component';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule } from '@angular/material';
import { TableSettingsModule } from '../table-settings.module';



@NgModule({
  declarations: [TableSettingsModalComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    TableSettingsModule
  ],
  entryComponents: [TableSettingsModalComponent],
  exports: [MatDialogModule],
  providers: [
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: {
        hasBackdrop: true,
        disableClose: true,
        panelClass: 'tg-dialog'
      }
    }
  ]
})
export class TableSettingsModalModule { }
