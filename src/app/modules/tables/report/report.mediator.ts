import { Injectable } from '@angular/core';
import { IReportMediator, ReportMediatorEventsEnum } from './interfaces/report-mediator.interfaces';
import { IReportFiltersComponent } from './interfaces/report-filters.interfaces';
import { IReportSettingsComponent } from './interfaces/report-settings.interfaces';
import { IReportSortsComponent } from './interfaces/report-sorts.interfaces';
import { IReportTableComponent } from './interfaces/report-table.interfaces';

@Injectable()
export class ReportMediator implements IReportMediator {
  reportActionsComponent: any;
  reportFiltersComponent: IReportFiltersComponent;
  reportSettingsComponent: IReportSettingsComponent;
  reportSortsComponent: IReportSortsComponent;
  reportTableComponent: IReportTableComponent;

  notify(event: ReportMediatorEventsEnum): void {
  }
}
