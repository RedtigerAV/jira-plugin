import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportComponent } from './report.component';
import { ReportActionsModule } from './report-actions/report-actions.module';
import { ReportTableModule } from './report-table/report-table.module';
import { ReportSortsModule } from './report-sorts/report-sorts.module';
import { ReportFiltersModule } from './report-filters/report-filters.module';
import { TgCardModule } from '@shared/components/tg-card/tg-card.module';
import { HeaderModule } from '@shared/components/header/header.module';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { TgSnackbarModule } from '@shared/components/tg-snackbar/tg-snackbar.module';
import { ReportMediator } from './report.mediator';
import { ReportSettingsModule } from './report-settings/report-settings.module';
import { SettingsPanelModule } from '../../shared/settings-panel/settings-panel.module';
import { ReportFilterModalModule } from './report-filters/report-filter-modal/report-filter-modal.module';
import { ReportSortsModalModule } from './report-sorts/report-sorts-modal/report-sorts-modal.module';
import { SettingsPanelModalModule } from '../../shared/settings-panel/settings-panel-modal/settings-panel-modal.module';



@NgModule({
  declarations: [ReportComponent],
  imports: [
    CommonModule,
    ReportActionsModule,
    ReportTableModule,
    ReportSortsModule,
    ReportFiltersModule,
    TgCardModule,
    HeaderModule,
    MatButtonModule,
    MatIconModule,
    ReportSettingsModule,
    TgSnackbarModule,
    SettingsPanelModule,
    ReportFilterModalModule,
    ReportSortsModalModule,
    SettingsPanelModalModule
  ],
  exports: [ReportComponent],
  providers: [ReportMediator]
})
export class ReportModule { }
