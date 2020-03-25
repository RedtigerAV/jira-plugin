import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportTableComponent } from './report-table.component';
import { TableGridModule } from '../../../shared/table-grid/table-grid.module';



@NgModule({
  declarations: [ReportTableComponent],
  imports: [
    CommonModule,
    TableGridModule
  ],
  exports: [ReportTableComponent]
})
export class ReportTableModule { }
