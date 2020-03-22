import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportSettingsComponent } from './report-settings.component';
import { TableGridModule } from '../../../shared/table-grid/table-grid.module';



@NgModule({
  declarations: [ReportSettingsComponent],
  imports: [
    CommonModule,
    TableGridModule
  ],
  exports: [ReportSettingsComponent]
})
export class ReportSettingsModule { }
