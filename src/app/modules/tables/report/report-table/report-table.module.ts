import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportTableComponent } from './report-table.component';
import { AgGridModule } from 'ag-grid-angular';
import { MatProgressSpinnerModule } from '@angular/material';



@NgModule({
  declarations: [ReportTableComponent],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    AgGridModule.withComponents([]),
  ],
  exports: [ReportTableComponent]
})
export class ReportTableModule { }
