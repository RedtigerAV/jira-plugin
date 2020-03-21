import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportTableComponent } from './report-table.component';



@NgModule({
  declarations: [ReportTableComponent],
  imports: [
    CommonModule
  ],
  exports: [ReportTableComponent]
})
export class ReportTableModule { }
