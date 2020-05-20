import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsPanelModalComponent } from './settings-panel-modal.component';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule } from '@angular/material';
import { SettingsPanelModule } from '../settings-panel.module';
import { SettingsPanelModalService } from './settings-panel-modal.service';



@NgModule({
  declarations: [SettingsPanelModalComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    SettingsPanelModule
  ],
  entryComponents: [SettingsPanelModalComponent],
  exports: [MatDialogModule],
  providers: [
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: {
        hasBackdrop: true,
        disableClose: true,
        panelClass: 'tg-dialog'
      }
    },
    SettingsPanelModalService
  ]
})
export class SettingsPanelModalModule { }
