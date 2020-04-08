import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportSortsModalComponent } from './report-sorts-modal.component';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule } from '@angular/material';
import { NgStackFormsModule } from '@ng-stack/forms';
import { InputModule } from '@shared/components/reactive-forms/input/input.module';



@NgModule({
  declarations: [ReportSortsModalComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    NgStackFormsModule,
    InputModule
  ],
  entryComponents: [ReportSortsModalComponent],
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
export class ReportSortsModalModule { }
