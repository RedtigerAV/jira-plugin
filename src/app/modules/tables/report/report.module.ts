import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportComponent } from './report.component';
import { ReportActionsModule } from './report-actions/report-actions.module';
import { ReportTableModule } from './report-table/report-table.module';
import { ReportSortsModule } from './report-sorts/report-sorts.module';
import { ReportFiltersModule } from './report-filters/report-filters.module';
import { TgCardModule } from '@shared/components/tg-card/tg-card.module';
import { HeaderModule } from '@shared/components/header/header.module';
import { MatButtonModule, MatIconModule, MatProgressSpinnerModule } from '@angular/material';
import { TableSettingsModule } from '../../shared/table-settings/table-settings.module';



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
    TableSettingsModule,
    MatProgressSpinnerModule
  ],
  exports: [ReportComponent]
})
export class ReportModule { }
