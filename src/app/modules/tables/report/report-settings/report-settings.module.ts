import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportSettingsComponent } from './report-settings.component';
import { SettingsPanelModule } from '../../../shared/settings-panel/settings-panel.module';



@NgModule({
  declarations: [ReportSettingsComponent],
  imports: [
    CommonModule,
    SettingsPanelModule
  ],
  exports: [ReportSettingsComponent]
})
export class ReportSettingsModule { }
