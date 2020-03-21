import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportFiltersComponent } from './report-filters.component';



@NgModule({
  declarations: [ReportFiltersComponent],
  imports: [
    CommonModule
  ],
  exports: [ReportFiltersComponent]
})
export class ReportFiltersModule { }
