import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportSettingsComponent } from './report-settings.component';
import { TableSettingsModule } from '../../../shared/table-settings/table-settings.module';



@NgModule({
  declarations: [ReportSettingsComponent],
  imports: [
    CommonModule,
    TableSettingsModule
  ],
  exports: [ReportSettingsComponent]
})
export class ReportSettingsModule { }
